import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
} from '@material-ui/core';
import {
  MDBCard, MDBCardBody, MDBCardTitle,
  MDBCardHeader,
} from "mdbreact";

const useStyles = makeStyles({
  large: {
    width: 150,
    height: 150,
  },
});

const Card = props => {
  const classes = useStyles();
  const { name, isAsk = true, children, img, newQuestion } = props;
  return (
    <MDBCard className="card">
      <MDBCardHeader>
        <MDBCardTitle className={`text-bold mt-20 ${newQuestion ? "text-center" : ""}`}>
          {newQuestion ? "Create New Question" : `${name} ${isAsk ? "ask:" : ""}`}
        </MDBCardTitle>
      </MDBCardHeader>
      <MDBCardBody className="customize-card-body">
        {!newQuestion && (
          <div className="first-wrapper">
            <Avatar
              src={img}
              alt="Remy Sharp"
              className={classes.large}
            />
          </div>
        )}
        {children}
      </MDBCardBody>
    </MDBCard>
  );
}

export default Card;