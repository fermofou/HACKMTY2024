import React, { useState } from 'react';
import './ContributionCard.css'; // Import your CSS file

const ContributionCard = () => {
  const [currentContribution, setCurrentContribution] = useState(13253);
  const goalContribution = 14000;
  const [deposit, setDeposit] = useState('');

  const handleDepositChange = (e) => {
    setDeposit(e.target.value);
  };

  const handleDepositClick = () => {
    const newContribution = currentContribution + Number(deposit);
    setCurrentContribution(newContribution);
    setDeposit(''); // Clear the deposit input after updating
  };

  const formattedCurrent = new Intl.NumberFormat().format(currentContribution);
  const formattedGoal = new Intl.NumberFormat().format(goalContribution);
  const placeHolder = goalContribution - currentContribution;
  const formatredPlaceHolder= new Intl.NumberFormat().format(placeHolder);

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