import { NextResponse } from 'next/server';
import { runQuery } from '../../../../lib/db';

type Password = {
    id: number;
    site_name: string;
    site_url: string;
    login_id: string | null;
    password: string;
    email: string | null;
};

// GET: 特定の日報を取得
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    // IDのバリデーション
    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid password_manager ID.' }, { status: 400 });
    }

    try {
        // 特定のIDの日記を取得
        const result = await runQuery<Password>('SELECT * FROM password_manager WHERE id = ?', [id]);

        if (!result || result.length === 0) {
            return NextResponse.json({ error: 'password_manager entry not found.' }, { status: 404 });
        }

        return NextResponse.json(result[0]); // 結果を返す
    } catch (error) {
        console.error('Error fetching password_manager entry:', error);
        return NextResponse.json({ error: 'Failed to fetch password_manager entry.' }, { status: 500 });
    }
}

// PUT: 特定の日報を更新
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    try {
        const body = await request.json();
        const { siteName, siteUrl, loginId, pass, email, memo } = body;

        if (!siteName || !siteUrl || !pass) {
            return NextResponse.json({ error: 'site_nam, site_url, password  required.' }, { status: 400 });
        }

        const result = await runQuery<Password>('UPDATE password_manager SET site_name = ?, site_url = ?, login_id = ?, password = ?, email = ?, memo = ? WHERE id = ?', [
            siteName,
            siteUrl,
            loginId,
            pass,
            email,
            memo,
            id,
        ]);

        // 更新が成功したかチェック
        if (!result) {
            return NextResponse.json({ error: 'password_manager entry not found or no changes made.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'password_manager entry updated successfully.' });
    } catch (error) {
        console.error('Error updating password_manager entry:', error);
        return NextResponse.json({ error: 'Failed to update password_manager entry.' }, { status: 500 });
    }
}