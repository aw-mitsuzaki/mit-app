'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Password = {
  id: number;
  site_name: string;
  site_url: string;
  login_id: string | null;
  password: string;
  email: string | null;
  memo: string | null;
};

const UpdatePasswordPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [password, setPassword] = useState<Password | null>(null);
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [loginId, setLoginId] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [memo, setMemo] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  // paramsをアンラップしてIDを取得
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  // IDが取得できたらパスワードデータを取得
  useEffect(() => {
    if (!id) return;

    const fetchPassword = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/passwords/${id}`);
        if (!response.ok) throw new Error('Failed to fetch password data');

        const data: Password = await response.json();
        setPassword(data);
        setSiteName(data.site_name);
        setSiteUrl(data.site_url);
        setLoginId(data.login_id);
        setPass(data.password);
        setEmail(data.email);
        setMemo(data.memo);

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          console.error('Error fetching password:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPassword();
  }, [id]);


  // 更新処理
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`/api/passwords/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteName, siteUrl, loginId, pass, email, memo }),
      });

      if (!response.ok) throw new Error('Failed to update password');

      alert('パスワードが更新されました！');

      router.push('/'); // 更新後にメインページへ遷移
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!password) {
    return <div>データが見つかりません</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">パスワード更新</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="siteName">サイト名</label>
          <input
            id="siteName"
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="siteUrl">サイトURL</label>
          <input
            id="siteUrl"
            type="text"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="loginId">ログインID</label>
          <input
            id="loginId"
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">パスワード</label>
          <input
            id="password"
            type="text"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="memo">メモ</label>
          <textarea
            id="content"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full p-2 border rounded"
            rows={6}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          更新
        </button>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;