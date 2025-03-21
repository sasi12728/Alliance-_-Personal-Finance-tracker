const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = "your_jwt_secret";

app.use(cors({
  origin: "http://localhost:8080",
  credentials: true,
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

app.use(express.json());

// Signup
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    await db.query('INSERT INTO users (id, name, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [userId, name, email, hashedPassword]);
    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Signin
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ error: "Invalid email or password" });
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add Income
app.post('/income', async (req, res) => {
  const { userId, amount, source, date } = req.body;
  try {
    await db.query('INSERT INTO income (id, userId, amount, source, date) VALUES (?, ?, ?, ?, ?)',
      [uuidv4(), userId, amount, source, date]);
    res.status(201).json({ message: 'Income added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Incomes
app.get('/income/:userId', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM income WHERE userId = ?', [req.params.userId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Income
app.delete('/income/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM income WHERE id = ?', [req.params.id]);
    res.json({ message: 'Income deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Expense
app.post('/expense', async (req, res) => {
  const { userId, amount, category, date } = req.body;
  try {
    await db.query('INSERT INTO expense (id, userId, amount, category, date) VALUES (?, ?, ?, ?, ?)',
      [uuidv4(), userId, amount, category, date]);
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Expenses
app.get('/expense/:userId', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM expense WHERE userId = ?', [req.params.userId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Expense
app.delete('/expense/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM expense WHERE id = ?', [req.params.id]);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Budget Management APIs
app.post('/budget', async (req, res) => {
  const { userId, amount, category, month, year } = req.body;
  try {
    await db.query('INSERT INTO budget (id, userId, amount, category, month, year) VALUES (?, ?, ?, ?, ?, ?)',
      [uuidv4(), userId, amount, category, month, year]);
    res.status(201).json({ message: 'Budget set successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/budget/:userId', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM budget WHERE userId = ?', [req.params.userId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/budget/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM budget WHERE id = ?', [req.params.id]);
    res.json({ message: 'Budget deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
