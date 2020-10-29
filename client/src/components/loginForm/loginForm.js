import React from 'react';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';

const LoginForm = function(props) {
  const handle_login = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'token-auth/',
      data: {
        username: props.username,
        password: props.password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        props.setUsername(res.data.username);
        props.setIsLoggedin(true);
        props.setUserDisplay('USER_PROFILE');
      })
      .catch(err => {
        alert('Oops something went wrong, please check your credentials');
      });
  };

  return (
    <form onSubmit={e => handle_login(e)}>
      <div className='form-group'>
        <h3 className='formHeaders'>Log in</h3>
        <label htmlFor='username'>Username: </label>
        <input
          style={{ width: '80%' }}
          placeholder='Username'
          required
          className='form-control form-control'
          type='text'
          name='username'
          value={props.username}
          onChange={e => {
            props.setUsername(e.target.value);
          }}
        />
        <label htmlFor='password'>Password: </label>
        <input
          style={{ width: '80%' }}
          placeholder='Password'
          required
          className='form-control form-control'
          type='password'
          name='password'
          value={props.password}
          onChange={e => {
            props.setPassword(e.target.value);
          }}
        />
      </div>
      <button className='btn btn-success' type='submit'>
        Log in
      </button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    username: state.username,
    password: state.password,
    userDisplay: state.userDisplay
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsername: useranme => dispatch(actions.setUsername(useranme)),
    setPassword: password => dispatch(actions.setPassword(password)),
    setIsLoggedin: () => dispatch(actions.setIsLoggedin(true)),
    setUserDisplay: userDisplay => dispatch(actions.setUserDisplay(userDisplay))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
