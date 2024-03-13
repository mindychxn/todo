const pool = require('../db.js');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { description } = req.body; // get description value from request body
    // insert description fro req body into todo table, return data
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [
      description,
    ]);
    res.json(newTodo.rows[0]); // send response of newly added todo
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
router.get('/', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err);
  }
});

// get a todo
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// update a todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // get id from url param
    const { description } = req.body; // get updated decription from body of req
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE id = $2 RETURNING *',
      [description, id]
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
    const deleteTodo = await pool.query('DELETE FROM todo WHERE id = $1', [id]);
    res.json(deleteTodo.rows[0]);
  } catch (err) {
    console.lerror(err);
  }
});

module.exports = router;
