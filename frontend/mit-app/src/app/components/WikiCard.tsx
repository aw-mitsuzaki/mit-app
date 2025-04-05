'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type Wiki = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const WikiCard = ({ wiki }: { wiki: Wiki }) => {
  const router = useRouter();

  // useMemoを使って、日付フォーマットの計算を最適化
  const formattedDate = useMemo(() => {
    const date = new Date(wiki.created_at);
    return date.toLocaleString();
  }, [wiki.created_at]);

  const handleView = () => {
    router.push(`/wikis/${wiki.id}`);
  };

  const handleUpdate = () => {
    router.push(`/wikis/edit/${wiki.id}`);
  };

  return (
    <div className="bg-white border p-4 rounded shadow-md w-full">
      <h2 className="text-lg font-bold truncate" title={wiki.title}>
        {wiki.title}
      </h2>
      <p className="text-gray-700 mt-2 line-clamp-3" title={wiki.content}>
        {wiki.content}
      </p>
      <p className="text-sm text-gray-500 mt-4">{formattedDate}</p>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={handleView}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          表示
        </button>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          更新
        </button>
      </div>
    </div>
  );
};

export default WikiCard;
