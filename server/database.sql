CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');

CREATE TABLE IF NOT EXISTS users (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(225) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS todo (
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  notes TEXT,
  due DATE,
  priority priority_level DEFAULT 'low',
  remind_at TIMESTAMP,              -- null = no reminder, not null = remind at this time
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,           -- null = incomplete, not null = completed at this time
  user_id uuid NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tags (
  tag_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7) DEFAULT '#9CA3AF',  -- default gray hex color
  user_id uuid NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE(name, user_id)
);

CREATE TABLE IF NOT EXISTS todo_tags (
  todo_id INTEGER REFERENCES todo(todo_id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(tag_id) ON DELETE CASCADE,
  PRIMARY KEY (todo_id, tag_id)
);
