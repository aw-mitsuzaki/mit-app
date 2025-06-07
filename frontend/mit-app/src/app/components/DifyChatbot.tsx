'use client';

import { useState } from 'react';
// Dify を iframe で埋め込むシンプルなチャットボット

const DifyChatbot = () => {
  const [visible, setVisible] = useState(true);

  const toggleChatbot = () => {

  return (
    <>
      <button
        onClick={toggleChatbot}
        className="fixed bottom-24 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        {visible ? 'チャット非表示' : 'チャット表示'}
      </button>
      {visible && (
        <iframe
          src="http://192.168.0.33/chatbot/Sz6ao2xKv8A0xVph"
          style={{ width: '100%', height: '100%', minHeight: '700px' }}
          frameBorder="0"
          allow="microphone"
        />
      )}
        strategy="afterInteractive"
      />
    </>
  );
};

export default DifyChatbot;
