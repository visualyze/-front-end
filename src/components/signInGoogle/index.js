import React, { useCallback, useContext, useEffect, useState } from 'react';
import './googleButton.scss';

function signInWithGoogle({ onClick, error }) {
  return (
    <div className="signInItem">
      <div className="signInWithGoogle"></div>
      <div class="google-btn">
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p class="btn-text">
          <b
            class="buttonGoogle"
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
