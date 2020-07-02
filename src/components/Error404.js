import React from 'react';
import { withRouter } from 'react-router-dom';

const Error404 = ({ history }) => {
  return (
    <div className="error-404-wrapper" onClick={() => history.push('/')}>
      <img
        alt="Preview..."
        className="error-404-image"
        src={require('../assets/New404.png')}
      />
    </div>
  );
}

export default withRouter(Error404);