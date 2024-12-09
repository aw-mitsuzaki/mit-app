import Link from 'next/link';
import DiaryCard from '../components/DiaryCard/DiaryCard';
import { runQuery } from '../../lib/db';

const MainPage = async () => {
  let diaries = [];
  try {
    // データベースからデータを取得し、プレーンオブジェクトに変換
    const rawDiaries = await runQuery('SELECT * FROM diary');
    console.log(rawDiaries);

    diaries = rawDiaries.map((diary: any) => ({
      id: diary.id,
      title: diary.title,
      content: diary.content,
      created_at: diary.created_at,
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
