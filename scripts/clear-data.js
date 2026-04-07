"use strict";
const postgres = require('postgres');

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function clearData() {
  try {
    console.log('Clearing old invoices...');
    await sql`DELETE FROM invoices`;
    
    console.log('Clearing old clients...');
    await sql`DELETE FROM customers`;

    console.log('Database slate wiped clean!');
  } catch (error) {
    console.error('Failed to clear data:', error);
  } finally {
    process.exit(0);
  }
}

clearData();
