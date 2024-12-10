import sqlite3 from 'sqlite3';

const DATABASE_PATH = './database/db.sqlite';


// SQLiteデータベースの接続を初期化
export const db = new sqlite3.Database(DATABASE_PATH, (err) => {
    if (err) {
        console.error('Failed to connect to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// 型引数を用いた汎用的なクエリ実行関数
export function runQuery<T>(query: string, params: (string | number)[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(new Error(`SQLite Error: ${err.message}`));
            } else {
                resolve(rows as T[]);
            }
        });
    });
}

// 単一データ取得用関数
export function getQuery<T>(query: string, params: (string | number)[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(new Error(`SQLite Error: ${err.message}`));
            } else {
                resolve(row as T | undefined);
            }
        });
    });
}

// 全データ取得用関数
export function allQuery<T>(query: string, params: (string | number)[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(new Error(`SQLite Error: ${err.message}`));
            } else {
                resolve(rows as T[]);
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
