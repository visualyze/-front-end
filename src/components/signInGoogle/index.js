import React, { useCallback, useContext, useEffect, useState } from 'react';
import './googleButton.scss';

function signInWithGoogle({ onClick, error }) {
  return (
    <div className="signInItem">
      <div className="signInWithGoogle"></div>
      <div className="google-btn">
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p className="btn-text">
          <b
            className="buttonGoogle"
            onClick={() => {
              onClick();
            }}
          >
            Sign in with Google
          </b>
        </p>
      </div>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default signInWithGoogle;
