import { NextResponse } from 'next/server';
import { runQuery } from '../../../../lib/db';

type Wiki = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

// GET: 特定のwikiを取得
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    // IDのバリデーション
    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid wiki ID.' }, { status: 400 });
    }

    try {
        // 特定のIDのwikiを取得
        const result = await runQuery<Wiki>('SELECT * FROM wiki WHERE id = ?', [id]);

        if (!result || result.length === 0) {
            return NextResponse.json({ error: 'Wiki entry not found.' }, { status: 404 });
        }

        return NextResponse.json(result[0]); // 結果を返す
    } catch (error) {
        console.error('Error fetching wiki entry:', error);
        return NextResponse.json({ error: 'Failed to fetch wiki entry.' }, { status: 500 });
    }
}

// PUT: 特定のwikiを更新
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    try {
        const body = await request.json();

        const { title, content } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
        }

        const result = await runQuery<Wiki>('UPDATE wiki SET title = ?, content = ? WHERE id = ?', [
            title,
            content,
            id,
        ]);

        // 更新が成功したかチェック
        if (!result) {
            return NextResponse.json({ error: 'Wiki entry not found or no changes made.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Wiki entry updated successfully.' });
    } catch (error) {
        console.error('Error updating wiki entry:', error);
        return NextResponse.json({ error: 'Failed to update wiki entry.' }, { status: 500 });
    }
}