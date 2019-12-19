import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../appContext';
import './signout.scss';

function SignOut({ onClick }) {
  const [state, setState] = useContext(AppContext);
  //   const user = {};
  return (
    <div className="logonDiv">
            
      <span className="logoutSpan">
        You are logged in as {state.user.email}
      </span>
      <button className="logoutScreenButtons">
        <a className="buttonA" href="/dashboard">
          Go to Dashboard
        </a>
      </button>
            
      <button className="logoutScreenButtons" onClick={onClick}>
        Logout
      </button>
    </div>
  );
}

export default SignOut;
