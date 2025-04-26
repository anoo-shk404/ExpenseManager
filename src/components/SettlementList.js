
import React from 'react';
import '../styles/SettlementList.css';

const SettlementList = ({ expenses, participants }) => {
  if (expenses.length === 0) {
    return null;
  }

  
  const calculateBalances = () => {
   
    const balances = {};
    participants.forEach(participant => {
      balances[participant] = 0;
    });

  
    expenses.forEach(expense => {
      const paidBy = expense.paidBy;
      const amountPerPerson = expense.amountPerPerson;
      
      
      balances[paidBy] += expense.amount;
      
     
      expense.participants.forEach(participant => {
        balances[participant] -= amountPerPerson;
      });
    });

    return balances;
  };


  const generateSettlements = () => {
    const balances = calculateBalances();
    const settlements = [];

    
    const debtors = [];
    const creditors = [];

    for (const [person, balance] of Object.entries(balances)) {
   
      const roundedBalance = parseFloat(balance.toFixed(2));
      
      if (roundedBalance < 0) {
        debtors.push({ person, amount: Math.abs(roundedBalance) });
      } else if (roundedBalance > 0) {
        creditors.push({ person, amount: roundedBalance });
      }
    }


    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

   
    while (debtors.length > 0 && creditors.length > 0) {
      const debtor = debtors[0];
      const creditor = creditors[0];
      

      const amount = Math.min(debtor.amount, creditor.amount);
      
 
      const roundedAmount = parseFloat(amount.toFixed(2));
      
      if (roundedAmount > 0) {
        settlements.push({
          from: debtor.person,
          to: creditor.person,
          amount: roundedAmount
        });
      }


      debtor.amount -= amount;
      creditor.amount -= amount;
      
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
