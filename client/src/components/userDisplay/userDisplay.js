import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../loginForm/loginForm';
import SignupForm from '../signupForm/signupForm';
import avatar from './avatar.jpg';
import axios from 'axios';
import * as actions from '../../redux/actions';

const UserDisplay = function(props) {
  useEffect(() => {
    if (props.isLoggedin) {
      axios({
        method: 'get',
        url: 'core/current_user/',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }).then(res => {
        props.setUsername(res.data.username);
        props.setEmail(res.data.email);
        props.setUserDisplay('USER_PROFILE');
      });
    }
  }, [props.isLoggedin]);

  const handle_logout = () => {
    localStorage.removeItem('token');
    props.setUsername('');
    props.setEmail('');
    props.setUserDisplay('USER_LOGIN');
    props.setIsLoggedin(false);
    props.setPassword('');
    props.setQueries([]);
  };

  switch (props.userDisplay) {
    case 'USER_PROFILE':
      return (
        <div id='userProfileDiv'>
          <img
            className='img-fluid'
            id='avatar'
            alt='user image'
            src={avatar}
          />
          <h3>{props.username}</h3>
          <code>{props.email}</code>
          <br />
          <button className='btn btn-warning' onClick={handle_logout}>
            Logout
          </button>
        </div>
      );
    case 'USER_LOGIN':
      return (
        <div id='userLoginDiv'>
          <LoginForm />
          <button
            id='button1'
            className='btn btn-secondary'
            onClick={() => {
              props.setUserDisplay('USER_SIGNUP');
            }}
          >
            SignUp
          </button>
        </div>
      );
    case 'USER_SIGNUP':
      return (
        <div id='userSignupDiv'>
          <SignupForm />
          <button
            className='btn btn-secondary'
            onClick={() => {
              props.setUserDisplay('USER_LOGIN');
            }}
          >
            Login
          </button>
        </div>
      );
  }
};

const mapStateToProps = state => {
  return {
    username: state.username,
    email: state.email,
    userDisplay: state.userDisplay,
    isLoggedin: state.isLoggedin,
    password: state.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDisplay: userDisplay =>
      dispatch(actions.setUserDisplay(userDisplay)),
    setUsername: username => dispatch(actions.setUsername(username)),
    setEmail: email => dispatch(actions.setEmail(email)),
    setIsLoggedin: status => dispatch(actions.setIsLoggedin(status)),
    setPassword: pass => dispatch(actions.setPassword(pass)),
    setQueries: queries => dispatch(actions.setQueries(queries))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDisplay);
