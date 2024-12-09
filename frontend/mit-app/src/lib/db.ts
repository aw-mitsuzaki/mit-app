const sqlite3 = require('sqlite3').verbose();

const DATABASE_PATH = './database/db.sqlite';

export const db = new sqlite3.Database(DATABASE_PATH, (err) => {
    if (err) {
        console.error('Failed to connect to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

export function runQuery(query: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(new Error(`SQLite Error: ${err.message}`));
            } else {
                resolve(rows);
            }
        });
    });
}

export function getQuery(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(new Error(`SQLite Error: ${err.message}`));
            } else {
                resolve(row);
            }
        });
    });
}

export function allQuery(query: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(new Error(`SQLite Error: ${err.message}`));
            } else {
                resolve(rows);
            }
        });
    });
}

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
