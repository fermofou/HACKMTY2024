import './GroupSavings.css';

function GroupSavings() {

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  return (<>
    <div className="savings-card">
      <h2>Saved up so far</h2>
      <p className="savings-amount">$ 100,000.00</p>
      <p className="savings-detail">With an interest rate of 3.1%</p>
    </div>
    <div className="savings-card">
      <h2>Expected savings</h2>
      <p className="savings-amount">$ 100,000.00</p>
      <p className="savings-detail">Over the next 13 months</p>
      <div className="chart">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  </>);
}

export default GroupSavings;