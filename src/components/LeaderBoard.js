import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBRow,
  MDBContainer,
} from "mdbreact";
import { connect } from 'react-redux';
import ResultCard from './ResultCard';
import LoadingLayout from './LoadingLayout';
import { withRouter } from 'react-router-dom';
import { LoadingBar } from 'react-redux-loading';
import Navbar from './Navbar';

const LeaderBoard = props => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(1);
  const [questions, setQuestions] = useState(null);
  const [authedUser, setAuthedUser] = useState(null);

  const {
    rUsers,
    rQuestions,
    loadingBar,
    rAuthedUser,
  } = props;

  useEffect(() => {
    setLoading(loadingBar);
    rUsers && setUsers(rUsers);
    rQuestions && setQuestions(rQuestions);
    rAuthedUser && setAuthedUser(rAuthedUser);
  }, [loadingBar, rQuestions, rAuthedUser, rUsers])

  return (
    <>
      <LoadingBar style={{ background: "#026157" }} />
      <Navbar authedUser={authedUser && authedUser.id} />
      <MDBContainer>
        <MDBRow>
          <MDBCol lg="8" md="8" sm="6" size="12" className="offset-lg-2 offset-md-2 offset-sm-3 mt-20 align-center">
            <LoadingLayout isLoading={loading}>
              {(
                users &&
                questions &&
                authedUser
              ) ? (
                  Object.keys(users)
                    .map(v => {
                      const user = users[v];
                      const createdQuestion = [];
                      const answeredQuestions = Object.keys(questions).filter(v => {
                        const merge = [...questions[v].optionOne.votes, ...questions[v].optionTwo.votes];
                        if (questions[v].author === user.id) createdQuestion.push(v);
                        return merge.includes(user.id)
                      });
                      const answered = answeredQuestions.length;
                      const created = createdQuestion.length;
                      return {
                        user,
                        created,
                        answered,
                        total: created + answered,
                      }
                    })
                    .sort((a, b) => b.total - a.total)
                    .map((v, i) => {
                      return (
                        <ResultCard
                          key={i}
                          index={i}
                          user={v.user}
                          total={v.total}
                          created={v.created}
                          answered={v.answered}
                        />
                      )
                    })
                ) : (
                  <p className="no-found">
                    Sorry, question not found!
                </p>
                )}
            </LoadingLayout>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}


const mapStateToProps = state => {
  const { questions, authedUser, users, loadingBar } = state;
  return {
    rUsers: users,
    rQuestions: questions,
    rAuthedUser: users[authedUser],
    loadingBar: loadingBar.default,
  };
}

export default withRouter(
  connect(mapStateToProps)(LeaderBoard)
);