import React from 'react';
import '../styles/ExpenseItem.css';

const ExpenseItem = ({ expense, onDeleteExpense }) => {
  return (
    <tr className="expense-item">
      <td>{expense.title}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td>{expense.paidBy}</td>
      <td>{expense.participants.join(', ')}</td>
      <td>${expense.amountPerPerson.toFixed(2)}</td>
      <td>
        <button 
          className="delete-btn" 
          onClick={() => onDeleteExpense(expense.id)}
          aria-label="Delete expense"
        >
          ×
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;