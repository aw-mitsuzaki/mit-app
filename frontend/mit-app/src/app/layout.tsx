import './globals.css';
import React from "react";

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="ja">
            <body className="bg-gray-100 text-gray-800 flex flex-col min-h-screen">
                {/* ヘッダー */}
                <header className="bg-blue-500 text-white py-4 px-6">
                    <h1 className="text-lg font-bold">
                        ローカル環境個人アプリ
                        <span className="sr-only"> - このアプリの共通レイアウト</span>
                    </h1>
                </header>

                {/* メインコンテンツ */}
                <main className="flex-grow p-6 overflow-auto">
                    {children}
                </main>

                {/* フッター */}
                <footer className="bg-gray-700 text-white py-4 px-6">
                    <p className="text-center text-sm">&copy; 2024 Local Environment Personal App</p>
                </footer>
            </body>
        </html>
    );
};

export default RootLayout;
