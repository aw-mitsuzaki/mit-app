import sqlite3 from 'sqlite3';

const DATABASE_PATH = './database/db.sqlite';

// Diaryの型を定義
type Diary = {
    id: number;
    title: string;
    content: string;
    created_at: string; // 必要に応じてDate型に変換も可能
};

// SQLiteデータベースの接続を初期化
export const db = new sqlite3.Database(DATABASE_PATH, (err) => {
    if (err) {
        console.error('Failed to connect to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// クエリを実行する関数
export function runQuery(query: string, params: (string | number)[] = []): Promise<Diary[]> {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(new Error(`SQLite Error: ${err.message}`));
            } else {
                resolve(rows as Diary[]); // 明示的にDiary[]型にキャスト
            }
        });
    });
}

// 単一のデータを取得する関数
export function getQuery(query: string, params: (string | number)[] = []): Promise<Diary | undefined> {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(new Error(`SQLite Error: ${err.message}`));
            } else {
                resolve(row as Diary | undefined); // 明示的に型をキャスト
            }
        });
    });
}

// 全データを取得する関数
export function allQuery(query: string, params: (string | number)[] = []): Promise<Diary[]> {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(new Error(`SQLite Error: ${err.message}`));
            } else {
                resolve(rows as Diary[]); // 明示的にDiary[]型にキャスト
            }
        });
    });
}

// データベースを閉じる関数
export function closeDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) {
                reject(new Error(`Failed to close the database: ${err.message}`));
            } else {
                resolve();
            }
        });
    });
}
