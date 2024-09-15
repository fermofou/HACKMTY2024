import { useState } from "react";
import "./CreatePoll.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { url } from "../../assets/constants/constants";

function CreatePoll() {

  const {groupId} = useParams();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    {name: "", cost: ""}, {name: "", cost: ""}
  ]);

  const navigate = useNavigate();

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  }

  const handleOptionChange = (e, index) => {
    let newOptions = [...options];
    newOptions[index].name = e.target.value;
    setOptions(newOptions);
  }

  const handleCostChange = (e, index) => {
    let newOptions = [...options];
    if (!isNaN(e.target.value) || e.target.value === "-") {
      newOptions[index].cost = e.target.value;
      setOptions(newOptions)
    }
  }

  const addOption = () => {
    setOptions([...options, {"name": "", cost: ""}])
  }

  const removeOption = () => {
    let newOptions = [...options];
    newOptions.pop();
    setOptions(newOptions);
  }

  const userId = "1";

  const sendPoll = async () => {
    await fetch(`${url}poll`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event_id: groupId,
        author_id: userId,
        title: question,
        options: options.map(option => ({name: option.name, cost: Number(option.cost)}))
      })
    });
    navigate("../groupChat");
  };

  return (<>
    <div className="poll-buttonbar">
      <Link to="../groupChat" className="poll-lightbutton">Cancel</Link>
      <button className="poll-button" onClick={sendPoll}>Send</button>
    </div>
    <div className="poll-section">
      <h1>Question</h1>
      <input className="poll-question-input" type="text" placeholder="Ask a question..." value={question} onChange={handleQuestionChange}/>
    </div>
    <div className="poll-section">
      <h1>Options</h1>
      {
        options.map((option, i) => (
          <div key={i} className="poll-option-input">
            <input type="text" placeholder={`Option ${i+1}...`} className="poll-option-text-input" value={options[i].name} onChange={e => handleOptionChange(e, i)}/>
            <input type="text" placeholder="Add cost" className="poll-cost-input" value={options[i].cost} onChange={e => handleCostChange(e, i)}/>
          </div>
        ))
      }
      <div className="poll-option-input poll-have-gap">
        <button className="poll-option-add" onClick={addOption}>Add option</button>
        {options.length > 2 && <button className="poll-option-delete" onClick={removeOption}>Remove option</button>}
      </div>
    </div>
  </>);
}

export default CreatePoll;