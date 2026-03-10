const pool = require('../db.js');
const router = require('express').Router();
const authorization = require('../middleware/authorization');

router.post('/create', authorization, async (req, res) => {
  try {
    const { description, due } = req.body; // get description value from request body
    const user_id = req.user;
    // insert description fro req body into todo table, return data
    const newTodo = await pool.query(
      'INSERT INTO todo (description, due, user_id) VALUES($1, $2, $3) RETURNING *',
      [description, due, user_id]
    );
    res.json(newTodo.rows[0]); // send response of newly added todo
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos for specific user
router.get('/', authorization, async (req, res) => {
  try {
    const userId = req.user;
    const complete = req.query.complete;
    const allTodos = await pool.query('SELECT * FROM todo WHERE user_id = $1 AND complete = $2 ORDER BY due ASC', [userId, complete]);

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
    const complete = req.query.complete;
    const todayTodos = await pool.query(
      'SELECT * FROM todo WHERE user_id = $1 AND complete = $2 AND due = CURRENT_DATE',
      [userId, complete]
    );
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
    const { description, due, complete } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1, due = $2, complete = $3 WHERE todo_id = $4 AND user_id = $5 RETURNING *',
      [description, due, complete, id, userId]
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
