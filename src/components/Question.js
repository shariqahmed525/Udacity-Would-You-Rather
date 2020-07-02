import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBBtn,
  MDBRow,
  MDBContainer,
} from "mdbreact";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from './Card';
import ResultOption from './ResultOption';
import LoadingLayout from './LoadingLayout';
import { FailedDialog } from '../utils/function';
import { handleAddQuestionAnswer } from '../actions/questions';
import RadioButton from './RadioButton';

const Question = props => {
  const [users, setUsers] = useState(null);
  const [option, setOption] = useState("");
  const [loading, setLoading] = useState(1);
  const [question, setQuestion] = useState(null);

  const {
    rUsers,
    dispatch,
    rQuestion,
    loadingBar,
    authedUser,
  } = props;

  useEffect(() => {
    setLoading(loadingBar);
    rUsers && setUsers(rUsers);
    rQuestion && setQuestion(rQuestion);
  }, [loadingBar, rQuestion, rUsers])

  const handleSubmit = () => {
    if (!option) {
      FailedDialog(undefined, "Must be select one option");
      return;
    }
    dispatch(handleAddQuestionAnswer(question.id, option));
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="8" md="8" sm="6" size="12" className="offset-lg-2 offset-md-2 offset-sm-3 mt-20 align-center">
          <LoadingLayout isLoading={loading}>
            {(
              users &&
              question &&
              authedUser
            ) ? (
                <Card
                  name={users[question.author].name}
                  img={users[question.author].avatarURL}
                  isAsk={![...question.optionOne.votes, ...question.optionTwo.votes].includes(authedUser)}
                >
                  <div className="second-wrapper">
                    {[...question.optionOne.votes, ...question.optionTwo.votes].includes(authedUser) ? (
                      <>
                        <h3 className="text-bold">
                          Result:
                        </h3>
                        <div className="result-box">
                          <ResultOption
                            id={authedUser}
                            option={question.optionOne}
                            total={[...question.optionOne.votes, ...question.optionTwo.votes].length}
                          />
                          <ResultOption
                            id={authedUser}
                            option={question.optionTwo}
                            total={[...question.optionOne.votes, ...question.optionTwo.votes].length}
                          />
                        </div>
                      </>
                    ) : (
                        <>
                          <h4 className="text-bold">
                            Would You Rather?
                          </h4>
                          <RadioButton
                            value={option}
                            checked={"optionOne"}
                            text={question.optionOne.text}
                            setOption={() => setOption("optionOne")}
                          />
                          <RadioButton
                            value={option}
                            checked={"optionTwo"}
                            text={question.optionTwo.text}
                            setOption={() => setOption("optionTwo")}
                          />
                          <MDBBtn
                            onClick={handleSubmit}
                            className="btn-full-width ml-0 mt-20"
                          >
                            Submit
                          </MDBBtn>
                        </>
                      )}
                  </div>
                </Card>
              ) : (
                <p className="no-found">
                  Sorry, question not found!
                </p>
              )}
          </LoadingLayout>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}


const mapStateToProps = (state, props) => {
  const question_id = props.match.params.question_id;
  const { questions, authedUser, users, loadingBar } = state;
  const question = questions[question_id];
  if (!question) {
    return {
      loadingBar: loadingBar.default,
    };
  }
  return {
    authedUser,
    rUsers: users,
    rQuestion: question,
    loadingBar: loadingBar.default,
  };
}

export default withRouter(
  connect(mapStateToProps)(Question)
);