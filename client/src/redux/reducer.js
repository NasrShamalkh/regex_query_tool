import * as actionTypes from './actionTypes';

const initState = {
  username: '',
  email: '',
  password: '',
  queries: [],
  isLoggedin: localStorage.getItem('token') ? true : false,
  userDisplay: localStorage.getItem('token') ? 'USER_PROFILE' : 'USER_LOGIN',
  regex: '',
  flags: [],
  text: '',
  replace_text: ''
};

const reducer = function(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET_USER_NAME:
      return {
        ...state,
        username: action.payload.data
      };
    case actionTypes.SET_PASSWORD:
      return {
        ...state,
        password: action.payload.data
      };
    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: action.payload.data
      };
    case actionTypes.SET_IS_LOGGEDIN:
      return {
        ...state,
        isLoggedin: action.payload.data
      };
    case actionTypes.SET_USER_DISPLAY:
      return {
        ...state,
        userDisplay: action.payload.data
      };
    case actionTypes.SET_QUERIES:
      return {
        ...state,
        queries: action.payload.data
      };
    case actionTypes.SET_REGEX:
      return {
        ...state,
        regex: action.payload.data
      };
    case actionTypes.SET_FLAGS:
      return {
        ...state,
        flags: action.payload.data
      };
    case actionTypes.SET_TEXT:
      return {
        ...state,
        text: action.payload.data
      };
    case actionTypes.SET_REPLACE_TEXT:
      return {
        ...state,
        replace_text: action.payload.data
      };
    default:
      return state;
  }
};

export default reducer;
