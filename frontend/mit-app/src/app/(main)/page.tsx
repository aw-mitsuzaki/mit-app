'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DiaryCard from '../components/DiaryCard';
import WikiCard from '../components/WikiCard';
import PasswordList from '../components/PasswordList';

type Diary = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

type Wiki = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

type Password = {
  id: number;
  site_name: string;
  site_url: string;
  login_id: string | null;
  password: string;
  email: string | null;
  category: string | null;
};

const MainPage = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [wikis, setWikis] = useState<Wiki[]>([]);
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ diaries?: string; wikis?: string; passwords?: string }>({});

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
        fetchData<Diary[]>('/api/diaries?limit=3', setDiaries, 'diaries'),
        fetchData<Wiki[]>('/api/wikis?limit=3', setWikis, 'wikis'),
        fetchData<Password[]>('/api/passwords', setPasswords, 'passwords'),
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
        <h1 className="text-2xl font-bold">日報 & パスワード管理</h1>
        <div className="flex space-x-4">
          <Link
            href="/wikis/new"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition-transform"
          >
            Wiki登録
          </Link>
          <Link
            href="/diaries/new"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition-transform"
          >
            日報登録
          </Link>
          <Link
            href="/passwords/new"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 active:scale-95 transition-transform"
          >
            パスワード登録
          </Link>
        </div>
      </header>

      <section className="my-6">
        <h2 className="text-xl font-semibold">
        <Link
              href="/diaries"
          >
            日報一覧
          </Link>
        </h2>
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

      <section className="my-6">
        <h2 className="text-xl font-semibold">
          <Link
              href="/wikis"
          >
            wiki一覧
          </Link>
        </h2>
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

      <section className="my-6">
        <h2 className="text-xl font-semibold">パスワード一覧</h2>
        {errors.passwords ? (
          <p className="text-red-500">{errors.passwords}</p>
        ) : passwords.length > 0 ? (
          <PasswordList passwords={passwords} />
        ) : (
          <p className="text-gray-500">登録されたパスワードがありません。</p>
        )}
      </section>
    </div>
  );
};

export default MainPage;
