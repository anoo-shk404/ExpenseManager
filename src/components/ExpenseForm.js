import React, { useState } from 'react';
import '../styles/ExpenseForm.css';

const ExpenseForm = ({ participants, onAddExpense, onCancel }) => {
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [expenseParticipants, setExpenseParticipants] = useState([]);

  // Toggle participant selection for expense
  const toggleParticipantForExpense = (participant) => {
    if (expenseParticipants.includes(participant)) {
      setExpenseParticipants(expenseParticipants.filter(p => p !== participant));
    } else {
      setExpenseParticipants([...expenseParticipants, participant]);
    }
  };

  // Select all participants
  const selectAllParticipants = () => {
    setExpenseParticipants([...participants]);
  };

  // Clear all selected participants
  const clearAllParticipants = () => {
    setExpenseParticipants([]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (expenseTitle.trim() === '' || expenseAmount === '' || !paidBy || expenseParticipants.length === 0) {
      alert('Please fill in all expense details, select who paid, and select at least one participant');
      return;
    }

    const amount = parseFloat(expenseAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid expense amount');
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: expenseTitle.trim(),
      amount,
      paidBy,
      participants: [...expenseParticipants],
      amountPerPerson: amount / expenseParticipants.length
    };

    onAddExpense(newExpense);
    
    // Reset form
    setExpenseTitle('');
    setExpenseAmount('');
    setPaidBy('');
    setExpenseParticipants([]);
  };

  return (
    <div className="expense-form">
      <h3>Add New Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="expense-title">Title:</label>
          <input
            id="expense-title"
            type="text"
            value={expenseTitle}
            onChange={(e) => setExpenseTitle(e.target.value)}
            placeholder="e.g., Dinner, Movie tickets"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="expense-amount">Amount:</label>
          <input
            id="expense-amount"
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="paid-by">Paid by:</label>
          <select 
            id="paid-by" 
            value={paidBy} 
            onChange={(e) => setPaidBy(e.target.value)}
          >
            <option value="">Select who paid</option>
            {participants.map(participant => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Split Between:</label>
          <div className="participant-selection-controls">
            <button 
              type="button" 
              className="select-all-btn" 
              onClick={selectAllParticipants}
            >
              Select All
            </button>
            <button 
              type="button" 
              className="clear-all-btn" 
              onClick={clearAllParticipants}
            >
              Clear All
            </button>
          </div>
          <div className="participant-checkboxes">
            {participants.map(participant => (
              <div key={participant} className="participant-checkbox">
                <input
                  type="checkbox"
                  id={`participant-${participant}`}
                  checked={expenseParticipants.includes(participant)}
                  onChange={() => toggleParticipantForExpense(participant)}
                />
                <label htmlFor={`participant-${participant}`}>{participant}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit">Save Expense</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;