import { NextResponse } from 'next/server';
import { runQuery } from '../../../lib/db';

type Diary = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

// GET: すべての日報を取得
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');
    
        // ベースのクエリ
        let query = 'SELECT * FROM diary ORDER BY id  DESC';
        const params: number[] = [];
  
        // limit が存在する場合のみ LIMIT 句をつける
        if (limit) {
          query += ' LIMIT ?';
          params.push(Number(limit));
        }

        const wikis = await runQuery<Diary>(query, params);
        return NextResponse.json(wikis);
    } catch (error) {
        console.error('Error fetching diaries:', error);
        return NextResponse.json({ error: 'Failed to fetch diaries.' }, { status: 500 });
    }
}



// POST: 新しい日報を登録
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, content } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
        }

        await runQuery<Diary>('INSERT INTO diary (title, content) VALUES (?, ?)', [title, content]);
        return NextResponse.json({ message: 'Diary entry created successfully.' });
    } catch (error) {
        console.error('Error creating diary entry:', error);
        return NextResponse.json({ error: 'Failed to create diary entry.' }, { status: 500 });
    }
}
