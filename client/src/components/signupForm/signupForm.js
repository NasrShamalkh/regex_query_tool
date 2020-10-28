import React from 'react';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';

const SignupForm = function(props) {
  const handle_signup = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8000/core/users/',
      data: {
        username: props.username,
        password: props.password,
        email: props.email
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      props.setUsername(res.data.username);
      props.setEmail(res.data.email);
      props.setIsLoggedin(true);
      props.setUserDisplay('USER_PROFILE');
    });
  };

  return (
    <form onSubmit={e => handle_signup(e)}>
      <div className='form-group'>
        <h3 className='formHeaders'>Sign Up</h3>
        <label htmlFor='username'>Username:</label>
        <input
          style={{ width: '80%' }}
          placeholder='Username'
          required
          className='form-control'
          type='text'
          name='username'
          value={props.username}
          onChange={e => {
            props.setUsername(e.target.value);
          }}
        />
        {/* <br /> */}
        <label htmlFor='email'>Email</label>
        <input
          style={{ width: '80%' }}
          placeholder='Email'
          required
          className='form-control'
          type='email'
          name='email'
          value={props.email}
          onChange={e => {
            props.setEmail(e.target.value);
          }}
        />
        <label htmlFor='password'>Password</label>
        <input
          style={{ width: '80%' }}
          placeholder='Password'
          required
          className='form-control'
          type='password'
          name='password'
          value={props.password}
          onChange={e => {
            props.setPassword(e.target.value);
          }}
        />
      </div>
      <button className='btn btn-success' type='submit'>
        Signup
      </button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    username: state.username,
    password: state.password,
    email: state.email,
    userDisplay: state.userDisplay
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsername: useranme => dispatch(actions.setUsername(useranme)),
    setPassword: password => dispatch(actions.setPassword(password)),
    setIsLoggedin: () => dispatch(actions.setIsLoggedin(true)),
    setEmail: email => dispatch(actions.setEmail(email)),
    setUserDisplay: userDisplay => dispatch(actions.setUserDisplay(userDisplay))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
