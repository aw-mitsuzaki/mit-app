import { NextResponse } from 'next/server';
import { runQuery } from '../../../../lib/db';

// GET: 特定の日報を取得
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params; // URLからIDを取得

    // IDのバリデーション
    if (isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid diary ID.' }, { status: 400 });
    }

    try {
        // 特定のIDの日記を取得
        const result = await runQuery('SELECT * FROM diary WHERE id = ?', [id]);

        if (result.length === 0) {
            return NextResponse.json({ error: 'Diary entry not found.' }, { status: 404 });
        }

        return NextResponse.json(result[0]); // 結果を返す
    } catch (error) {
        console.error('Error fetching diary entry:', error);
        return NextResponse.json({ error: 'Failed to fetch diary entry.' }, { status: 500 });
    }
}


// PUT: 特定の日報を更新
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params; // URLからIDを取得

    try {
        const body = await req.json();
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
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Diary entry not found or no changes made.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Diary entry updated successfully.' });
    } catch (error) {
        console.error('Error updating diary entry:', error);
        return NextResponse.json({ error: 'Failed to update diary entry.' }, { status: 500 });
    }
}


// DELETE: 特定の日報を削除
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params; // URLからIDを取得

    // IDのバリデーション
    if (isNaN(Number(id))) {
        return NextResponse.json({ error: 'Invalid diary ID.' }, { status: 400 });
    }

    try {
        const result = await runQuery('DELETE FROM diary WHERE id = ?', [id]);

        // 削除が成功したかチェック
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Diary entry not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Diary entry deleted successfully.' });
    } catch (error) {
        console.error('Error deleting diary entry:', error);
        return NextResponse.json({ error: 'Failed to delete diary entry.' }, { status: 500 });
    }
}
