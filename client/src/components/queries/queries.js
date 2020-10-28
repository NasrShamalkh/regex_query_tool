import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import axios from 'axios';

const SavedQueries = function(props) {
  useEffect(() => {
    if (props.isLoggedin) {
      axios({
        method: 'get',
        url: 'http://localhost:8000/core/query/',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          props.setQueries(res.data);
        })
        .catch(err => {
          console.log('Error in fetching quries');
        });
    }
  }, [props.isLoggedin, props.queries]);

  const handle_delete = function(id) {
    if (props.isLoggedin) {
      axios({
        method: 'delete',
        url: `http://localhost:8000/core/query/${id}`,
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }).then(res => {
        console.log(res.data, '-------- response from server -----', 'deleted');
      });
    }
  };

  if (props.isLoggedin) {
    if (props.queries.length === 0) {
      return (
        <div>
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'monospace',
              fontSize: '20px',
              marginTop: '10px'
            }}
          >
            Your Quries
          </p>
          <p
            style={{
              fontFamily: 'revert',
              fontSize: '20px',
              textAlign: 'center',
              marginTop: '20px'
            }}
          >
            Looks like you don't have any queries <br />
            let's add some
          </p>
        </div>
      );
    } else {
      return (
        <div
          style={{
            position: 'relative'
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              fontFamily: 'monospace',
              fontSize: '20px',
              marginTop: '10px'
            }}
          >
            Your Quries
          </h1>
          <div>
            <ul className='list-group query_list'>
              {props.queries.map((query, index) => {
                return (
                  <li
                    onClick={() => {
                      props.setRegex(query.query);
                    }}
                    key={index}
                    className='query_list_item'
                    className='list-group-item'
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'cursive',
                        marginLeft: 'auto'
                      }}
                    >
                      {query.query}
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    >
                      Name:{' '}
                    </span>
                    {query.name} <br />
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    >
                      Description:
                    </span>{' '}
                    <br />{' '}
                    <span
                      style={{
                        fontSize: '15px'
                      }}
                    >
                      {query.description}
                    </span>
                    <button
                      style={{
                        float: 'right'
                      }}
                      className='btn btn-danger'
                      onClick={() => {
                        handle_delete(query.id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'monospace',
            fontSize: '20px',
            marginTop: '10px'
          }}
        >
          Your Quries
        </p>
        <h3
          style={{
            textAlign: 'center',
            fontFamily: 'monospace',
            fontSize: '20px',
            marginTop: '10px'
          }}
        >
          you have to log into your accont to display your saved queries
        </h3>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isLoggedin: state.isLoggedin,
    queries: state.queries
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setQueries: queries => dispatch(actions.setQueries(queries)),
    setRegex: regex => dispatch(actions.setRegex(regex))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedQueries);
