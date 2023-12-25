import React, { useState } from "react";
import "./index.css";
const PollOption = ({ option, onVote, voteCount, maxVotesPerOption }) => {
  const percentage = (voteCount / maxVotesPerOption) * 100;

  return (
    <div className="poll-option">
      <button className="vote-button" onClick={() => onVote(option)}>
        Vote
      </button>
      <span className="vote-info">
        {option.text}: {percentage.toFixed(1)}% ({voteCount} votes)
      </span>
      <div className="progress-bar">
        <div
          className="progress-bar-filled"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const Poll = ({ question, options }) => {
  const [votes, setVotes] = useState(options.map(() => 0));
  const maxVotesPerOption = 10;

  const handleVote = (option) => {
    const optionIndex = options.indexOf(option);
    if (votes[optionIndex] < maxVotesPerOption) {
      const newVotes = [...votes];
      newVotes[optionIndex] += 1;
      setVotes(newVotes);
    }
  };

  return (
    <div className="poll-container">
      <h2 className="poll-question">{question}</h2>
      {options.map((option, index) => (
        <PollOption
          key={option.id}
          option={option}
          onVote={handleVote}
          voteCount={votes[index]}
          maxVotesPerOption={maxVotesPerOption}
        />
      ))}
    </div>
  );
};

// Usage
const pollQuestion = "What's your favorite programming language?";
const pollOptions = [
  { id: 1, text: "JavaScript" },
  { id: 2, text: "Python" },
  { id: 3, text: "Java" },
];

const App = () => <Poll question={pollQuestion} options={pollOptions} />;

export default App;
