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
  }
});

// get a todo
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// update a todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // get id from url param
    const { description, due, complete } = req.body; // get updated decription from body of req
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1, due = $2, complete = $3 WHERE todo_id = $4 RETURNING *',
      [description, due, complete, id]
    );
    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.json(deleteTodo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// get all todos for today
router.get('/today', authorization, async (req, res) => {
  try {
    const userId = req.user;
    const complete = req.complete;
    const todayTodos = await pool.query('SELECT * FROM todo WHERE user_id = $1, complete = $2, due = CURRENT_DATE', [userId, complete]);
    res.json(todayTodos.rows);
  } catch (err) {
    console.error(err);
  }
});


module.exports = router;
