import React, { useCallback, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebaseConfig';
import './login.scss';
firebase.initializeApp(firebaseConfig);
const defaultUser = { loggedIn: false, email: '' };
const UserContext = React.createContext({});
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;
function onAuthStateChange(callback) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({ loggedIn: true, email: user.email });
    } else {
      callback({ loggedIn: false });
    }
  });
}
function login(username, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}
function logout() {
  firebase.auth().signOut();
}
function LoginView({ onClick, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="logonDiv">

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
      <a
        onClick={() => {
          onClick(username, password);
        }}
      >
        login
      </a>
      <span>{error}</span>

    </div>
  );
}
function LogoutView({ onClick }) {
  const user = useContext(UserContext);
  return (
    <div className="logonDiv">
      <span>You are logged in as {user.email}</span>
      <button onClick={onClick}>Logout</button>

    </div>
  );
}
function Login() {
  const [user, setUser] = useState({ loggedIn: false });
  const [error, setError] = useState('');
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChange(setUser);
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  const requestLogin = useCallback((username, password) => {
    login(username, password).catch(error => setError(error.code));
  });
  const requestLogout = useCallback(() => {
    logout();
  }, []);
  if (!user.loggedIn) {
    return (
      <div className="loginCard">
        <LoginView onClick={requestLogin} error={error} />;
      </div>
    );
  }
  return (
    <div className="loginCard">
      <UserProvider value={user}>

        <LogoutView onClick={requestLogout} />

      </UserProvider>
    </div>
  );
}

export default Login;
