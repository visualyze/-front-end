import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../auth/login.scss';

function SignUp({ onClick, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isInvalid = username === '' || password === '';
  return (
    <div className="signInItem">
      <div className="signUpDiv">
        <input
          name="email"
          value={username}
          onChange={event => {
            setUsername(event.target.value);
          }}
          type="text"
          placeholder="email"
        />
        <input
          name="passwordOne"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onClick(username, password);
            }
          }}
          type="password"
          placeholder="password"
        />
        <button
          id="signupButton"
          class="button2"
          disabled={isInvalid}
          onClick={() => {
            onClick(username, password);
          }}
        >
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
}

export default SignUp;
