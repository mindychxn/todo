import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'todo_user',
  password: 'password',
  host: 'localhost',
  database: 'perntodo'
})

export default pool;