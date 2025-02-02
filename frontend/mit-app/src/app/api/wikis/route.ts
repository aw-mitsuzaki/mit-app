import { NextResponse } from 'next/server';
import { runQuery } from '../../../lib/db';

type Wiki = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

// GET: すべてのwikiを取得
export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const limit = searchParams.get('limit');
  
      // ベースのクエリ
      let query = 'SELECT * FROM wiki ORDER BY id DESC';
      const params: any[] = [];
  
      // limit が存在する場合のみ LIMIT 句をつける
      if (limit) {
        query += ' LIMIT ?';
        params.push(Number(limit));
      }
  
      const wikis = await runQuery<Wiki>(query, params);
      return NextResponse.json(wikis);
    } catch (error) {
      console.error('Error fetching wikis:', error);
      return NextResponse.json({ error: 'Failed to fetch wikis.' }, { status: 500 });
    }
  }

// POST: 新しいwikiを登録
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, content } = body;

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
        }

        await runQuery<Wiki>('INSERT INTO wiki (title, content) VALUES (?, ?)', [title, content]);
        return NextResponse.json({ message: 'Diary entry created successfully.' });
    } catch (error) {
        console.error('Error creating wiki entry:', error);
        return NextResponse.json({ error: 'Failed to create wiki entry.' }, { status: 500 });
    }
}
