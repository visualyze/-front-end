import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../appContext';

function SignOut({ onClick }) {
  const [state, setState] = useContext(AppContext);
  //   const user = {};
  return (
    <div className="logonDiv">
            <span>You are logged in as {state.user.email}</span>
            <button onClick={onClick}>Logout</button>
    </div>
  );
}

export default SignOut;
