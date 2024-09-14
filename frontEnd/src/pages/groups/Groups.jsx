import { Link } from 'react-router-dom';

function Groups() {
    const groupsSamples = [
        {
            groupId: 1
        },
        {
            groupId: 2
        },
        {
            groupId: 3
        },
    ];


    return (
        <>
            <div>
                <h1>Capital One</h1>
            </div>
            <Link to="/newEvent">Create new Event</Link>

            <div>
            <h1>Grupos</h1>
            <ul>
                {groupsSamples.map(grupo => (
                    <li key={grupo.groupId}>
                        <Link to={`/group/${grupo.groupId}`}>{grupo.groupId}</Link>
                    </li>
                ))}
            </ul>
            </div>
        </>
    )
}

export default Groups;