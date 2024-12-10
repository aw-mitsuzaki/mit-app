# 日報
CREATE TABLE diary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
      
# パスワード管理
CREATE TABLE password_manager (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- 一意のID
    site_name TEXT NOT NULL,             -- サイト名 (必須)
    site_url TEXT NOT NULL,              -- サイト名 (必須)
    login_id TEXT,                       -- ログインID (NULL可能)
    password TEXT NOT NULL,              -- パスワード (必須)
    email TEXT,                          -- メールアドレス (NULL可能)
    memo TEXT,                           -- メモ (NULL可能)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 作成日時
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- 更新日時
);

