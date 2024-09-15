import { useEffect, useState } from 'react';
import './GroupSavings.css';
import { useParams } from 'react-router-dom';
import { url } from '../../assets/constants/constants';

function GroupSavings() {

  const {groupId} = useParams();

  const [event, setEvent] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}event/${groupId}`);
      const data = await response.json();
      setEvent(data);
    }
    fetchData();
  }, []);

  let graphData = [];

  for (let i = 0; i < event?.savings?.months; i++) {
    graphData.push(100 / (event?.savings?.months - i));
  }

  if (event == undefined) return <div className="groupchat-centered full-height"><div className="spinningCircle"></div></div>

  const compoundInterest = (timeInMonths) => {
    const initial = event?.goal / event.savings.months;
    return Math.round((initial * Math.pow(1 + 0.073, timeInMonths)) - initial);
  }

  return (<>
    <div className="savings-card">
      <h2>Saved up so far</h2>
      <p className="savings-amount">$ {compoundInterest(1)}.00</p>
      <p className="savings-detail">With an interest rate of 7.3%</p>
    </div>  
    <div className="savings-card">
      <h2>Expected savings</h2>
      <p className="savings-amount">$ {compoundInterest(event?.savings?.months)}.00</p>
      <div className="chart">
        {
          graphData.map((data, i) => (<div key={i} className="bar" style={{height:data + "px"}}></div>))
        }
      </div>
      <p className="savings-detail">Over the next {event?.savings?.months} months</p>
    </div>
  </>);
}

export default GroupSavings;