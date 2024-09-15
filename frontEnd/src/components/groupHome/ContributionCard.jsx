import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../../assets/constants/constants';
import './ContributionCard.css';

const ContributionCard = ({event, event_id, account_id}) => {
  const [currentContribution, setCurrentContribution] = useState(event.balance);
  const goalContribution = Math.round(event.goal * event.participants[0].percentage, 0);
  const [deposit, setDeposit] = useState('');

  const handleDepositChange = (e) => {
    setDeposit(e.target.value);
  };

  const handleDepositClick = async () => {
    try {
      const response = await axios.post(url + `transfer`, {
        event_id: event_id,
        userIdAcc: account_id,
        amount: deposit
      });

      response;

      const newContribution = currentContribution + Number(deposit);
      setCurrentContribution(newContribution);
      setDeposit(''); // Clear the deposit input after updating

    } catch {
      alert("Error al depositar. Por favor intenta de nuevo");
    }
  };

  const formattedCurrent = new Intl.NumberFormat().format(currentContribution);
  const formattedGoal = new Intl.NumberFormat().format(goalContribution);
  const placeHolder = goalContribution - currentContribution;
  const formatredPlaceHolder= new Intl.NumberFormat().format(placeHolder);

  console.log(event);

  return (
    <div className="contribution-card">
      <p className="contribution-label">Your Contribution</p>
      <p className="contribution-amount">
        ${formattedCurrent} <span className="goal-amount">/ {formattedGoal}</span>
      </p>
      <div className="deposit-section">
        <input
          type="number"
          placeholder= {`$ ${formatredPlaceHolder}`}
          value={deposit}
          onChange={handleDepositChange}
          className="deposit-input"
        />
        <button onClick={handleDepositClick} className="deposit-button">Deposit</button>
      </div>
    </div>
  );
};

export default ContributionCard;