import { Link } from "react-router-dom"

import "./UpperNavbar.css"

function UpperNavbar({text}) {

    return (
        <>
            <div>
                <Link to='/groups'>go back</Link>
            </div>
        </>
    );
}

export default UpperNavbar;