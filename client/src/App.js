import React, { Component, useState, useEffect } from 'react';
import Nav from './components/navBar/navBar';
import LoginForm from './components/loginForm/loginForm';
import SignupForm from './components/signupForm/signupForm';
import './App.css';
import axios from 'axios';

const App = function(porps) {
  const [displayed_form, setDisplayed_form] = useState('');
  const [logged_in, setLogged_in] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (logged_in) {
      axios({
        method: 'get',
        url: 'http://localhost:8000/core/current_user/',
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }).then(res => {
        setUsername(res.data.username);
      });
    }
  }, [logged_in]);

  const handle_login = (e, data) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8000/token-auth/',
      data: {
        username: data.username,
        password: data.password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      setUsername(res.data.username);
      setLogged_in(true);
      setDisplayed_form('');
    });
  };

  const handle_signup = (e, data) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8000/core/users/',
      data: {
        username: data.username,
        password: data.password,
        email: data.email
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      localStorage.setItem('token', res.data.token);
      setUsername(res.data.username);
      setLogged_in(true);
      setDisplayed_form('');
    });
  };

  const handle_logout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setLogged_in(false);
  };

  const display_form = form => {
    setDisplayed_form(form);
  };

  let form;
  switch (displayed_form) {
    case 'login':
      form = <LoginForm handle_login={handle_login} />;
      break;
    case 'signup':
      form = <SignupForm handle_signup={handle_signup} />;
      break;
    default:
      form = null;
  }

  return (
    <div className='App'>
      <Nav
        logged_in={logged_in}
        display_form={display_form}
        handle_logout={handle_logout}
      />
      {form}
      <h3>{logged_in ? `Hello, ${username}` : 'Please Log In'}</h3>
    </div>
  );
};

export default App;
