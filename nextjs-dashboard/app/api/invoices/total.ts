import { NextApiRequest, NextApiResponse } from 'next';

// Sample data for invoices, replace this with your actual data source
const invoices = [
    { id: 1, amount: 100 },
    { id: 2, amount: 200 },
    { id: 3, amount: 150 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const totalAmount = invoices.reduce((total, invoice) => total + invoice.amount, 0);
    res.status(200).json({ total: totalAmount });
}
