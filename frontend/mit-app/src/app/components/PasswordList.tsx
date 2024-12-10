'use client';

import React from "react";
import { useRouter } from "next/navigation"; // 修正：next/router ではなく next/navigation を使用

type Password = {
    id: number;
    site_name: string;
    site_url: string;
    login_id: string | null;
    password: string;
    email: string | null;
};

type PasswordListProps = {
    passwords: Password[];
};

const PasswordList: React.FC<PasswordListProps> = ({ passwords }) => {
    const router = useRouter();

    const handleUpdate = (id: number) => {
        router.push(`/passwords/edit/${id}`); // 動的ルートに遷移
    };

    return (
        <table className="w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="py-4 px-2 border-b border-gray-300">サイト名</th>
                    <th className="py-4 px-2 border-b border-gray-300">サイトURL</th>
                    <th className="py-4 px-2 border-b border-gray-300">ログインID</th>
                    <th className="py-4 px-2 border-b border-gray-300">パスワード</th>
                    <th className="py-4 px-2 border-b border-gray-300">メールアドレス</th>
                    <th className="py-4 px-2 border-b border-gray-300">操作</th>
                </tr>
            </thead>
            <tbody>
                {passwords.map((password) => (
                    <tr key={password.id} className="hover:bg-gray-50">
                        <td className="py-4 px-2 border-b border-gray-300">{password.site_name}</td>
                        <td className="py-4 px-2 border-b border-gray-300">
                            <a
                                href={password.site_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {password.site_url}
                            </a>
                        </td>
                        <td className="py-4 px-2 border-b border-gray-300">{password.login_id || "N/A"}</td>
                        <td className="py-4 px-2 border-b border-gray-300">{password.password}</td>
                        <td className="py-4 px-2 border-b border-gray-300">{password.email || "N/A"}</td>
                        <td className="py-4 px-2 border-b border-gray-300 text-center">
                            <button
                                onClick={() => handleUpdate(password.id)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
                            >
                                更新
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PasswordList;
