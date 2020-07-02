import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBCardText
} from "mdbreact";
import Card from './Card';
import { connect } from 'react-redux';
import LoadingLayout from './LoadingLayout';
import { withRouter } from 'react-router-dom';

const PollCard = props => {
  const [qIds, setQIds] = useState([]);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(1);
  const [questions, setQuestions] = useState(null);

  const {
    type,
    rUsers,
    history,
    rQuestions,
    loadingBar,
    questionIds,
  } = props;

  useEffect(() => {
    setLoading(loadingBar);
    rUsers && setUsers(rUsers);
    questionIds && setQIds(questionIds);
    rQuestions && setQuestions(rQuestions);
  }, [loadingBar, rQuestions, questionIds, rUsers])

  return (
    <LoadingLayout isLoading={loading}>
      {(
        qIds &&
        qIds.length > 0 &&
        users &&
        questions
      ) ? (
          questionIds.map(v => {
            return (
              questions[v] && (
                <Card
                  key={v}
                  name={users[questions[v].author].name}
                  img={users[questions[v].author].avatarURL}
                >
                  <div className="second-wrapper">
                    <h4 className="text-bold">
                      Would You Rather?
                  </h4>
                    <MDBCardText className="mt-20">
                      {questions[v].optionOne.text}
                      <br />
                      {questions[v].optionTwo.text}
                    </MDBCardText>
                    <MDBBtn
                      outline
                      className="btn-full-width ml-0 mt-20"
                      onClick={() => history.push(`/questions/${v}`)}
                    >
                      View Poll
                  </MDBBtn>
                  </div>
                </Card>
              )
            )
          })
        ) : (
          <p className="empty">
            {type === "unanswered" ?
              "You have answered all the questions" :
              "You haven't answered a single question"}
          </p>
        )}
    </LoadingLayout>
  );
}


const mapStateToProps = state => {
  const { questions, users, loadingBar } = state;
  return {
    rUsers: users,
    rQuestions: questions,
    loadingBar: loadingBar.default,
  };
}

export default withRouter(
  connect(mapStateToProps)(PollCard)
);