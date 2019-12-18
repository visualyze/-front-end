import firebase, { app } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.auth = firebase.auth();

    // this.db = firebase.database();

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  doSignOut = () => this.auth.signOut();
}

export default Firebase;
