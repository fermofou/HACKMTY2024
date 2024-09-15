import { Link } from "react-router-dom";
import Arrow from "../../assets/arrow.png";
import EventImg from "../../assets/eventImg.png";
import SavingsImg from "../../assets/savingsImg.png";
import New from "../../assets/new.png";

import "./UpperNavbar.css";

function UpperNavbar({ text, type }) {
  let typeImg;

  if (type === "none") {
    typeImg = New;
  } else if (type === "savings") {
    typeImg = SavingsImg;
  } else {
    typeImg = EventImg;
  }
  const iconStyle = type === "none" ? { width: "0px", height: "0px" } : {};

  return (
    <>
      <div className="upper-navbar-container">
        <Link to="/groups">
          <img src={Arrow} alt="arrow" />
        </Link>
        <p>{text}</p>
        {
          (typeImg = (
            <img
              className="icon"
              src={typeImg}
              alt="type image"
              style={iconStyle}
            />
          ))
        }
      </div>
    </>
  );
}

export default UpperNavbar;
