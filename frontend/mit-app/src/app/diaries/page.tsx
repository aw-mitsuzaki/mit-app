'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DiaryCard from '../components/DiaryCard';

type Diary = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const DiaryPage = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ diaries?: string }>({});

  useEffect(() => {
    const fetchData = async <T,>(
      url: string,
      setter: (data: T) => void,
      key: keyof typeof errors
    ) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`${key}の取得に失敗しました。`);
        const data: T = await response.json();
        setter(data);
      } catch (err) {
        console.error(`Error fetching ${key}:`, err);
        setErrors((prev) => ({ ...prev, [key]: (err as Error).message }));
      }
    };

    const loadData = async () => {
      await fetchData<Diary[]>('/api/diaries', setDiaries, 'diaries');
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="p-3">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">日報管理</h1>
        <div className="flex space-x-4">
          <Link
            href="/diaries/new"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition-transform"
          >
            日報登録
          </Link>
        </div>
      </header>

      <section className="my-6">
        <h2 className="text-xl font-semibold">日報一覧</h2>
        {errors.diaries ? (
          <p className="text-red-500">{errors.diaries}</p>
        ) : diaries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {diaries.map((diary) => (
              <DiaryCard key={diary.id} diary={diary} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">登録された日報がありません。</p>
        )}
      </section>
    </div>
  );
};

export default DiaryPage;
