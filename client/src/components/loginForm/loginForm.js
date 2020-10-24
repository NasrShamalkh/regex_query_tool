import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = function(props) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={e => props.handle_login(e, { username, password })}>
      <h4>Log In</h4>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        name='username'
        value={username}
        onChange={e => {
          setUserName(e.target.value);
        }}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        name='password'
        value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <input type='submit' />
    </form>
  );
};

// class LoginForm extends React.Component {
//   state = {
//     username: '',
//     password: ''
//   };

//   handle_change = e => {
//     const name = e.target.name;
//     const value = e.target.value;
//     this.setState(prevstate => {
//       const newState = { ...prevstate };
//       newState[name] = value;
//       return newState;
//     });
//   };

//   render() {
//     return (
//       <form onSubmit={e => this.props.handle_login(e, this.state)}>
//         <h4>Log In</h4>
//         <label htmlFor='username'>Username</label>
//         <input
//           type='text'
//           name='username'
//           value={this.state.username}
//           onChange={this.handle_change}
//         />
//         <label htmlFor='password'>Password</label>
//         <input
//           type='password'
//           name='password'
//           value={this.state.password}
//           onChange={this.handle_change}
//         />
//         <input type='submit' />
//       </form>
//     );
//   }
// }

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};
