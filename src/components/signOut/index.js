import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
      <Link className="logoutScreenButtons linkAdjustment" to="/dashboard">
        Dashboard
      </Link>
            
      <a className="logoutScreenButtons linkAdjustment" onClick={onClick}>
        Logout
      </a>
    </div>
  );
}

export default SignOut;
