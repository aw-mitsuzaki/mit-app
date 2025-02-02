'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import WikiCard from '../components/WikiCard';

type Wiki = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const WikiPage = () => {
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ diaries?: string; passwords?: string }>({});

  const fetchData = async <T,>(url: string, setter: (data: T) => void, key: keyof typeof errors) => {
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

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchData<Wiki[]>('/api/wikis', setWikis, 'wikis'),
      ]);
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
        <h1 className="text-2xl font-bold">Wiki管理</h1>
        <div className="flex space-x-4">
          <Link
            href="/wikis/new"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition-transform"
          >
            Wiki登録
          </Link>
        </div>
      </header>

      <section className="my-6">
        <h2 className="text-xl font-semibold">wiki一覧</h2>
        {errors.wikis ? (
          <p className="text-red-500">{errors.wikis}</p>
        ) : wikis.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wikis.map((wiki) => (
              <WikiCard key={wiki.id} wiki={wiki} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">登録されたWikiがありません。</p>
        )}
      </section>

    </div>
  );
};

export default WikiPage;
