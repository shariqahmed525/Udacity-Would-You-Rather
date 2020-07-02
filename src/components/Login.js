import React, { useState, useEffect } from 'react';
import {
  MDBContainer, MDBRow, MDBCol,
  MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText,
  MDBCardHeader
} from "mdbreact";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FailedDialog } from '../utils/function';
import { setAuthedUser } from '../actions/authedUser';
import { LoadingBar } from 'react-redux-loading';
import Navbar from './Navbar';

const Login = ({ users, dispatch, history, savePrevPath }) => {

  const [user, setUser] = useState("");
  const [prevPath, setPrevPath] = useState("");
  const [allUsers, setAllUsers] = useState(null);

  const handleChange = ({ target }) => {
    setUser(target.value);
  }

  const handleSubmit = () => {
    if (!user) {
      FailedDialog(undefined, "Please select user")
      return;
    }
    history.push(prevPath || '/');
    dispatch(setAuthedUser(user));
  }

  useEffect(() => {
    users && setAllUsers({ ...users });
    savePrevPath && setPrevPath(savePrevPath)
  }, [users, savePrevPath])

  return (
    <>
      <LoadingBar style={{ background: "#026157" }} />
      <Navbar />
      <div className="mt-20">
        <MDBContainer>
          <MDBRow>
            <MDBCol lg="8" md="8" sm="6" size="12" className="offset-lg-2 offset-md-2 offset-sm-3">
              <MDBCard style={{ width: "100%" }}>
                <MDBCardHeader>
                  <MDBCardTitle className="text-center text-bold mt-20">
                    Welcome to the Would You rather Rather App!
                </MDBCardTitle>
                  <MDBCardText className="text-center">
                    Please sign in to continue
                </MDBCardText>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBCardImage
                    waves
                    className="card-image"
                    src="https://equimper.gallerycdn.vsassets.io/extensions/equimper/react-native-react-redux/2.0.4/1586457946286/Microsoft.VisualStudio.Services.Icons.Default"
                  />
                  <h2 className="text-center text-bold theme-color">
                    Sign in
                </h2>
                  <select
                    value={user}
                    onChange={handleChange}
                    className="browser-default custom-select mt-20"
                  >
                    <option value="">Select User</option>
                    {allUsers && (
                      Object.keys(allUsers).map(v => {
                        return (
                          <option key={v} value={v}>
                            {allUsers[v].name}
                          </option>
                        )
                      })
                    )}
                  </select>
                  <MDBBtn
                    onClick={handleSubmit}
                    className="btn-full-width ml-0 mt-20"
                  >
                    Sign In
                </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}


const mapStateToProps = ({ users, savePrevPath }) => {
  return {
    users,
    savePrevPath
  };
}

export default withRouter(
  connect(mapStateToProps)(Login)
);
