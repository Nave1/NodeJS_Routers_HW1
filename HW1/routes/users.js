const express = require('express');
const router = express.Router();
const dbSingleton = require('../dbSingleton');
const db = dbSingleton.getConnection();

// GET /api/users
router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// POST /routes/users
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'user added!', id: results.insertId });
    });
});

// PUT /routes/users.js
router.put('/:id', (res, req) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [name, email, password], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'user updated!' });
    });
});

// DELETE /routes/users.js
router.delete('/:id', (res, req) => {
    const { id } = req.params;
    const query = 'DELETE from users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: 'user deleted!' });
    });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Details of user with ID: ${id}` });
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `User with ID: ${id} updated` });
});

module.exports = router;
