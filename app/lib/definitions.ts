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

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  tax_id?: string; // Matricule Fiscal
  address?: string;
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
  tax_id?: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
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
  created_at?: string;
  updated_at?: string;
};

