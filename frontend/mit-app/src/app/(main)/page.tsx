'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DiaryCard from '../components/DiaryCard/DiaryCard';

type Diary = {
  id: number;
  title: string;
  content: string;
  created_at: string; // データベースの型に応じて変更
};

const MainPage = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await fetch('/api/diaries'); // APIエンドポイントにリクエスト
        if (!response.ok) throw new Error('Failed to fetch diaries');

        const data: Diary[] = await response.json();
        setDiaries(data); // データをstateに設定
      } catch (error) {
        console.error('Error fetching diaries:', error);
      } finally {
        setLoading(false); // ローディングを終了
      }
    };

    fetchDiaries();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="p-3">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">日報</h1>
        <Link href="/diaries/new" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-transform duration-200 flex items-center;">
          登録
        </Link>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {diaries.map((diary) => (
          <DiaryCard key={diary.id} diary={diary} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
