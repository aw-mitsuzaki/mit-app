import Link from 'next/link';
import DiaryCard from '../components/DiaryCard/DiaryCard';
import { runQuery } from '../../lib/db';

type Diary = {
  id: number;
  title: string;
  content: string;
  created_at: string; // データベースの型に応じて変更
};

const MainPage = async () => {
  let diaries: Diary[] = [];
  try {
    // データベースからデータを取得し、型を指定
    const rawDiaries: Diary[] = await runQuery('SELECT * FROM diary');
    console.log(rawDiaries);

    diaries = rawDiaries.map((diary) => ({
      id: diary.id as number,
      title: diary.title as string,
      content: diary.content as string,
      created_at: diary.created_at as string,
    }));
  } catch (error) {
    console.error('Error fetching diaries:', error);
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
