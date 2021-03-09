import React, { useState } from "react";
import ReactDOM from "react-dom";
const indexOfMax = (arr) => {
    let max = 0,
        maxIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            maxIndex = i;
        }
    }
    return maxIndex;
};
const Anecdote = ({ anecdote, votes }) => {
    return (
        <div>
            <p>{anecdote}</p>
            <p>has {votes} votes</p>
        </div>
    );
};
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVote] = useState(Array(anecdotes.length - 1).fill(0));
    const [maxVotes, setMaxVotes] = useState(0);
    const handleAnecdoteClick = () => {
        let random = Math.floor(Math.random() * (anecdotes.length - 1));
        while (selected === random) {
            random = Math.floor(Math.random() * (anecdotes.length - 1));
        }
        setSelected(random);
    };
    const handleVoteClick = () => {
        const copy = [...votes];
        copy[selected]++;
        setVote(copy);
        setMaxVotes(indexOfMax(votes));
    };
    return (
        <div>
            <h1>Anecdote of the Day</h1>
            <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
            <Button handleClick={handleVoteClick} text="Vote" />
            <Button handleClick={handleAnecdoteClick} text="Next Anecdote" />
            <h1>Anecdote with most votes</h1>
            <Anecdote anecdote={anecdotes[maxVotes]} votes={votes[maxVotes]} />
        </div>
    );
};

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
