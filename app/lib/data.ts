import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  BusinessProfile,
} from './definitions';
import { auth } from '@clerk/nextjs/server';
import { formatCurrency } from './utils';

import { sql } from './db';

export async function fetchRevenue() {
  try {
    const { userId } = await auth();
    if (!userId) return [];


    const data = await sql`
      SELECT 
        TO_CHAR(date, 'Mon') as month,
        SUM(amount) / 1000 as revenue
      FROM invoices
      WHERE user_id = ${userId}
      GROUP BY DATE_TRUNC('month', date), TO_CHAR(date, 'Mon')
      ORDER BY DATE_TRUNC('month', date) DESC
      LIMIT 12
    `;

    return data.map((item) => ({
      month: item.month,
      revenue: Number(item.revenue || 0),
    })).reverse();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch real revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const { userId } = await auth();
    if (!userId) return [];


    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id, 
             invoices.formatted_number, invoices.invoice_number
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.user_id = ${userId}
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        numberOfCustomers: 0,
        numberOfInvoices: 0,
        totalPaidInvoices: '0',
        totalPendingInvoices: '0',
      };
    }

    try {
      const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices WHERE user_id = ${userId}`;
      const customerCountPromise = sql`SELECT COUNT(*) FROM customers WHERE user_id = ${userId}`;
      const invoiceStatusPromise = sql`SELECT
           SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
           SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
           FROM invoices WHERE user_id = ${userId}`;

      const data = await Promise.all([
        invoiceCountPromise,
        customerCountPromise,
        invoiceStatusPromise,
      ]);

      const numberOfInvoices = Number(data[0][0].count ?? '0');
      const numberOfCustomers = Number(data[1][0].count ?? '0');
      const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
      const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

      return {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch card data.');
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { userId } = await auth();
    if (!userId) return [];


    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url,
        customers.tax_id,
        invoices.formatted_number,
        invoices.invoice_number
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        invoices.user_id = ${userId} AND (
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`} )
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const { userId } = await auth();
    if (!userId) return 0;


    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      invoices.user_id = ${userId} AND (
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`} )
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {

  try {
    const { userId } = await auth();
    if (!userId) return undefined;


    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status,
        invoices.vat_rate,
        invoices.vat_amount,
        invoices.stamp_duty,
        invoices.items,
        invoices.invoice_number,
        invoices.formatted_number,
        invoices.date
      FROM invoices
      WHERE invoices.id = ${id} AND invoices.user_id = ${userId};
    `;

    const invoice = data[0];
    
    // Safely parse items if it's a string (Postgres sometimes returns JSONB as string depending on config/driver)
    if (invoice && typeof invoice.items === 'string') {
      try {
        invoice.items = JSON.parse(invoice.items);
      } catch (e) {
        console.error('Failed to parse invoice items:', e);
        invoice.items = [];
      }
    }

    return invoice;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const { userId } = await auth();
    if (!userId) return [];


    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name,
        email
      FROM customers
      WHERE user_id = ${userId}
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const { userId } = await auth();
    if (!userId) return [];


    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  customers.phone,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id AND invoices.user_id = ${userId}
		WHERE
		  customers.user_id = ${userId} AND (
		  customers.name ILIKE ${`%${query}%`} OR
          customers.phone ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} )
		GROUP BY customers.id, customers.name, customers.email, customers.image_url, customers.phone
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchBusinessProfile() {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const profile = await sql<BusinessProfile[]>`
      SELECT id, user_id, business_type, business_name, logo_url, tax_id, cin, phone, email, address, website,
             invoice_pattern, invoice_digits, invoice_reset 
      FROM business_profiles 
      WHERE user_id = ${userId}
    `;

    return profile[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}

export async function fetchNextInvoiceNumber() {
  try {
    const { userId } = await auth();
    if (!userId) return 1;

    const lastInvoice = await sql`
      SELECT MAX(invoice_number) as max_num 
      FROM invoices 
      WHERE user_id = ${userId}
    `;
    return (lastInvoice[0].max_num || 0) + 1;
  } catch (error) {
    console.error('Database Error:', error);
    return 1;
  }
}

export async function fetchSidebarData() {
  try {
    const { userId } = await auth();
    if (!userId) return { invoices: 0, customers: 0, quotes: 0, deliveryNotes: 0, companies: 0, catalog: 0 };

    const [invoices, customers] = await Promise.all([
      sql`SELECT COUNT(*) FROM invoices WHERE user_id = ${userId}`,
      sql`SELECT COUNT(*) FROM customers WHERE user_id = ${userId}`,
    ]);

    return {
      invoices: Number(invoices[0].count || 0),
      customers: Number(customers[0].count || 0),
      quotes: 0, // Placeholder
      deliveryNotes: 0, // Placeholder
      companies: 0, // Placeholder
      catalog: 0, // Placeholder
    };
  } catch (error) {
    console.error('Database Error:', error);
    return { invoices: 0, customers: 0, quotes: 0, deliveryNotes: 0, companies: 0, catalog: 0 };
  }
}

export async function fetchDailyRevenue() {
  try {
    const { userId } = await auth();
    if (!userId) return [];

    const data = await sql`
      WITH date_series AS (
        SELECT generate_series(
          DATE_TRUNC('month', CURRENT_DATE),
          DATE_TRUNC('month', CURRENT_DATE) + interval '1 month' - interval '1 day',
          interval '1 day'
        )::date AS day
      )
      SELECT 
        TO_CHAR(ds.day, 'DD Mon') as label,
        ds.day as date,
        COALESCE(SUM(i.amount), 0) / 1000.0 as amount
      FROM date_series ds
      LEFT JOIN invoices i ON DATE_TRUNC('day', i.date)::date = ds.day AND i.user_id = ${userId}
      GROUP BY ds.day
      ORDER BY ds.day ASC
    `;

    return data.map(row => ({
      label: row.label,
      amount: Number(row.amount),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}
