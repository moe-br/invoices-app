const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function migrate() {
  try {
    console.log('Adding items column to invoices table...');
    await sql`
      ALTER TABLE invoices 
      ADD COLUMN IF NOT EXISTS items JSONB;
    `;
    
    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
