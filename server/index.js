import express from 'express';
import cors from 'cors';
const app = express();

// middleware
app.use(cors());
app.use(express.json()); // for parsing JSON in the request body

app.listen(3000, () => {
  console.log("Server started on port 3000...");
})
