const fs = require('fs');
const path = require('path');
const postgres = require('postgres');

// Simple .env parser
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const env = fs.readFileSync(envPath, 'utf-8');
    env.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  }
}

loadEnv();

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function migrate() {
  try {
    console.log('Starting migration...');
    await sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS tax_id VARCHAR(255)`;
    await sql`ALTER TABLE customers ADD COLUMN IF NOT EXISTS address TEXT`;
    await sql`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS vat_rate INT DEFAULT 19`;
    await sql`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS vat_amount INT DEFAULT 0`;
    await sql`ALTER TABLE invoices ADD COLUMN IF NOT EXISTS stamp_duty INT DEFAULT 1000`;
    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

migrate();
