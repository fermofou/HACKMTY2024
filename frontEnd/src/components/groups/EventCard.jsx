import PersonImage from "../../assets/personImage.png";
import EventImg from "../../assets/eventImg.png";
import SavingsImg from "../../assets/savingsImg.png";


import "./EventCard.css";

function EventCard({ number, event }) {

    const colors = ["#2078AE", "#1B5D81", "#003554", "#014A77", "#308DC6", "#2078AE"];
    const backgroundColor = colors[number];
    const deadline = event.deadline;
    const date = new Date(deadline);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const formattedGoal = event.goal.toLocaleString('en-US');

    let typeImg;

    if (event.savings) {
        typeImg = SavingsImg;

    } else {
        typeImg = EventImg;
    }

    console.log(event.type);

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
                    <h2>${formattedGoal}</h2>
                    <img src={typeImg} alt="type image" />
                </div>
                <div className="event-card-bottom">
                    <div className="progress-container">
                        <progress value={event.balance * 100 / event.goal} max={100}></progress>
                        <span>{Math.round(event.balance * 100 / event.goal, 0)}%</span>
                    </div>
                    <div>
                        <p>{event.participants.length}</p>
                        <img src={PersonImage} alt="image person" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;