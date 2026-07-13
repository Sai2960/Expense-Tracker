const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// GET /api/expenses -> get all expenses (newest first)
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
  }
});

// POST /api/expenses -> add a new expense
router.post('/', async (req, res) => {
  try {
    const { amount, description, category, date } = req.body;

    if (amount === undefined || !description || !category || !date) {
      return res.status(400).json({ message: 'amount, description, category and date are all required' });
    }

    const expense = new Expense({ amount, description, category, date });
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add expense', error: err.message });
  }
});

// DELETE /api/expenses/:id -> delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete expense', error: err.message });
  }
});

module.exports = router;
