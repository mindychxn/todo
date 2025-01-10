

CREATE TABLE IF NOT EXISTS users (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(225) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS todo (
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(225) NOT NULL,
  due DATE,
  complete BOOLEAN DEFAULT FALSE,
  user_id uuid NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
