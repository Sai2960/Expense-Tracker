import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setExpenses(res.data);
      setError('');
    } catch (err) {
      setError('Could not load expenses. Is the backend server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAddExpense = async (expense) => {
    const res = await axios.post(API_URL, expense);
    setExpenses((prev) => [res.data, ...prev]);
  };

  const handleDeleteExpense = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Personal Expense Tracker</h1>
        <p className="total-amount">
          Total Spent: <span>₹{total.toFixed(2)}</span>
        </p>
      </header>

      <main className="app-main">
        <ExpenseForm onAddExpense={handleAddExpense} />

        <section className="expenses-section">
          <h2>Your Expenses</h2>
          {error && <p className="form-error">{error}</p>}
          {loading ? <p>Loading expenses...</p> : <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />}
        </section>
      </main>
    </div>
  );
}

export default App;
