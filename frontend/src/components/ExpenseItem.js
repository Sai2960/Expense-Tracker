import React from 'react';

function ExpenseItem({ expense, onDelete }) {
  const formattedDate = new Date(expense.date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <li className="expense-item">
      <div className="expense-item-main">
        <span className="expense-category">{expense.category}</span>
        <span className="expense-description">{expense.description}</span>
        <span className="expense-date">{formattedDate}</span>
      </div>
      <div className="expense-item-side">
        <span className="expense-amount">₹{Number(expense.amount).toFixed(2)}</span>
        <button className="btn btn-delete" onClick={() => onDelete(expense._id)} aria-label="Delete expense">
          Delete
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
