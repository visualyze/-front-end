import React, { useCallback, useContext, useEffect, useState } from 'react';
// import firebase, { app } from 'firebase/app';
import 'firebase/auth';
import Firebase from '../../classes/firebaseAuth';
import './login.scss';
import UserContext from '../../UserContext';
import SignIn from '../signIn';
import SignInWithGoogle from '../signInGoogle';
import SignUp from '../signUp';
import Logout from '../signOut';

// firebase.initializeApp(firebaseConfig);
const firebase = new Firebase();

function onAuthStateChange(callback) {
  firebase.auth.onAuthStateChanged(user => {
    if (user) {
      callback({ loggedIn: true, email: user.email });
    } else {
      callback({ loggedIn: false });
    }
  });
}

function Auth() {
  const [user, setUser] = useState({ loggedIn: false });
  const [error, setError] = useState('');
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      // firebase.unsubscribe();
    };
  }, []);

  const requestLogin = useCallback((email, password) => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .catch(error => setError(error.code));
  });

  const requestSignInWithGoogle = useCallback(() => {
    firebase.doSignInWithGoogle().catch(error => setError(error.code));
  });

  const requestSignUp = useCallback((email, password) => {
    firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .catch(error => setError(error.code));
  });

  const requestLogout = useCallback(() => {
    firebase.auth.signOut();
  }, []);

  if (!user.loggedIn) {
    return (
      <div className="loginCard">
        <SignIn className="flex-item" onClick={requestLogin} error={error} />
        <SignInWithGoogle
          className="flex-item"
          onClick={requestSignInWithGoogle}
          error={error}
        />
        <SignUp className="flex-item" onClick={requestSignUp} error={error} />
      </div>
    );
  }

  return (
    <div className="loginCard">
      <UserContext.Provider value={user}>
        <Logout className="flex-item" onClick={requestLogout} />
      </UserContext.Provider>
    </div>
  );
}

export default Auth;
