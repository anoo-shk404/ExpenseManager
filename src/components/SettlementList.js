
import React from 'react';
import '../styles/SettlementList.css';

const SettlementList = ({ expenses, participants }) => {
  if (expenses.length === 0) {
    return null;
  }

  // Calculate how much each person has paid
  const calculateBalances = () => {
    // Initialize balances for all participants
    const balances = {};
    participants.forEach(participant => {
      balances[participant] = 0;
    });

    // Calculate what each person has paid and what they owe
    expenses.forEach(expense => {
      const paidBy = expense.paidBy;
      const amountPerPerson = expense.amountPerPerson;
      
      // Add the total amount to the person who paid
      balances[paidBy] += expense.amount;
      
      // Subtract the amount each participant owes
      expense.participants.forEach(participant => {
        balances[participant] -= amountPerPerson;
      });
    });

    return balances;
  };

  // Generate settlement transactions
  const generateSettlements = () => {
    const balances = calculateBalances();
    const settlements = [];

    // Create arrays of debtors and creditors
    const debtors = [];
    const creditors = [];

    for (const [person, balance] of Object.entries(balances)) {
      // Round to 2 decimal places to avoid floating point issues
      const roundedBalance = parseFloat(balance.toFixed(2));
      
      if (roundedBalance < 0) {
        debtors.push({ person, amount: Math.abs(roundedBalance) });
      } else if (roundedBalance > 0) {
        creditors.push({ person, amount: roundedBalance });
      }
    }

    // Sort by amount (largest to smallest)
    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    // Create settlements
    while (debtors.length > 0 && creditors.length > 0) {
      const debtor = debtors[0];
      const creditor = creditors[0];
      
      // Find the minimum of what the debtor owes and what the creditor is owed
      const amount = Math.min(debtor.amount, creditor.amount);
      
      // Round to 2 decimal places
      const roundedAmount = parseFloat(amount.toFixed(2));
      
      if (roundedAmount > 0) {
        settlements.push({
          from: debtor.person,
          to: creditor.person,
          amount: roundedAmount
        });
      }

      // Update amounts
      debtor.amount -= amount;
      creditor.amount -= amount;
      
      // Remove if settled
      if (debtor.amount < 0.01) debtors.shift();
      if (creditor.amount < 0.01) creditors.shift();
    }

    return settlements;
  };

  const settlements = generateSettlements();

  return (
    <div className="settlement-section">
      <h3>Settlements</h3>
      {settlements.length > 0 ? (
        <ul className="settlement-list">
          {settlements.map((settlement, index) => (
            <li key={index} className="settlement-item">
              <span className="settlement-person">{settlement.from}</span>
              <span className="settlement-arrow">→</span>
              <span className="settlement-person">{settlement.to}</span>
              <span className="settlement-amount">${settlement.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">All expenses are settled.</p>
      )}
    </div>
  );
};

export default SettlementList;