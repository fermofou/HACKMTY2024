import { useParams} from 'react-router-dom';
import CardComponent from '../../components/groups/CardComponent'; 
import { useState} from 'react'

import "./GroupCard.css"

function GroupCard() {
    const { groupId } = useParams();
    
    const [cardData] = useState({
        balance: 130433,
        card_number: "6338 9041 9249 8584",
        expiry_date: "11 / 24",
        cvv: "772",
        name: "Barcelona Trip"
      });
      
    const formattedBalance = new Intl.NumberFormat().format(cardData.balance);

    const [transactions] = useState([
        ["450", "Taxi from Airport"],
        ["300", "Vodafone SIM Card"],
        ["1,200", "Hotel Reservation"],
        ["150", "Coffee at Starbucks"],
        ["500", "Dinner at La Boqueria"],
        ["200", "Museum Tickets"]
      ]);

    return (
        <>
            <CardComponent
                title={cardData.name}
                cardNumber={cardData.card_number}
                expirationDate={cardData.expiry_date}
                cvv={cardData.cvv}
            />

            <div className='balance-card'>
                <p className='balance-label'>Balance</p>
                <p className='balance-amount'>$ {formattedBalance}</p>
            </div>

            <div className='add-wallet-btn'>
                Add to Wallet
            </div>
            
            <div className='transactions'>
                <p>Transactions</p>
                <ul>
                    {transactions.map((transaction, index) => (
                    <li key={index}>
                        Ammount: $ {transaction[0]} <br/> Description: {transaction[1]} <br/> <p>Report Purchase</p>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default GroupCard;