const fs = require('fs');
const pool = require('./db');

async function runStartupScript() {
  const sql = fs.readFileSync('./database.sql', 'utf8');

  try {
    await pool.query(sql);
    console.log('Database setup completed.');
  } catch (err) {
    console.error('Error executing script:', err.stack);
  } finally {
    pool.end();
  }
}

runStartupScript();
