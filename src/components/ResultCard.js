import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  MDBIcon,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import {
  Avatar,
} from '@material-ui/core';

const useStyles = makeStyles({
  large: {
    width: 150,
    height: 150,
  },
});

const ResultCard = props => {
  const classes = useStyles();
  const { user, answered, created, total, index } = props;
  return (
    <MDBCard className="card border">
      <div className="border-top-left"></div>
      <MDBIcon
        icon="trophy"
        className={`trophy-icon ${index === 0 ? "icon-golden-color" : index === 1 ? "icon-theme-color" : "icon-default-color"}`}
      />
      <MDBCardBody className="customize-card-body">
        <div className="result-first-section">
          <Avatar
            alt="Remy Sharp"
            className={classes.large}
            src={user.avatarURL}
          />
        </div>
        <div className="result-second-section">
          <h3 className="text-bold">
            {user.name}
          </h3>
          <div className="result-items-wrapper">
            <div className="result-item">
              <p className="result-item-text">Answered Questions</p>
              <p className="result-item-text">{answered}</p>
            </div>
            <hr className="hr" />
            <div className="result-item">
              <p className="result-item-text">Created Questions</p>
              <p className="result-item-text">{created}</p>
            </div>
          </div>
        </div>
        <div className="result-third-section">
          <div className="result-score-fisrt-container">
            <p className="result-score-text">Score</p>
          </div>
          <div className="result-score-second-container">
            <div className="result-score-wrapper">
              <p className="result-score">{total}</p>
            </div>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ResultCard;