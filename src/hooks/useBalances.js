import { useEffect, useState } from 'react';

const useBalances = (expenses, participants) => {
  const [balances, setBalances] = useState({});

  useEffect(() => {
    const calculateBalances = () => {
      if (participants.length === 0 || expenses.length === 0) {
        setBalances({});
        return;
      }

      let tempBalances = {};
      participants.forEach((participant) => {
        tempBalances[participant.id] = {
          name: participant.name,
          paid: 0,
          totalOwed: 0,
          owes: {},
        };
      });

      expenses.forEach((expense) => {
        const payer = expense.payer;
        const perPersonAmount = expense.amount / participants.length;

        if (tempBalances[payer]) {
          tempBalances[payer].paid += expense.amount;
        }

        participants.forEach((participant) => {
          if (participant.id !== payer) {
            if (!tempBalances[participant.id].owes[payer]) {
              tempBalances[participant.id].owes[payer] = 0;
            }
            tempBalances[participant.id].owes[payer] += perPersonAmount;
            tempBalances[participant.id].totalOwed += perPersonAmount;
          }
        });
      });

      // Round all values to 2 decimal places
      Object.keys(tempBalances).forEach((personId) => {
        tempBalances[personId].paid = Number(tempBalances[personId].paid.toFixed(2));
        tempBalances[personId].totalOwed = Number(tempBalances[personId].totalOwed.toFixed(2));

        Object.keys(tempBalances[personId].owes).forEach((owedTo) => {
          tempBalances[personId].owes[owedTo] = Number(tempBalances[personId].owes[owedTo].toFixed(2));
        });
      });

      setBalances(tempBalances);
    };

    calculateBalances();
  }, [expenses, participants]);

  return balances;
};

export default useBalances;