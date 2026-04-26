// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type InvoiceItem = {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  type?: 'individual' | 'company';
  tax_id?: string; // Matricule Fiscal
  cin?: string; // Carte d'Identité Nationale
  address?: string;
  phone?: string;
};

export type Invoice = {
  id: string; // Will be created on the database
  customer_id: string;
  amount: number; // Stored in cents (HT)
  status: 'pending' | 'paid';
  date: string;
  vat_rate: number; // e.g., 19, 13, 7
  vat_amount: number;
  stamp_duty: number; // Usually 1000 millimes (1 TND)
  items?: InvoiceItem[];
  invoice_number?: number;
  formatted_number?: string;
};

export type QuoteItem = {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
};

export type Quote = {
  id: string;
  customer_id: string;
  amount: number; // HT in cents
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
  validity_days: number;
  vat_rate: number;
  vat_amount: number;
  stamp_duty: number;
  items?: QuoteItem[];
  quote_number?: number;
  formatted_number?: string;
};

export type QuoteForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  validity_days: number;
  vat_rate: number;
  items?: QuoteItem[];
};

export type QuotesTableType = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  quote_number?: number;
  formatted_number?: string;
};

export type Revenue = {

  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
  formatted_number?: string;
  invoice_number?: number;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
  type?: 'individual' | 'company';
  tax_id?: string;
  cin?: string;
  formatted_number?: string;
  invoice_number?: number;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  type: 'individual' | 'company';
  cin?: string;
  tax_id?: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
  phone?: string;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  type: 'individual' | 'company';
  cin?: string;
  tax_id?: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
  phone?: string;
};

export type CustomerField = {
  id: string;
  name: string;
  email: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
  vat_rate: number;
  items?: InvoiceItem[];
};

export type BusinessType = 'societe' | 'auto_entrepreneur';

export type BusinessProfile = {
  id: string;
  user_id: string;
  business_type: BusinessType;
  business_name: string;
  logo_url?: string;
  tax_id?: string;
  cin?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  invoice_pattern?: string;
  invoice_digits?: number;
  invoice_reset?: string;
  api_key?: string;
  created_at?: string;
  updated_at?: string;
};

