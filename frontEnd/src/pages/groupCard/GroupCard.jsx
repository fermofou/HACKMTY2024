import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardComponent from '../../components/groups/CardComponent'; 
import { url }from '../../assets/constants/constants'


import "./GroupCard.css"

function GroupCard() {
    const { groupId } = useParams();

    const [transactions] = useState([
        ["450", "Taxi from Airport"],
        ["300", "Vodafone SIM Card"],
        ["1,200", "Hotel Reservation"],
        ["150", "Coffee at Starbucks"],
        ["500", "Dinner at La Boqueria"],
        ["200", "Museum Tickets"]
      ]);

    const [card, setCard] = useState([]);

    const formattedBalance = new Intl.NumberFormat().format(card.balance);

    useEffect(() => {
        async function fecthCardData() {
            try {
                const response = await axios.get(url + `card/${groupId}`);
                setCard(response.data);

            } catch (error) {
                console.log("Error fetching card data: " + error);
            }
        }

        fecthCardData();
    }, []);

    console.log(card);

    return (
        <>
            <CardComponent
                title={card.name}
                cardNumber={card.card_number}
                expirationDate={card.expiry_date}
                cvv={card.cvv}
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