const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog_website',
  password: 'Linhcutephomaique200',
  port: 5432,
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT password_hash FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const passwordMatch = await bcrypt.compare(password, result.rows[0].password_hash);

      if (passwordMatch) {
        res.status(200).send('Login successful!');
      } else {
        res.status(401).send('Invalid credentials.');
      }
    } else {
      res.status(401).send('Invalid credentials.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
