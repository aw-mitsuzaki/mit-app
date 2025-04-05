'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism';


type Wiki = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const WikiDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState<string | null>(null);
  const [Wiki, setWiki] = useState<Wiki | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      } catch {
        setError('パラメータの取得に失敗しました');
      }
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchWiki = async () => {
      try {
        const response = await fetch(`/api/wikis/${id}`);
        if (!response.ok) {
          throw new Error('Wikiデータの取得に失敗しました');
        }

        const data = await response.json();
        setWiki(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    fetchWiki();
  }, [id]);

  if (loading) return <p className="text-gray-500">データを読み込み中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!Wiki) return <p className="text-gray-500">データが見つかりません。</p>;


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{Wiki.title}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(Wiki.created_at).toLocaleString()}
      </p>
      <article className="markdown prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline?: boolean;
              className?: string;
              children: React.ReactNode;
            }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {Wiki.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default WikiDetailPage;
