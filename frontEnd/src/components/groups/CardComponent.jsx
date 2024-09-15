import React from 'react';
import CapitalOneLogo from '../../assets/CapitalOneLogo_2.png'
import './CardComponent.css';  // Import the CSS file

const CardComponent  = ({ title, cardNumber, expirationDate, cvv}) =>  {
  return (
    <div className="card">
        <div className='card-img-div'>
            <img src={CapitalOneLogo} className='card-logo-img'></img>
        </div>
    
        <div className='card-information'>
            <div className="card-details">
                <p><b>{title}</b></p>
                <p>{expirationDate}</p>
            </div>

            <div className="card-details">
                <p>{cardNumber}</p>
                <p>{cvv}</p>
            </div>
        </div>
    </div>
  );
};

export default CardComponent;