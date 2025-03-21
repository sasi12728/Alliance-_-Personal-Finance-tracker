const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000; // Change 7000 to 8000 or any free port

app.use(cors({
  origin: "http://localhost:8080", // Allow frontend
  credentials: true, // Allow cookies/auth headers
}));

// MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '9704565451',
  database: 'finance',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

// Middleware
app.use(express.json());

// Signup route
app.post('/signup', async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();

    await db.query(
      'INSERT INTO users (id, name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [userId, name, email, hashedPassword]
    );

    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/signin', async (req, res) => {
  const { mail, password } = req.body;

  try {
      const connection = await pool.getConnection();
      
      // Fetch user from DB
      const [rows] = await connection.execute('SELECT * FROM users WHERE mail = ?', [mail]);
      connection.release();

      if (rows.length === 0) return res.status(400).json({ error: "Invalid email or password" });

      const user = rows[0];

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

      // Generate JWT Token
      const token = jwt.sign({ id: user.id, mail: user.mail }, JWT_SECRET, { expiresIn: '1h' });

      res.json({ token, message: "Login successful" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
