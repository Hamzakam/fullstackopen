import React, { useState } from "react";
import ReactDOM from "react-dom";
const Header = (props) => {
  return <h1>{props.text}</h1>;
};
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};
const StatDisplay = ({ name, value }) => {
  return (
    <p>
      {name} {value}
    </p>
  );
};
const Statistics = ({ good, bad, neutral }) => {
  if (good + bad + neutral === 0) {
    return <p>No Feedback Given</p>;
  } else {
    return (
      <div>
        <StatDisplay value={good} name="good" />
        <StatDisplay value={neutral} name="neutral" />
        <StatDisplay value={bad} name="bad" />
        <StatDisplay value={good + bad + neutral} name="all" />
        <StatDisplay
          value={(good - bad) / (good + bad + neutral)}
          name="average"
        />
        <StatDisplay value={good / (good + bad + neutral)} name="positive" />
      </div>
    );
  }
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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
