'use client';

// Dify を iframe で埋め込むシンプルなチャットボット

const DifyChatbot = () => {
  return (
    <iframe
      src="http://192.168.0.33/chatbot/Sz6ao2xKv8A0xVph"
      style={{ width: '100%', height: '100%', minHeight: '700px' }}
      frameBorder="0"
      allow="microphone"
    />
  );
};

export default DifyChatbot;
