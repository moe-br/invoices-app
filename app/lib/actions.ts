'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { auth } from '@clerk/nextjs/server';


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({ invalid_type_error: 'Veuillez sélectionner un client.' }),
    amount: z.coerce.number().gt(0, { message: 'Veuillez entrer un montant supérieur à 0.' }),

    status: z.enum(['pending', 'paid'], { invalid_type_error: 'Veuillez sélectionner un état de facture.', }),
    date: z.string(),
    vat_rate: z.coerce.number().default(19),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
import { sql } from './db';
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const CustomerSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères.'),
  email: z.string().email('Email invalide.'),
  phone: z.string().optional(),
  address: z.string().optional(),
  tax_id: z.string().optional(),
});

export async function createCustomer(prevState: any, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const validatedFields = CustomerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    tax_id: formData.get('tax_id'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Champs manquants. Échec de la création du client.',
    };
  }

  const { name, email, phone, address, tax_id } = validatedFields.data;
  const imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;

  try {
    await sql`
      INSERT INTO customers (user_id, name, email, image_url, phone, address, tax_id)
      VALUES (${userId}, ${name}, ${email}, ${imageUrl}, ${phone || null}, ${address || null}, ${tax_id || null})
    `;
  } catch (error) {
    return { message: 'Erreur de base de données : Échec de la création du client.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}


export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData): Promise<State> {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    let customerId = formData.get('customerId') as string;
    const billingName = formData.get('billingName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const tax_id = formData.get('tax_id') as string;
    
    const amount = parseFloat(formData.get('amount') as string);
    const status = formData.get('status') as string;
    const vat_rate = parseFloat(formData.get('vat_rate') as string || '19');

    // Handle flexible customer selection
    if (!customerId && billingName) {
        try {
            const imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(billingName)}`;
            
            // 1. Manually check if customer exists to avoid constraint issues if ON CONFLICT isn't set up
            const existing = await sql`SELECT id FROM customers WHERE email = ${email} AND user_id = ${userId}`;
            
            if (existing.length > 0) {
                // 2. Update existing customer
                customerId = existing[0].id;
                await sql`
                    UPDATE customers 
                    SET 
                        name = ${billingName},
                        phone = ${phone || null},
                        address = ${address || null},
                        tax_id = ${tax_id || null}
                    WHERE id = ${customerId} AND user_id = ${userId}
                `;
            } else {
                // 3. Create new customer
                const newCustomer = await sql`
                    INSERT INTO customers (user_id, name, email, image_url, phone, address, tax_id)
                    VALUES (${userId}, ${billingName}, ${email}, ${imageUrl}, ${phone || null}, ${address || null}, ${tax_id || null})
                    RETURNING id
                `;
                customerId = newCustomer[0].id;
            }
        } catch (err) {
            console.error('Failed to handle customer record:', err);
            return { message: 'Failed to process customer data. Please verify all fields.' };
        }
    }

    if (!customerId) {
        return {
            errors: { customerId: ['Veuillez sélectionner un client ou fournir un nom de facturation.'] },
            message: 'Client manquant. Échec de la création de la facture.',
        };
    }

    const itemsJson = formData.get('items') as string;
    const amountInMillimes = Math.round(amount * 1000);
    const vatAmount = Math.round(amountInMillimes * (vat_rate / 100));
    const stampDuty = 1000;
    const date = new Date().toISOString().split('T')[0];

    try {
        // Fetch numbering settings for this user
        const profile = await sql`
            SELECT invoice_pattern, invoice_digits, invoice_reset 
            FROM business_profiles 
            WHERE user_id = ${userId}
        `;
        
        const pattern = profile[0]?.invoice_pattern || '{seq}';
        const digits = profile[0]?.invoice_digits || 4;
        const reset = profile[0]?.invoice_reset || 'never';

        // Calculate sequence start date based on reset rule
        const now = new Date();
        let startDate = '1970-01-01';
        if (reset === 'yearly') {
            startDate = `${now.getFullYear()}-01-01`;
        } else if (reset === 'monthly') {
            startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
        }

        // Calculate the next sequential number
        const lastInvoice = await sql`
            SELECT MAX(invoice_number) as max_num 
            FROM invoices 
            WHERE user_id = ${userId} AND date >= ${startDate}
        `;
        const nextNumber = (lastInvoice[0].max_num || 0) + 1;

        // Generate formatted display number
        const YYYY = now.getFullYear().toString();
        const MM = String(now.getMonth() + 1).padStart(2, '0');
        const DD = String(now.getDate()).padStart(2, '0');
        const seq = String(nextNumber).padStart(digits, '0');

        const formattedNumber = pattern
            .replace('{YYYY}', YYYY)
            .replace('{MM}', MM)
            .replace('{DD}', DD)
            .replace('{seq}', seq);

        // Proactive migration: Ensure formatted_number column exists
        await sql`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS formatted_number TEXT;`;

        await sql`
      INSERT INTO invoices (customer_id, amount, status, date, vat_rate, vat_amount, stamp_duty, user_id, invoice_number, items, formatted_number)
      VALUES (${customerId}, ${amountInMillimes}, ${status}, ${date}, ${vat_rate}, ${vatAmount}, ${stampDuty}, ${userId}, ${nextNumber}, ${itemsJson}, ${formattedNumber})
    `;
    } catch (error) {
        console.error(error);
        return { message: 'Erreur de base de données : Échec de la création de la facture.' };
    }

    revalidatePath('/dashboard/customers');
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    vat_rate: formData.get('vat_rate'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Champs manquants. Échec de la mise à jour de la facture.',
    };
  }

  const itemsJson = formData.get('items') as string;
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
            vat_rate = ${vat_rate}, vat_amount = ${vatAmount}, stamp_duty = ${stampDuty},
            items = ${itemsJson || null}
        WHERE id = ${id} AND user_id = ${userId}
      `;
  } catch (error) {
    return { message: 'Erreur de base de données : Échec de la mise à jour de la facture.' };
  }

  revalidatePath('/dashboard/customers');
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function markInvoiceAsPaid(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    await sql`
      UPDATE invoices
      SET status = 'paid'
      WHERE id = ${id} AND user_id = ${userId}
    `;
    revalidatePath('/dashboard/customers');
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function deleteInvoice(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    await sql`DELETE FROM invoices WHERE id = ${id} AND user_id = ${userId}`;
    revalidatePath('/dashboard/customers');
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error('Delete Error:', error);
  }
}

export async function deleteCustomer(id: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    // Optional: We could check if they have invoices first, 
    // but for simplicity we'll allow standard cascading or error if DB restricted.
    await sql`DELETE FROM customers WHERE id = ${id} AND user_id = ${userId}`;
    revalidatePath('/dashboard/customers');
    revalidatePath('/dashboard/invoices'); // Customer removal affects invoice dropdown
  } catch (error) {
    console.error('Delete Customer Error:', error);
    return { message: 'Échec de la suppression du client. Vérifiez qu\'il n\'a pas de factures actives.' };
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
      return { success: false, message: 'Aucune donnée client fournie.' };
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
    return { success: false, message: 'Erreur interne du serveur lors de l\'importation.' };
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

    // Proactive migration: Ensure numbering columns exist
    await sql`ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS cin TEXT;`;
    await sql`ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS invoice_pattern TEXT DEFAULT '{seq}';`;
    await sql`ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS invoice_digits INTEGER DEFAULT 4;`;
    await sql`ALTER TABLE business_profiles ADD COLUMN IF NOT EXISTS invoice_reset TEXT DEFAULT 'never';`;
    
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
  } catch (error: any) {
    console.error('Database Error:', error);
    return {
      message: `Database Error: ${error.message || 'Failed to save business profile.'}`,
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/onboarding');
  redirect('/dashboard');
}

export async function saveNumberingSettings(formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    const pattern = formData.get('invoice_pattern') as string;
    const digits = parseInt(formData.get('invoice_digits') as string);
    const reset = formData.get('invoice_reset') as string;

    await sql`
      UPDATE business_profiles
      SET 
        invoice_pattern = ${pattern},
        invoice_digits = ${digits},
        invoice_reset = ${reset}
      WHERE user_id = ${userId}
    `;

    revalidatePath('/dashboard/configuration');
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Failed to save numbering settings.' };
  }
}



export async function deleteAllCustomers() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Unauthorized');

    // First delete all invoices linked to this user's customers
    await sql`DELETE FROM invoices WHERE user_id = ${userId}`;
    
    // Then delete all customers for this user
    await sql`DELETE FROM customers WHERE user_id = ${userId}`;
    
    revalidatePath('/dashboard/customers');
    revalidatePath('/dashboard/invoices');
    return { success: true, message: 'Tous les clients et leurs factures ont été supprimés.' };
  } catch (error) {
    console.error('Delete All Customers Error:', error);
    return { success: false, message: 'Échec de la suppression de tous les clients.' };
  }
}
