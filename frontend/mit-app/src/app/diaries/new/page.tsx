'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewDiaryPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/diaries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            alert('Diary entry added successfully!');
            router.push('/'); // 登録後にホームページへリダイレクト
        } else {
            alert('Failed to add diary entry.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">新しい日報を作成</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="内容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 border rounded"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    登録
                </button>
            </form>
        </div>
    );
};

export default NewDiaryPage;
