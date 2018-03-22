/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_USERNAME,
  SET_PASSWORD,
  LOGOUT,
  SET_SERACH_COUNT,
} from './constants';



/**
 * set username entered by user
 * @return {object} An action object with a type of LOGIN
 */
export function setUserName(username) {
  return {
    type: SET_USERNAME,
    username,
  };
}


/**
 * set password entered by user
 * @return {object} An action object with a type of LOGIN
 */
export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    password,
  };
}



/**
 * set password entered by user
 * @return {object} An action object with a type of LOGIN
 */
export function setUserSearchCount(count) {
  return {
    type: SET_SERACH_COUNT,
    count,
  };
}




/**
 * Load the browsers, this action starts the request saga
 * @return {object} An action object with a type of LOGIN
 */
export function logOut(formData) {
  return {
    type: LOGOUT,
    formData,
  };
}



/**
 * Load the browsers, this action starts the request saga
 * @return {object} An action object with a type of LOGIN
 */
export function loginRequest(formData) {
  return {
    type: LOGIN_REQUEST,
    formData,
  };
}


/**
 * Dispatched when the logged are loaded by the request saga
 *
 * @param  {object} The logged user data
 * @return {object}      An action object with a type of LOGIN_SUCCESS passing the user object
 */
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

/**
 * Dispatched when user login fails
 *
 * @param  {object} error The error
 * @return {object}       An action object with a type of LOGIN_ERROR passing the error
 */
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
