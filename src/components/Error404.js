import React from 'react';

const Error404 = () => {
  return (
    <div className="error-404-wrapper">
      <img
        alt="Preview..."
        className="error-404-image"
        src={require('../assets/New404.png')}
      />
    </div>
  );
}

export default Error404;