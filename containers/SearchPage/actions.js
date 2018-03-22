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
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
} from './constants';



/**
 * Load the Planets, this action starts the request saga
 *
 * @return {object} An action object with a type of SEARCH_REQUEST
 */

 export function searchRequest(query, loggedInUser) {
  return {
    type: SEARCH_REQUEST,
    query,
    loggedInUser,
  };
}

/**
 * Dispatched when the planets are loaded by the request saga
 *
 * @param  {array}  planets data.
 * 
 * @return {object} An action object with a type of SEARCH_SUCCESS passing the planets
 */
export function searchSuccess(planets) {
  return {
    type: SEARCH_SUCCESS,
    planets,
  };
}

/**
 * Dispatched when loading the planets fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of SEARCH_ERROR passing the error
 */
export function searchError(error) {
  return {
    type: SEARCH_ERROR,
    error,
  };
}
