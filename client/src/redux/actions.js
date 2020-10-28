import * as actionTypes from './actionTypes';

export const setUsername = function(newUsername) {
  return {
    type: actionTypes.SET_USER_NAME,
    payload: {
      data: newUsername
    }
  };
};

export const setPassword = function(newPassword) {
  return {
    type: actionTypes.SET_PASSWORD,
    payload: {
      data: newPassword
    }
  };
};

export const setEmail = function(newEmail) {
  return {
    type: actionTypes.SET_EMAIL,
    payload: {
      data: newEmail
    }
  };
};

export const setIsLoggedin = function(newStatus) {
  return {
    type: actionTypes.SET_IS_LOGGEDIN,
    payload: {
      data: newStatus
    }
  };
};

export const setUserDisplay = function(userDisplay) {
  return {
    type: actionTypes.SET_USER_DISPLAY,
    payload: {
      data: userDisplay
    }
  };
};

export const setQueries = function(queries) {
  return {
    type: actionTypes.SET_QUERIES,
    payload: {
      data: queries
    }
  };
};
export const setRegex = function(regex) {
  return {
    type: actionTypes.SET_REGEX,
    payload: {
      data: regex
    }
  };
};

export const setFlags = function(flags) {
  return {
    type: actionTypes.SET_FLAGS,
    payload: {
      data: flags
    }
  };
};

export const setText = function(text) {
  return {
    type: actionTypes.SET_TEXT,
    payload: {
      data: text
    }
  };
};

export const setReplaceText = function(text) {
  return {
    type: actionTypes.SET_REPLACE_TEXT,
    payload: {
      data: text
    }
  };
};
