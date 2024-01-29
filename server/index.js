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
    // insert description fro req body into todo table
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1)', [description]);
    res.json(newTodo); // send response of newly added todo
  } catch (err) { console.error(err) };
})

// get all todos

// get a todo

// update a todo

// delete a todo
app.listen(3000, () => {
  console.log("Server started on port 3000...");
})
