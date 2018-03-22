/*
 * LoginConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SET_USERNAME = 'app/Login/SET_USERNAME';
export const SET_PASSWORD = 'app/Login/SET_PASSWORD';

export const LOGIN_REQUEST = 'app/Login/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'app/Login/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'app/Login/LOGIN_ERROR';
export const LOGOUT = 'app/Login/USERS_LOGOUT';


export const SET_SERACH_COUNT = 'app/Login/SET_SERACH_COUNT';
