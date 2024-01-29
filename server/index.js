import express from 'express';
import cors from 'cors';
import pool from './db.js';
const app = express();

// middleware
app.use(cors());
app.use(express.json()); // for parsing JSON in the request body

// ROUTES

// create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body; // get description value from request body 
    // insert description fro req body into todo table, return data
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
    res.json(newTodo.rows[0]); // send response of newly added todo
  } catch (err) { 
    console.error(err);
  }
})

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) { 
    console.error(err);
  }
})

// get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (err) { 
    console.error(err);
  }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params; // get id from url param
    const { description } = req.body; // get updated decription from body of req
    const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE id = $2 RETURNING *', [description, id])
    res.json(updateTodo.rows[0]);
  } catch (err) { 
    console.error(err);
  }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE id = $1', [id])
    res.json(deleteTodo.rows[0]);
  } catch (err) {
    console.lerror(err);
  }
})
app.listen(3000, () => {
  console.log("Server started on port 3000...");
})
