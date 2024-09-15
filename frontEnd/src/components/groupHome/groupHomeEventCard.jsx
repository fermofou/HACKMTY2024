import PersonImage from "../../assets/personImage.png";

import "./GroupHomeEventCard.css";

function EventCard({ event }) {
    // Formating deadline
    const deadline = event.deadline;
    const date = new Date(deadline);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const porcentage = Math.round(event.balance * 100 / event.goal, 0);

    const formattedGoal = event.goal.toLocaleString('en-US');
    const formattedBalance = event.balance.toLocaleString('en-US');

    console.log(porcentage);

    console.log(event);
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
                    <h2>${formattedBalance}<span> / {formattedGoal}</span></h2>
                </div>
                <div className="event-card-bottom">
                    <div className="progress-container">
                        <progress value={porcentage} max={100}></progress>
                        <span>{porcentage}%</span>
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