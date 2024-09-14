import "./EventCard.css";

function EventCard({ number, event }) {

  const colors = ["#2078AE", "#1B5D81", "#003554", "#014A77", "#308DC6", "#2078AE"];
  const backgroundColor = colors[number];

    return (
        <>
            <div className="event-card-container" style={{backgroundColor: backgroundColor}}>
                <div className="event-card-top">
                    <p>
                        Barcelona Trip
                    </p>
                    <p>
                        10/dic/2024
                    </p>
                </div>
                <div className="event-card-middle">
                    <h2>$923423</h2>
                </div>
                <div className="event-card-bottom">
                    <div style={{display: "flex"}}>
                        <p>**********</p> 
                        <p>87%</p>
                    </div>
                    <div style={{display: "flex"}}>
                        <p>10</p>
                        <p>&</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;