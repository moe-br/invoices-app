'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { sql } from './db';

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

const QuoteFormSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: 'Veuillez sélectionner un client.' }),
  amount: z.coerce.number().gt(0, { message: 'Veuillez entrer un montant supérieur à 0.' }),
  status: z.enum(['pending', 'accepted', 'rejected'], { invalid_type_error: 'Veuillez sélectionner un état de devis.' }),
  date: z.string(),
  validity_days: z.coerce.number().default(30),
  vat_rate: z.coerce.number().default(19),
});

const CreateQuote = QuoteFormSchema.omit({ id: true, date: true });
const UpdateQuote = QuoteFormSchema.omit({ id: true, date: true });

export async function createQuote(prevState: State, formData: FormData): Promise<State> {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  let customerId = formData.get('customerId') as string;
  const billingName = formData.get('billingName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const tax_id = formData.get('tax_id') as string;
  const type_val = formData.get('type') as string || 'individual';
  const cin_val = formData.get('cin') as string;
  
  const amount = parseFloat(formData.get('amount') as string);
  const status = formData.get('status') as string;
  const validity_days = parseInt(formData.get('validity_days') as string || '30');
  const vat_rate = parseFloat(formData.get('vat_rate') as string || '19');

  const itemsJson = formData.get('items') as string;

  if (customerId === 'new') {
    if (!billingName || !email) {
      return { message: 'Veuillez fournir un nom et un email.' };
    }
    try {
      await sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'individual';`;
      await sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS cin TEXT;`;
      
      const imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(billingName)}`;
      const newCustomer = await sql`
        INSERT INTO customers (user_id, name, email, image_url, type, phone, address, tax_id, cin)
        VALUES (${userId}, ${billingName}, ${email}, ${imageUrl}, ${type_val}, ${phone || null}, ${address || null}, ${tax_id || null}, ${cin_val || null})
        RETURNING id;
      `;
      customerId = newCustomer[0].id;
    } catch (err) {
      console.error(err);
      return { message: 'Failed to create new customer.' };
    }
  }

  const validatedFields = CreateQuote.safeParse({
    customerId, amount, status, validity_days, vat_rate,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Champs manquants.',
    };
  }

  const amountInMillimes = Math.round(amount * 1000);
  const vatAmount = Math.round(amountInMillimes * (vat_rate / 100));
  const stampDuty = 1000;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS quotes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        validity_days INT DEFAULT 30,
        vat_rate DECIMAL(5,2) DEFAULT 19.00,
        vat_amount INT DEFAULT 0,
        stamp_duty INT DEFAULT 1000,
        quote_number INT NOT NULL,
        formatted_number TEXT,
        items JSONB,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    const now = new Date();
    const startDate = `${now.getFullYear()}-01-01`;

    const lastQuote = await sql`
        SELECT MAX(quote_number) as max_num 
        FROM quotes 
        WHERE user_id = ${userId} AND date >= ${startDate}
    `;
    const nextNumber = (lastQuote[0].max_num || 0) + 1;
    const seq = String(nextNumber).padStart(4, '0');
    const formattedNumber = `dev_${seq}`;

    await sql`
      INSERT INTO quotes (customer_id, amount, status, date, validity_days, vat_rate, vat_amount, stamp_duty, user_id, quote_number, items, formatted_number)
      VALUES (${customerId}, ${amountInMillimes}, ${status}, ${date}, ${validity_days}, ${vat_rate}, ${vatAmount}, ${stampDuty}, ${userId}, ${nextNumber}, ${itemsJson}, ${formattedNumber})
    `;
  } catch (error) {
    console.error(error);
    return { message: 'Erreur DB.' };
  }

  revalidatePath('/dashboard/devis');
  redirect('/dashboard/devis');
}

export async function updateQuote(id: string, prevState: State, formData: FormData): Promise<State> {
  const validatedFields = UpdateQuote.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    validity_days: formData.get('validity_days'),
    vat_rate: formData.get('vat_rate'),
  });

  if (!validatedFields.success) { return { message: 'Failed' }; }

  const itemsJson = formData.get('items') as string;
  const { customerId, amount, status, validity_days, vat_rate } = validatedFields.data;
  const amountInMillimes = Math.round(amount * 1000);
  const vatAmount = Math.round(amountInMillimes * (vat_rate / 100));

  try {
    const { userId } = await auth();
    await sql`
        UPDATE quotes
        SET customer_id = ${customerId}, amount = ${amountInMillimes}, status = ${status}, 
            validity_days = ${validity_days}, vat_rate = ${vat_rate}, vat_amount = ${vatAmount}, items = ${itemsJson || null}, updated_at = NOW()
        WHERE id = ${id} AND user_id = ${userId}
    `;
  } catch (err) {
    console.error(err);
    return { message: 'Db error.' };
  }

  revalidatePath('/dashboard/devis');
  redirect('/dashboard/devis');
}

export async function deleteQuote(id: string) {
  try {
    const { userId } = await auth();
    await sql`DELETE FROM quotes WHERE id = ${id} AND user_id = ${userId}`;
    revalidatePath('/dashboard/devis');
  } catch (err) {
    console.error(err);
  }
}

export async function updateQuoteStatus(id: string, status: string) {
  try {
    const { userId } = await auth();
    await sql`UPDATE quotes SET status = ${status}, updated_at = NOW() WHERE id = ${id} AND user_id = ${userId}`;
    revalidatePath('/dashboard/devis');
  } catch (err) {
    console.error(err);
  }
}

export async function convertQuoteToInvoice(quoteId: string) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Unauthorized');

        // Fetch quote details
        const quoteToConvert = await sql`SELECT * FROM quotes WHERE id = ${quoteId} AND user_id = ${userId}`;
        
        if (!quoteToConvert || quoteToConvert.length === 0) {
            return { message: 'Quote not found.' };
        }

        const quote = quoteToConvert[0];

        // Fetch numbering settings for this user
        const profile = await sql`
            SELECT invoice_pattern, invoice_digits, invoice_reset 
            FROM business_profiles 
            WHERE user_id = ${userId}
        `;
        
        const pattern = profile[0]?.invoice_pattern || '{seq}';
        const digits = profile[0]?.invoice_digits || 4;
        const reset = profile[0]?.invoice_reset || 'never';

        const now = new Date();
        let startDate = '1970-01-01';
        if (reset === 'yearly') {
            startDate = `${now.getFullYear()}-01-01`;
        } else if (reset === 'monthly') {
            startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
        }

        const lastInvoice = await sql`
            SELECT MAX(invoice_number) as max_num 
            FROM invoices 
            WHERE user_id = ${userId} AND date >= ${startDate}
        `;
        const nextNumber = (lastInvoice[0].max_num || 0) + 1;

        const YYYY = now.getFullYear().toString();
        const MM = String(now.getMonth() + 1).padStart(2, '0');
        const DD = String(now.getDate()).padStart(2, '0');
        const seq = String(nextNumber).padStart(digits, '0');

        const formattedNumber = pattern
            .replace('{YYYY}', YYYY)
            .replace('{MM}', MM)
            .replace('{DD}', DD)
            .replace('{seq}', seq);
            
        const date = new Date().toISOString().split('T')[0];

        // Check if items is object (jsonb) or string. postgres.js returns it as JS object.
        const itemsToInsert = typeof quote.items === 'object' ? JSON.stringify(quote.items) : (quote.items || null);

        // Create the invoice
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date, vat_rate, vat_amount, stamp_duty, user_id, invoice_number, items, formatted_number)
            VALUES (${quote.customer_id}, ${quote.amount}, 'pending', ${date}, ${quote.vat_rate}, ${quote.vat_amount}, ${quote.stamp_duty}, ${userId}, ${nextNumber}, ${itemsToInsert}, ${formattedNumber})
        `;
        
    } catch (err) {
        console.error(err);
        return { message: 'Failed to convert quote.' };
    }

    revalidatePath('/dashboard/invoices');
    revalidatePath('/dashboard/devis');
    redirect('/dashboard/invoices');
}
