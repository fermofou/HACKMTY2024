import { Link } from 'react-router-dom'

function NewEvent() {

    return (
        <>
            <Link to='/groups'>go back</Link>
            <div>
                <p>newEvent</p>
            </div>
        </>
    )
}

export default NewEvent;