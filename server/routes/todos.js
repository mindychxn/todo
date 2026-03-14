const pool = require('../db.js');
const router = require('express').Router();
const authorization = require('../middleware/authorization');

router.post('/create', authorization, async (req, res) => {
  try {
    const { title, notes, due, priority, remind_at } = req.body;
    const user_id = req.user;
    const newTodo = await pool.query(
      'INSERT INTO todo (title, notes, due, priority, remind_at, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, notes || null, due, priority || 'low', remind_at || null, user_id]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// get all todos for specific user
router.get('/', authorization, async (req, res) => {
  try {
    const userId = req.user;
    const complete = req.query.complete === 'true';
    const query = complete
      ? 'SELECT * FROM todo WHERE user_id = $1 AND completed_at IS NOT NULL ORDER BY completed_at DESC'
      : `SELECT * FROM todo WHERE user_id = $1 AND completed_at IS NULL 
         ORDER BY CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 END, due ASC`;
    const allTodos = await pool.query(query, [userId]);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get all todos for today
router.get('/today', authorization, async (req, res) => {
  try {
    const userId = req.user;
    const complete = req.query.complete === 'true';
    const todayDate = req.query.date || new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
    const query = complete
      ? 'SELECT * FROM todo WHERE user_id = $1 AND completed_at IS NOT NULL AND due = $2 ORDER BY completed_at DESC'
      : `SELECT * FROM todo WHERE user_id = $1 AND completed_at IS NULL AND due = $2 
         ORDER BY CASE priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 WHEN 'low' THEN 3 END`;
    const todayTodos = await pool.query(query, [userId, todayDate]);
    res.json(todayTodos.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get a specific todo by id
router.get('/:id', authorization, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2', [id, userId]);
    if (todo.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// update a todo
router.put('/:id', authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const { title, notes, due, priority, remind_at, complete } = req.body;
    
    // Convert complete boolean to completed_at timestamp
    const completed_at = complete ? new Date() : null;
    
    const updateTodo = await pool.query(
      'UPDATE todo SET title = $1, notes = $2, due = $3, priority = $4, remind_at = $5, completed_at = $6 WHERE todo_id = $7 AND user_id = $8 RETURNING *',
      [title, notes || null, due, priority || 'low', remind_at || null, completed_at, id, userId]
    );
    if (updateTodo.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// delete a todo
router.delete('/:id', authorization, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    if (deleteTodo.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
