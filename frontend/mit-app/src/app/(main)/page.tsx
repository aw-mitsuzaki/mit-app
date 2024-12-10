'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DiaryCard from '../components/DiaryCard';
import PasswordList from '../components/PasswordList';

type Diary = {
  id: number;
  title: string;
  content: string;
  created_at: string; // データベースの型に応じて変更
};


type Password = {
  id: number;
  site_name: string;
  site_url: string;
  login_id: string | null;
  password: string;
  email: string | null;
};


const MainPage = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [passwords, setPasswords] = useState<Password[]>([]);

  const [loadingDiaries, setLoadingDiaries] = useState(true);
  const [loadingPasswords, setLoadingPasswords] = useState(true);

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
        setLoadingDiaries(false); // ローディングを終了
      }
    };

    fetchDiaries();


  }, []);

  // パスワードデータを取得
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await fetch('/api/passwords'); // APIエンドポイント
        if (!response.ok) throw new Error('Failed to fetch passwords');

        const data: Password[] = await response.json();
        setPasswords(data);
      } catch (error) {
        console.error('Error fetching passwords:', error);
      } finally {
        setLoadingPasswords(false);
      }
    };

    fetchPasswords();
  }, []);

  if (loadingDiaries || loadingPasswords) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="p-3">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">日記 & パスワード管理</h1>
        <Link href="/diaries/new" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-transform duration-200 flex items-center;">
          日記登録
        </Link>
        <Link
          href="/passwords/new"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg active:scale-95 transition-transform duration-200 flex items-center;"
        >
          パスワード登録
        </Link>
      </header>
      {/* 日報一覧 */}
      <section className="my-6">
        <h2 className="text-xl font-semibold">日記一覧</h2>
        {diaries.map((diary) => (
          <DiaryCard key={diary.id} diary={diary} />
        ))}
      </section>

      {/* パスワード一覧 */}
      <section className="my-6">
        <h2 className="text-xl font-semibold">パスワード一覧</h2>
        <PasswordList passwords={passwords} />
      </section>
    </div>
  );
};

export default MainPage;
