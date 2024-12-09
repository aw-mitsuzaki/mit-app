'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Diary = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const DiaryCard = ({ diary }: { diary: Diary }) => {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const date = new Date(diary.created_at);
    setFormattedDate(date.toLocaleString());
  }, [diary.created_at]);

  const handleUpdate = () => {
    router.push(`/diaries/edit/${diary.id}`);
  };

  return (
    <div className="bg-white border p-4 rounded shadow-md w-full">
      <h2 className="text-lg font-bold">{diary.title}</h2>
      <p className="text-gray-700 mt-2">{diary.content}</p>
      <p className="text-sm text-gray-500 mt-4">{formattedDate}</p>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          更新
        </button>
      </div>
    </div>
  );
};

export default DiaryCard;
