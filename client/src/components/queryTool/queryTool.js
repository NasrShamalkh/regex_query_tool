import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import './highlight-within-textarea';
import jQuery from 'jquery';

const QueryTool = function(props) {
  const [dispalyText, setDisplayText] = useState('idle');

  const handle_submit = function(replace_text = null) {
    var data;
    if (replace_text) {
      data = {
        regex: props.regex,
        flags: props.flags,
        text: props.text,
        replace_text: replace_text
      };
    } else {
      data = {
        regex: props.regex,
        flags: props.flags,
        text: props.text
      };
    }
    axios({
      method: 'post',
      url: 'core/query_regex/',
      data: data
    }).then(res => {
      console.log(res);
      if (typeof res.data === 'string') {
        if (res.data != props.text) {
          props.setText(res.data);
          jQuery('.text_textArea').highlightWithinTextarea({
            highlight: replace_text,
            className: 'highlight'
          });
          setDisplayText('valid');
        } else {
          console.log('invalid');
          setDisplayText('');
        }
      } else if (res.data.length > 0 && Array.isArray(res.data)) {
        jQuery('.text_textArea').highlightWithinTextarea({
          highlight: res.data,
          className: 'highlight'
        });
        setDisplayText('valid');
      } else {
        setDisplayText('invalid');
      }
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
    if (props.regex == '') {
      alert('Please Enter a Regex expresseion to save');
    } else if (props.isLoggedin) {
      var name = prompt('Enter name');
      var description = prompt('Enter Description');

      axios({
        method: 'post',
        url: 'core/query/',
        data: {
          query: props.regex,
          name,
          description
        },
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }).then(res => {
        props.increaseCount();
        alert('Query saved !');
      });
    } else {
      alert('you have to log in or create an account first');
    }
  };

  return (
    <div className='form-group'>
      <label htmlFor='regex'>Enter Regex Here:</label>
      <input
        placeholder='Regex'
        style={{ width: '80%' }}
        className='form-control'
        type='text'
        id='regex'
        value={props.regex}
        onChange={e => {
          props.setRegex(e.target.value);
        }}
      />
      <label htmlFor='replace_text'>
        Replace(
        <span
          style={{
            opacity: '0.6'
          }}
        >
          optional
        </span>
        ):
      </label>
      <br />
      <input
        placeholder='This will replace all matches'
        style={{ width: '60%', display: 'inline' }}
        className='form-control'
        type='text'
        id='replace_text'
        value={props.replace_text}
        onChange={e => {
          props.setReplaceText(e.target.value);
        }}
      />
      <button
        style={{
          display: 'inline',
          marginLeft: '6px',
          position: 'relative',
          bottom: '3px'
        }}
        className='btn btn-warning'
        onClick={() => {
          handle_submit(props.replace_text);
        }}
      >
        Replace Regex
      </button>
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
          IGNORECASE - I
        </label>
        <br />
        <input
          className='form-check-input'
          onChange={flag => {
            handle_flags(flag);
          }}
          type='checkbox'
          id='u'
          name='unicode'
          value='UNICODE'
        />
        <label className='form-check-label' htmlFor='u'>
          UNICODE - U
        </label>
        <br />
        {/*  */}
        <input
          className='form-check-input'
          onChange={flag => {
            handle_flags(flag);
          }}
          type='checkbox'
          id='x'
          name='verbose'
          value='VERBOSE'
        />
        <label className='form-check-label' htmlFor='x'>
          VERBOSE - X
        </label>
        <br />
        {/*  */}
        <input
          className='form-check-input'
          onChange={flag => {
            handle_flags(flag);
          }}
          type='checkbox'
          id='s'
          name='dotall'
          value='DOTALL'
        />
        <label className='form-check-label' htmlFor='s'>
          DOTALL - S
        </label>
        <br />
      </div>
      <div id='textArea_div'>
        <label
          style={{
            width: '760px'
          }}
          htmlFor='text'
        >
          <span id='_left'>Please Enter your Query Text</span>
          <span id='_right'>
            {dispalyText === 'valid' ? (
              <p
                style={{
                  color: 'green'
                }}
              >
                &lt; Query text is valid &gt;
              </p>
            ) : dispalyText === 'idle' ? (
              <p>&lt; Your query result will be displayed here &gt;</p>
            ) : (
              <p style={{ color: 'red' }}>
                &lt; No match! query text is invalid &gt;
              </p>
            )}
          </span>
        </label>
        <br />
        <textarea
          className='text_textArea'
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
        onClick={() => {
          handle_submit(null);
        }}
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
    text: state.text,
    replace_text: state.replace_text
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRegex: regex => dispatch(actions.setRegex(regex)),
    setFlags: flags => dispatch(actions.setFlags(flags)),
    setText: text => dispatch(actions.setText(text)),
    setReplaceText: text => dispatch(actions.setReplaceText(text)),
    increaseCount: () => dispatch(actions.increaseCount())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QueryTool);
