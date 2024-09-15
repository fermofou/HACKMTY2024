import "./EventCard.css";

function EventCard({ number, event }) {

    const colors = ["#2078AE", "#1B5D81", "#003554", "#014A77", "#308DC6", "#2078AE"];
    const backgroundColor = colors[number];

//     ​
// balance: 0
// ​​
// deadline: "2024-11-14T13:35:47.000Z"
// ​​
// name: "Trip to France"
// ​​
// participantCount: 2
// ​​
// percentage: 0
// ​​
// type: "savings"

    const deadline = event.deadline;

    // Convertir la fecha ISO a un objeto Date
    const date = new Date(deadline);

    // Opciones de formato para mostrar solo la fecha sin la hora
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Formatear la fecha
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <>
            <div className="event-card-container" style={{backgroundColor: backgroundColor}}>
                <div className="event-card-top">
                    <p>
                        {event.name}
                    </p>
                    <p>
                        {formattedDate}
                    </p>
                </div>
                <div className="event-card-middle">
                    <h2>${event.balance}</h2>
                </div>
                <div className="event-card-bottom">
                    <div style={{display: "flex"}}>
                        <p>**********</p> 
                        <p>87%</p>
                    </div>
                    <div style={{display: "flex"}}>
                        <p>{event.participantCount}</p>
                        <p>&</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;