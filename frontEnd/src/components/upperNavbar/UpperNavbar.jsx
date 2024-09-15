import { Link } from "react-router-dom"
import Arrow from "../../assets/arrow.png"
import EventImg from "../../assets/eventImg.png";
import SavingsImg from "../../assets/savingsImg.png";

import "./UpperNavbar.css"

function UpperNavbar({text, type}) {
    let typeImg;

    if (type === "none") {
        typeImg = "none";

    } else if (type === "savings") {
        typeImg = SavingsImg;

    } else {
        typeImg = EventImg;
    }

    return (
        <>
            <div className="upper-navbar-container">
                <Link to='/groups'><img src={Arrow} alt="arrow" /></Link>
                <p>{text}</p>
                {typeImg === "none" ? "" : <img src={typeImg} alt="type image" />}
            </div>
        </>
    );
}

export default UpperNavbar;