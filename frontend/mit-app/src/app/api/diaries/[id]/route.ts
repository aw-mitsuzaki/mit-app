import { NextResponse } from 'next/server';
import { runQuery } from '../../../../lib/db';


// GET: 特定の日報を取得
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    // IDのバリデーション
    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid diary ID.' }, { status: 400 });
    }

    try {
        // 特定のIDの日記を取得
        const result = await runQuery('SELECT * FROM diary WHERE id = ?', [id]);

        if (!result || result.length === 0) {
            return NextResponse.json({ error: 'Diary entry not found.' }, { status: 404 });
        }

        return NextResponse.json(result[0]); // 結果を返す
    } catch (error) {
        console.error('Error fetching diary entry:', error);
        return NextResponse.json({ error: 'Failed to fetch diary entry.' }, { status: 500 });
    }
}

// PUT: 特定の日報を更新
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    try {
        const body = await request.json();

        const { title, content } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
        }

        const result = await runQuery('UPDATE diary SET title = ?, content = ? WHERE id = ?', [
            title,
            content,
            id,
        ]);

        // 更新が成功したかチェック
        if (!result) {
            return NextResponse.json({ error: 'Diary entry not found or no changes made.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Diary entry updated successfully.' });
    } catch (error) {
        console.error('Error updating diary entry:', error);
        return NextResponse.json({ error: 'Failed to update diary entry.' }, { status: 500 });
    }
}