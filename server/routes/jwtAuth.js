const pool = require('../db.js');
const router = require('express').Router();
const bcrypt = require('bcrypt'); // for hashing passwords
const jwtGenerator = require('../utils/jwtGenerator.js');
const validInfo = require('../middleware/validInfo.js');
const authorization = require('../middleware/authorization.js');

// register a new user

router.post('/register', validInfo, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if email already exists
    const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length !== 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // check if username already exists
    const usernameCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (usernameCheck.rows.length !== 0) {
      return res.status(400).json({ error: 'Username already taken' });
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

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// login route

router.post('/login', validInfo, async (req, res) => {
  try {
    // destructure the req.body, expecting a request with login info of email and password
    const { username, password } = req.body;

    // check if user exists, if not throw error

    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // generate jwt token if login is successful

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/verify', authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
