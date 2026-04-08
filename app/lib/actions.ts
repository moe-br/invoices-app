'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { auth } from '@clerk/nextjs/server';


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),

    status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.', }),
    date: z.string(),
    vat_rate: z.coerce.number().default(19),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });


export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
        vat_rate: formData.get('vat_rate'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
    const { customerId, amount, status, vat_rate } = validatedFields.data;
    const amountInMillimes = Math.round(amount * 1000);
    const vatAmount = Math.round(amountInMillimes * (vat_rate / 100));
    const stampDuty = 1000;
    const date = new Date().toISOString().split('T')[0];

    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Unauthorized');

        await sql`
      INSERT INTO invoices (customer_id, amount, status, date, vat_rate, vat_amount, stamp_duty, user_id)
      VALUES (${customerId}, ${amountInMillimes}, ${status}, ${date}, ${vat_rate}, ${vatAmount}, ${stampDuty}, ${userId})
    `;
    } catch (error) {
        // We'll also log the error to the console for now
        console.error(error);
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    vat_rate: formData.get('vat_rate'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status, vat_rate } = validatedFields.data;
  const amountInMillimes = Math.round(amount * 1000);
  const vatAmount = Math.round(amountInMillimes * (vat_rate / 100));
  const stampDuty = 1000;

  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInMillimes}, status = ${status}, 
            vat_rate = ${vat_rate}, vat_amount = ${vatAmount}, stamp_duty = ${stampDuty}
        WHERE id = ${id} AND user_id = ${userId}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    await sql`DELETE FROM invoices WHERE id = ${id} AND user_id = ${userId}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error('Delete Error:', error);
  }
}

export async function handleSignOut() {
  // Clerk sign out is handled on the client side
}

export async function generateApiKey() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    // Generate a secure 32-byte hex string
    const crypto = require('crypto');
    const rawKey = 'tb_live_' + crypto.randomBytes(32).toString('hex');
    
    // Hash the key before storing
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    await sql`
      INSERT INTO api_keys (user_id, name, key_hash)
      VALUES (${userId}, 'Default API Key', ${keyHash})
    `;

    // Only return the raw key ONCE to the client
    return { success: true, key: rawKey };
  } catch (error) {
    console.error('Failed to generate API Key:', error);
    return { success: false, message: 'Failed to generate API key.' };
  }
}

export async function bulkImportCustomers(customers: any[]) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    if (!Array.isArray(customers) || customers.length === 0) {
      return { success: false, message: 'No customer data provided.' };
    }

    let successCount = 0;

    // Ideally, we'd use a transaction, but we'll do this sequentially to handle individual row failures easily
    // or we can use a bulk insert string if scaling to 10k+. For standard CSVs, sequential/Promise.all works.
    for (const rawCustomer of customers) {
      // Fuzzy match keys to handle Excel BOM (\uFEFF) and regional whitespace issues
      let nameStr = '';
      let emailStr = '';
      let taxStr = '';
      let phoneStr = '';
      let addressStr = '';

      for (const [key, value] of Object.entries(rawCustomer)) {
        if (typeof key !== 'string' || !value) continue;
        // Strip out everything except alphanumeric to catch ' name ' or '\uFEFFname'
        const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
        const val = String(value).trim();
        
        if (normalizedKey.includes('name')) nameStr = val;
        else if (normalizedKey.includes('email') || normalizedKey.includes('mail')) emailStr = val;
        else if (normalizedKey.includes('tax') || normalizedKey.includes('matricule')) taxStr = val;
        else if (normalizedKey.includes('phone') || normalizedKey.includes('tel')) phoneStr = val;
        else if (normalizedKey.includes('address') || normalizedKey.includes('adresse')) addressStr = val;
      }

      if (!nameStr || !emailStr) continue;
      
      const imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nameStr)}`;
      
      try {
        await sql`
          INSERT INTO customers (user_id, name, email, image_url, tax_id, address, phone)
          VALUES (
            ${userId},
            ${nameStr},
            ${emailStr},
            ${imageUrl},
            ${taxStr || null},
            ${addressStr || null},
            ${phoneStr || null}
          )
        `;
        successCount++;
      } catch (err) {
        console.error(`Failed to insert ${nameStr}:`, err);
      }
    }

    revalidatePath('/dashboard/customers');
    return { success: true, count: successCount };

  } catch (error) {
    console.error('Bulk Import API Error:', error);
    return { success: false, message: 'Internal server error during bulk import.' };
  }
}

