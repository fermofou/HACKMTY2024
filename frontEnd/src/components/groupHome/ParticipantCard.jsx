import "./ParticipantCard.css"

function ParticipantCard({participant, goal}) {
    console.log(participant);

    return (
        <>
            <div className="participant-container">
                <div className="participant-initial-container">
                    <p>{participant.first_name[0]}</p>
                </div>
                <div>
                    <p>$ {participant.contribution} /  <span>{goal * participant.percentage / 100}</span></p>
                </div>
            </div>
        </>
    );
}

export default ParticipantCard;