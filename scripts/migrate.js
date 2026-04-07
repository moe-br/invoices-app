"use strict";
const postgres = require('postgres');

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function migrate() {
  try {
    console.log('Fetching default user...');
    const users = await sql`SELECT id FROM users WHERE email = 'user@nextmail.com'`;
    if (!users.length) {
      console.log("No default user found.");
      return;
    }
    const defaultUserId = users[0].id;
    console.log(`Default User ID: ${defaultUserId}`);

    console.log('Migrating customers table...');
    await sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS user_id UUID`;
    await sql`UPDATE customers SET user_id = ${defaultUserId} WHERE user_id IS NULL`;
    
    // Check if constraint exists before adding
    const custConstraint = await sql`SELECT constraint_name FROM information_schema.table_constraints WHERE table_name = 'customers' AND constraint_name = 'fk_user'`;
    if (!custConstraint.length) {
      await sql`ALTER TABLE customers ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)`;
    }

    console.log('Migrating invoices table...');
    await sql`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS user_id UUID`;
    await sql`UPDATE invoices SET user_id = ${defaultUserId} WHERE user_id IS NULL`;
    
    const invConstraint = await sql`SELECT constraint_name FROM information_schema.table_constraints WHERE table_name = 'invoices' AND constraint_name = 'fk_invoice_user'`;
    if (!invConstraint.length) {
      await sql`ALTER TABLE invoices ADD CONSTRAINT fk_invoice_user FOREIGN KEY (user_id) REFERENCES users(id)`;
    }

    console.log('Multi-tenant migration complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit(0);
  }
}

migrate();
