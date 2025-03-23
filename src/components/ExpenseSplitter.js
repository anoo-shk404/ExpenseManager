import React, { useState, useEffect } from 'react';
import ParticipantsList from './ParticipantsList';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import SettlementList from './SettlementList';
import '../styles/ExpenseSplitter.css';

const ExpenseSplitter = () => {
  // Load initial state from localStorage or use defaults
  const [participants, setParticipants] = useState(() => {
    const savedParticipants = localStorage.getItem('participants');
    return savedParticipants ? JSON.parse(savedParticipants) : [];
  });
  
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  // Add a new expense
  const handleAddExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    setShowExpenseForm(false);
    
    // Update localStorage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  // Delete an expense
  const handleDeleteExpense = (expenseId) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== expenseId);
    setExpenses(updatedExpenses);
    
    // Update localStorage
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  // Update expenses if participants are removed
  useEffect(() => {
    // Filter out removed participants from each expense
    const updatedExpenses = expenses.map(expense => {
      // Update the participants list
      const updatedParticipantList = expense.participants.filter(p => 
        participants.includes(p)
      );
      
      // Remove expense if the person who paid is no longer a participant
      if (!participants.includes(expense.paidBy)) {
        return null;
      }
      
      // If all participants were removed, keep the expense as is
      // This prevents errors if all participants for an expense are removed
      if (updatedParticipantList.length === 0) {
        return expense;
      }
      
      // Recalculate amount per person
      return {
        ...expense,
        participants: updatedParticipantList,
        amountPerPerson: expense.amount / updatedParticipantList.length
      };
    }).filter(expense => expense !== null); // Remove any nullified expenses
    
    // Update expenses state and localStorage
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  }, [participants]);

  // Reset all data
  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all data? This will delete all participants and expenses.')) {
      setParticipants([]);
      setExpenses([]);
      localStorage.removeItem('participants');
      localStorage.removeItem('expenses');
    }
  };

  return (
    <div className="expense-splitter">
      <header>
        <h1>Expense Splitter</h1>
      </header>
      
      <main>
        <ParticipantsList 
          participants={participants} 
          setParticipants={setParticipants} 
        />

        <div className="expenses-section">
          <div className="section-header">
            <h2>Expenses</h2>
            {participants.length > 0 && (
              <button 
                className="add-expense-btn" 
                onClick={() => setShowExpenseForm(true)}
                disabled={showExpenseForm}
              >
                Add Expense
              </button>
            )}
          </div>
          
          {showExpenseForm && (
            <ExpenseForm 
              participants={participants} 
              onAddExpense={handleAddExpense} 
              onCancel={() => setShowExpenseForm(false)} 
            />
          )}
          
          <ExpenseList 
            expenses={expenses} 
            onDeleteExpense={handleDeleteExpense} 
          />
          
          <SettlementList 
            expenses={expenses} 
            participants={participants} 
          />
        </div>
        
        {(participants.length > 0 || expenses.length > 0) && (
          <div className="reset-container">
            <button className="reset-btn" onClick={handleResetAll}>
              Reset All Data
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExpenseSplitter;