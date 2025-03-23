import React from 'react';
import ExpenseItem from './ExpenseItem';
import '../styles/ExpenseList.css';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return <p className="no-data">No expenses added yet.</p>;
  }

  return (
    <div className="expenses-list">
      <h3>Expense Summary</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Total Amount</th>
              <th>Paid By</th>
              <th>Participants</th>
              <th>Amount Per Person</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <ExpenseItem 
                key={expense.id} 
                expense={expense} 
                onDeleteExpense={onDeleteExpense} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
