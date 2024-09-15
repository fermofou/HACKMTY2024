import PersonImage from "../../assets/personImage.png";

import "./GroupHomeEventCard.css";

function EventCard({ event }) {
    // Formating deadline
    const deadline = event.deadline;
    const date = new Date(deadline);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <>
            <div className="event-card-container">
                <div className="event-card-top">
                    <p>
                        {event.name}
                    </p>
                    <p>
                        {formattedDate}
                    </p>
                </div>
                <div className="event-card-middle">
                    <h2>${event.goal}</h2>
                </div>
                <div className="event-card-bottom">
                    <div className="progress-container">
                        <progress value={event.percentage} max={100}></progress>
                        <span>{event.percentage}%</span>
                    </div>
                    <div>
                        <p>{event.participantCount}</p>
                        <img src={PersonImage} alt="image person" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;