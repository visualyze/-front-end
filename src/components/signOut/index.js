import React, { useCallback, useContext, useEffect, useState } from 'react';
import UserContext from '../../UserContext';

function Logout({ onClick }) {
  const user = useContext(UserContext);
  //   const user = {};
  return (
    <div className="logonDiv">
            <span>You are logged in as {user.email}</span>
            <button onClick={onClick}>Logout</button>
    </div>
  );
}

export default Logout;
