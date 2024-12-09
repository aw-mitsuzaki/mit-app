import { runQuery } from './db';

async function initDB() {
    try {
        // テーブルが存在しない場合に作成
        await runQuery(`
      CREATE TABLE IF NOT EXISTS diary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('Table "diary" initialized successfully.');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

// 実行
initDB().then(() => {
    console.log('Database initialization complete.');
    process.exit(0); // 正常終了
}).catch((err) => {
    console.error(err);
    process.exit(1); // エラー終了
});