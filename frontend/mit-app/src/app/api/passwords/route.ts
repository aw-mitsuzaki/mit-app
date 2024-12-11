import { NextResponse } from 'next/server';
import { runQuery } from '../../../lib/db';

type Password = {
    id: number;
    site_name: string;
    site_url: string;
    login_id: string | null;
    password: string;
    email: string | null;
};

// GET: すべての日報を取得
export async function GET() {
    try {
        const diaries = await runQuery<Password>('SELECT * FROM password_manager ORDER BY site_name');
        return NextResponse.json(diaries);
    } catch (error) {
        console.error('Error fetching password_manager:', error);
        return NextResponse.json({ error: 'Failed to fetch diaries.' }, { status: 500 });
    }
}


// POST: 新しいパスワードを登録
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { site_name, site_url, login_id, password, email, memo } = body;

        if (!site_name || !site_url || !password) {
            return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
        }

        await runQuery<Password>("INSERT INTO password_manager (site_name, site_url, login_id, password, email, memo) VALUES (?, ?, ?, ?, ?, ? )", [site_name, site_url, login_id, password, email, memo]);
        return NextResponse.json({ message: 'password_manager entry created successfully.' });
    } catch (error) {
        console.error('Error creating password_manager entry:', error);
        return NextResponse.json({ error: 'Failed to create diary entry.' }, { status: 500 });
    }
}
