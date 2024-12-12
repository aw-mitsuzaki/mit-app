'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewDiaryPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle || !trimmedContent) {
            alert('タイトルと内容を入力してください。');
            return;
        }

        try {
            const response = await fetch('/api/diaries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: trimmedTitle, content: trimmedContent }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '日報の登録に失敗しました。');
            }

            alert('日報が正常に追加されました！');
            router.push('/');
        } catch (error) {
            console.error('Error adding diary entry:', error);
            alert(`エラーが発生しました: ${error.message || '不明なエラー'}`);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">新しい日報を作成</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="タイトル"
                    aria-label="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="内容"
                    aria-label="内容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 border rounded"
                    rows={5}
                    required
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    登録
                </button>
            </form>
        </div>
    );
};

export default NewDiaryPage;
