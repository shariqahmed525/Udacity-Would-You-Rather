import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBBtn,
  MDBRow,
  MDBInput,
  MDBCardText,
  MDBContainer,
} from "mdbreact";
import Card from './Card';
import Navbar from './Navbar';
import { store } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FailedDialog } from '../utils/function';
import { handleAddQuestion } from '../actions/questions';

const NewQuestion = props => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [authedUser, setAuthedUser] = useState("");

  const { history, rAuthedUser } = props;

  const handleSubmit = () => {
    if (!optionOne || !optionTwo) {
      FailedDialog(undefined, "All fields must be required");
      return;
    }
    if (optionOne === optionTwo) {
      FailedDialog(undefined, "All options must be different");
      return;
    }
    store.dispatch(handleAddQuestion(optionOne, optionTwo));
    history.push('/');
  }

  useEffect(() => {
    rAuthedUser && setAuthedUser(rAuthedUser);
  }, [rAuthedUser])


  return (
    <>
      <Navbar authedUser={authedUser} />
      <MDBContainer>
        <MDBRow>
          <MDBCol lg="8" md="8" sm="6" size="12" className="offset-lg-2 offset-md-2 offset-sm-3 mt-20 align-center">
            <Card newQuestion>
              <div className="second-wrapper" style={{ border: 0, padding: 0, margin: 0 }}>
                <MDBCardText className="mt-20">
                  Complete the questions:
              </MDBCardText>
                <h4 className="text-bold">
                  Would You Rather?
              </h4>
                <MDBInput
                  outline
                  value={optionOne}
                  label="Option One Text"
                  onChange={({ target }) => setOptionOne(target.value)}
                />
                <MDBInput
                  outline
                  value={optionTwo}
                  label="Option Two Text"
                  onChange={({ target }) => setOptionTwo(target.value)}
                />
                <MDBBtn
                  onClick={handleSubmit}
                  className="btn-full-width ml-0 mt-20"
                >
                  Submit
              </MDBBtn>
              </div>
            </Card>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

const mapStateToProps = ({ authedUser }) => {
  return {
    rAuthedUser: authedUser,
  };
}

export default withRouter(
  connect(mapStateToProps)(NewQuestion)
);