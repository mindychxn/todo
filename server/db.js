const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
  user: 'todo_user',
  password: 'password',
  host: 'localhost',
  database: 'perntodo',
});

module.exports = pool;
