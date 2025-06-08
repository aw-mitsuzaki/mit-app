'use client';
import { useState } from 'react';
// Dify のチャットボットをポップアップで表示するコンポーネント
const DifyChatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full px-4 py-2 shadow-lg z-40"
      >
        {open ? '閉じる' : 'チャット'}
      </button>
      {open && (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          {/* 背景オーバーレイ */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30"
            onClick={() => setOpen(false)}
          />
          {/* iframeコンテナ */}
          <div
            className="relative bg-white rounded shadow-xl overflow-hidden z-40"
            style={{ width: '80%', maxWidth: '600px', height: '80%', maxHeight: '700px' }}
          >
            <iframe
              src="http://192.168.0.33/chatbot/Sz6ao2xKv8A0xVph"
              style={{ width: '100%', height: '100%' }}
              frameBorder="0"
              allow="microphone"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DifyChatbot;
