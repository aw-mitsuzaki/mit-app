'use client';

import { useState } from 'react';
import Script from 'next/script';

const DifyChatbot = () => {
  const [visible, setVisible] = useState(true);

  const toggleChatbot = () => {
    const bubbleButton = document.getElementById('dify-chatbot-bubble-button');
    const bubbleWindow = document.getElementById('dify-chatbot-bubble-window');
    if (visible) {
      if (bubbleButton) bubbleButton.style.display = 'none';
      if (bubbleWindow) bubbleWindow.style.display = 'none';
    } else {
      if (bubbleButton) bubbleButton.style.display = 'block';
    }
    setVisible(!visible);
  };

  return (
    <>
      <button
        onClick={toggleChatbot}
        className="fixed bottom-24 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        {visible ? 'チャット非表示' : 'チャット表示'}
      </button>
      <Script id="dify-chatbot-config" strategy="afterInteractive">
        {`window.difyChatbotConfig = {
          token: 'Sz6ao2xKv8A0xVph',
          baseUrl: 'http://192.168.0.33',
          systemVariables: {}
        };`}
      </Script>
      <Script
        src="http://192.168.0.33/embed.min.js"
        id="Sz6ao2xKv8A0xVph"
        strategy="afterInteractive"
      />
    </>
  );
};

export default DifyChatbot;
