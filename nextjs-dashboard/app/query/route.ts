import { db } from "@vercel/postgres";
const client = await db.connect();

async function listInvoices() {
    const data = await client.sql`
        SELECT invoices.amount, customers.name
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        WHERE invoices.amount = 666;
    `;
    return data.rows;
}

export async function GET() {
    try {
        return Response.json(await listInvoices());
    } catch (error: any) { // Explicitly typing the error as 'any'
        console.error("Error fetching invoices:", error); // Log the error for debugging
        return Response.json({ error: error.message }, { status: 500 });
    }
}
