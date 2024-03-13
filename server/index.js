const express = require('express');
const cors = require('cors');
const app = express();

// middleware
app.use(cors());
app.use(express.json()); // for parsing JSON in the request body

// ROUTES

app.use('/auth', require('./routes/jwtAuth'));

app.use('/todos', require('./routes/todos'));

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
