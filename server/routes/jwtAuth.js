const pool = require('../db.js');
const router = require('express').Router();
const bcrypt = require('bcrypt'); // for hashing passwords
const jwtGenerator = require('../utils/jwtGenerator.js');

// register a new user

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user already exists using email (if they already exist send error)
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length !== 0) {
      // if user already exists
      return res.status(401).send('User with that email already exists');
    }

    // bcrypt user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // insert user into db table
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, bcryptPassword]
    );

    // generate jwt

    const token = jwtGenerator(newUser.rows[0].id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// login route

router.post('/login', async (req, res) => {
  try {
    // destructure the req.body, expecting a request with login info of email and password
    const { email, password } = req.body;

    // check if user exists, if not throw error

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json('Password or Email is incorrect');
    }
    // check if incoming password is correct

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json('Password or Email is incorrect');
    }

    // generate jwt token if login is successful

    const token = jwtGenerator(user.rows[0].id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
