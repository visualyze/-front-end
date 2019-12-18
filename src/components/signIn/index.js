import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../auth/login.scss';

function SignIn({ onClick, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="signInItem">
      <input
        placeholder="email"
        onChange={event => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="password"
        type="password"
        onChange={event => {
          setPassword(event.target.value);
        }}
      />
      <button
        class="button2"
        onClick={() => {
          onClick(username, password);
        }}
      >
        Login
      </button>
            <span>{error}</span>
    </div>
  );
}

export default SignIn;
