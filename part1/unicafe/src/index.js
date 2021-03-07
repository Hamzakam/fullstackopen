import React, { useState } from "react";
import ReactDOM from "react-dom";
const Header = (props) => {
  return <h1>{props.text}</h1>;
};
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};
const StatDisplay = (props) => {
  return (
    <p>
      {props.name} {props.value}
    </p>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const handleGoodClick = () => setGood(good + 1);
  const handleBadClick = () => setBad(bad + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  return (
    <div>
      <Header text="Give Feedback" />
      <Button handleClick={handleGoodClick} name="good" />
      <Button handleClick={handleNeutralClick} name="neutral" />
      <Button handleClick={handleBadClick} name="bad" />
      <Header text="Statistics" />
      <StatDisplay value={good} name="good" />
      <StatDisplay value={neutral} name="neutral" />
      <StatDisplay value={bad} name="bad" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
