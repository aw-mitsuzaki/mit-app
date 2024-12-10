'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Diary = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const EditDiaryPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null); // paramsから取得したIDを格納
  const [diary, setDiary] = useState<Diary | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // paramsをアンラップしてIDを取得
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  // IDが取得できたら日記データを取得
  useEffect(() => {
    if (!id) return;

    const fetchDiary = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/diaries/${id}`);
        if (!response.ok) {
          throw new Error('日記データの取得に失敗しました');
        }

        const data = await response.json();
        setDiary(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('エラーが発生しました');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [id]);

  // 更新処理
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`/api/diaries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('日記の更新に失敗しました');
      }

      alert('日記が更新されました');
      router.push('/'); // メインページにリダイレクト
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('エラーが発生しました');
      }
    }
  };

  if (loading) {
    return <p className="text-gray-500">データを読み込み中...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!diary) {
    return <p className="text-gray-500">データが見つかりません。</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">日記を編集</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            タイトル
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
            内容
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={6}
            required
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            更新
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDiaryPage;
