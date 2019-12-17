// import React, { useState } from 'react';
// // import firebase from 'firebase';

// class Login extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: ''
//     };
//   }
//   handleChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(this.state.username, this.state.password)
//       .catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorCode, errorMessage);
//       });
//   };

//   render() {
//     return (
//       <>
//         <form onSubmit={this.handleSubmit}>
//           <input
//             onChange={this.handleChange}
//             type="text"
//             placeholder="Username"
//             name="username"
//           />
//           <input
//             onChange={this.handleChange}
//             type="text"
//             placeholder="Password"
//             name="password"
//           />
//           <input type="submit" value="login">
//             Log In
//           </input>
//         </form>
//       </>
//     );
//   }
// }

// export default Login;
