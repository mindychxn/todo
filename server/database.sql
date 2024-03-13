CREATE DATABASE perntodo;

CREATE TABLE users (
  user_id uuid PRIMARY KEY DEFAULT
  uuid_generate_v4(),
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  description VARCHAR(225)
);