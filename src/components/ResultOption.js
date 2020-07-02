import React from 'react';
import {
  MDBProgress,
} from "mdbreact";

const ResultOption = ({ option, total, id }) => {
  return (
    <div className={`result-option ${option.votes.includes(id) ? "result-option-active" : ""}`}>
      <p className="result-option-text">
        {`Would you rather ${option.text}?`.trim()}
      </p>
      <MDBProgress
        height="30px"
        value={parseInt(((option.votes.length / total) * 100).toFixed(1))}
      >
        {((option.votes.length / total) * 100).toFixed(1)}%
      </MDBProgress>
      <p className="number-of-votes">
        {option.votes.length} out of {total}
      </p>
      {option.votes.includes(id) && (
        <img src={require('../assets/voted.png')} className="voted-img" alt="Voted..." />
      )}
    </div>
  );
}

export default ResultOption;