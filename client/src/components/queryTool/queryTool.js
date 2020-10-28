import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

// import $ from 'jquery'; // <-to import jquery
// import 'highlight-within-textarea';

// $('#addSupModal').modal('show');

const QueryTool = function(props) {
  const handle_submit = function() {
    axios({
      method: 'post',
      url: 'http://localhost:8000/core/query_regex/',
      data: {
        regex: props.regex,
        flags: props.flags,
        text: props.text
      }
    }).then(res => {
      window.$('.text_textArea').highlightWithinTextarea({
        highlight: res.data,
        className: 'highlight'
      });
    });
  };

  const handle_flags = function(flag) {
    flag = flag.target.value;
    if (props.flags.length === 0) {
      props.setFlags([...props.flags, flag]);
    } else {
      if (props.flags.includes(flag)) {
        props.setFlags(props.flags.filter(elem => elem !== flag));
      } else {
        props.setFlags([...props.flags, flag]);
      }
    }
  };

  const handle_save = function() {
    if (props.isLoggedin) {
      var name = prompt('Enter name');
      var description = prompt('Enter Description');

      axios({
        method: 'post',
        url: 'http://localhost:8000/core/query/',
        data: {
          query: props.regex,
          name,
          description
        },
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }).then(res => {
        console.log(res.data, '-------- response from server -----');
      });
    } else {
      alert('you have to log in or create an account first');
    }
  };

  return (
    <div className='form-group'>
      <label htmlFor='regex'>Enter Regex Here:</label>
      <input
        style={{ width: '80%' }}
        className='form-control'
        type='text'
        id='regex'
        value={props.regex}
        onChange={e => {
          props.setRegex(e.target.value);
        }}
      />
      <div id='checkBoxes_div' className='form-check'>
        <p
          style={{
            marginTop: '20px',
            marginLeft: '-20px',
            fontWeight: 'bold'
          }}
        >
          Specify the flags you want to add to your Regex Query
        </p>
        <input
          className='form-check-input'
          onChange={flag => {
            handle_flags(flag);
          }}
          type='checkbox'
          id='i'
          name='case-insensitive'
          value='IGNORECASE'
        />
        <label className='form-check-label' htmlFor='i'>
          Case insensitive - i
        </label>
        <br />
        <input
          className='form-check-input'
          onChange={flag => {
            handle_flags(flag);
          }}
          type='checkbox'
          id='m'
          name='multi-line'
          value='MULTILINE'
        />
        <label className='form-check-label' htmlFor='m'>
          Multi-line - m
        </label>
        <br />
        <input
          className='form-check-input'
          onChange={flag => {
            handle_flags(flag);
          }}
          type='checkbox'
          id='s'
          name='dot'
          value='DOTALL'
        />
        <label className='form-check-label' htmlFor='s'>
          Dot. matches all - s
        </label>
        <br />
      </div>
      <div id='textArea_div'>
        <label htmlFor='text'>Please Enter your Query Text</label>
        <br />
        <textarea
          // style={{ width: '80%' }}
          // rows='10'
          className='text_textArea'
          // className='form-control'
          value={props.text}
          onChange={e => {
            props.setText(e.target.value);
          }}
          id='text'
        ></textarea>
      </div>
      <button
        className='btn btn-success'
        type='submit'
        id='submitButton'
        onClick={handle_submit}
      >
        Query Regex !
      </button>
      <button
        style={{
          marginLeft: '10px'
        }}
        className='btn btn-secondary'
        onClick={handle_save}
      >
        Save Query
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedin: state.isLoggedin,
    email: state.email,
    regex: state.regex,
    flags: state.flags,
    text: state.text
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRegex: regex => dispatch(actions.setRegex(regex)),
    setFlags: flags => dispatch(actions.setFlags(flags)),
    setText: text => dispatch(actions.setText(text))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryTool);
