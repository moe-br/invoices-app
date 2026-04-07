import { NextResponse } from 'next/server';
import postgres from 'postgres';
import crypto from 'crypto';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(request: Request) {
  try {
    // 1. Authenticate Request via Bearer Token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid Bearer token' }, { status: 401 });
    }

    const rawKey = authHeader.split(' ')[1];
    if (!rawKey.startsWith('tb_live_')) {
        return NextResponse.json({ error: 'Unauthorized: Invalid token format' }, { status: 401 });
    }

    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');

    const authCheck = await sql`SELECT user_id FROM api_keys WHERE key_hash = ${keyHash}`;
    if (!authCheck.length) {
      return NextResponse.json({ error: 'Unauthorized: Invalid API Key' }, { status: 401 });
    }

    const userId = authCheck[0].user_id;

    // 2. Validate payload
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: 'Bad Request: Invalid JSON' }, { status: 400 });
    }

    const { name, email, image_url, tax_id, address, phone } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Bad Request: Name and Email are required' }, { status: 400 });
    }

    // 3. Securely insert associated to user_id
    const result = await sql`
      INSERT INTO customers (name, email, image_url, tax_id, address, phone, user_id)
      VALUES (
        ${name}, 
        ${email}, 
        ${image_url || 'https://api.dicebear.com/7.x/initials/svg?seed=' + name}, 
        ${tax_id || null}, 
        ${address || null}, 
        ${phone || null}, 
        ${userId}
      )
      RETURNING id, name, email;
    `;

    return NextResponse.json({ 
        success: true, 
        message: 'Customer successfully imported',
        data: result[0]
    }, { status: 201 });

  } catch (error) {
    console.error('API Error /v1/customers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