const emptyToUndefined = z.preprocess((val) => (val === '' ? undefined : val), z.string().optional());

const BusinessProfileSchema = z.object({
  businessType: z.enum(['societe', 'auto_entrepreneur'], {
    invalid_type_error: 'Veuillez choisir un type d\'activité.',
  }),
  businessName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères.'),
  logoUrl: z.preprocess((val) => (val === '' ? undefined : val), z.string().max(2000000, 'Le logo doit faire moins de 2Mo.').optional()),
  taxId: z.string().min(1, 'Le Matricule Fiscal est obligatoire.'),
  cin: z.string().min(1, 'Le CIN est obligatoire.'),
  phone: z.string().min(8, 'Le numéro de téléphone est obligatoire.'),
  email: z.string().email('Email invalide.').min(1, 'Email obligatoire.'),
  address: z.string().min(5, 'L\'adresse est obligatoire.'),
  website: z.string().min(1, 'Le site web (ou lien social) est obligatoire.'),
});

export async function saveBusinessProfile(formData: FormData) {
  console.log('saveBusinessProfile called with:', Object.fromEntries(formData.entries()));
  
  const validatedFields = BusinessProfileSchema.safeParse({
    businessType: formData.get('businessType'),
    businessName: formData.get('businessName'),
    logoUrl: formData.get('logoUrl'),
    taxId: formData.get('taxId'),
    cin: formData.get('cin'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    address: formData.get('address'),
    website: formData.get('website'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    console.error('Validation failed:', fieldErrors);
    const errorList = Object.entries(fieldErrors)
      .map(([key, value]) => `${key}: ${value?.join(', ')}`)
      .join(' | ');
    return {
      errors: fieldErrors,
      message: `Invalid Fields: ${errorList}`,
    };
  }

  const { businessType, businessName, logoUrl, taxId, cin, phone, email, address, website } = validatedFields.data;

  try {
    const { userId } = await auth();
    console.log('auth() userId:', userId);
    if (!userId) throw new Error('Unauthorized');

    // Proactive migration: Ensure 'cin' column exists
    await sql`ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS cin TEXT;`;
    
    const result = await sql`SELECT 1 FROM business_profiles WHERE user_id = ${userId}`;
    
    if (result.count > 0) {
      await sql`
        UPDATE business_profiles
        SET 
          business_type = ${businessType},
          business_name = ${businessName},
          logo_url = ${logoUrl || null},
          tax_id = ${taxId || null},
          cin = ${cin || null},
          phone = ${phone || null},
          email = ${email || null},
          address = ${address || null},
          website = ${website || null},
          updated_at = NOW()
        WHERE user_id = ${userId}
      `;
    } else {
      await sql`
        INSERT INTO business_profiles 
          (user_id, business_type, business_name, logo_url, tax_id, cin, phone, email, address, website)
        VALUES 
          (${userId}, ${businessType}, ${businessName}, ${logoUrl || null}, ${taxId || null}, ${cin || null}, ${phone || null}, ${email || null}, ${address || null}, ${website || null})
      `;
    }
    console.log('Database save successful');
  } catch (error: any) {
    console.error('Database Error:', error);
    return {
      message: `Database Error: ${error.message || 'Failed to save business profile.'}`,
    };
  }

  console.log('Revalidating paths and redirecting...');
  revalidatePath('/dashboard');
  revalidatePath('/onboarding');
  redirect('/dashboard');
}

export async function fetchBusinessProfile() {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const profile = await sql`
      SELECT id, user_id, business_type, business_name, logo_url, tax_id, cin, phone, email, address, website 
      FROM business_profiles 
      WHERE user_id = ${userId}
    `;

    return profile[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}
