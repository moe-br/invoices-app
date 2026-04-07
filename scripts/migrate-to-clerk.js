const postgres = require('postgres');

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function migrate() {
  try {
    console.log('Starting migration to Clerk (UUID to String)...');

    // 1. Drop foreign key constraints
    console.log('Dropping legacy foreign key constraints...');
    await sql`ALTER TABLE customers DROP CONSTRAINT IF EXISTS fk_user`;
    await sql`ALTER TABLE invoices DROP CONSTRAINT IF EXISTS fk_invoice_user`;

    // 2. Change column types to VARCHAR(255)
    console.log('Changing user_id column types to VARCHAR(255)...');
    await sql`ALTER TABLE customers ALTER COLUMN user_id TYPE VARCHAR(255)`;
    await sql`ALTER TABLE invoices ALTER COLUMN user_id TYPE VARCHAR(255)`;

    console.log('Migration to Clerk complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

migrate();
