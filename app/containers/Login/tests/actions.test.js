import {
  LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   LOGOUT,
   SET_USERNAME,
   SET_PASSWORD,
   SET_SERACH_COUNT,
} from '../constants';

import {
  loginRequest,
  loginSuccess,
  loginError,
  logOut,
  setUserSearchCount,
  setPassword.
  setUserName
} from '../actions';

describe('App Actions', () => {
  describe('loginRequest', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGIN_REQUEST,
      };

      expect(loginRequest()).toEqual(expectedResult);
    });
  });

  describe('loginSuccess', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = {username : "username" , 'password' : "password"};
      const username = 'test';
      const password = 'test';
      const expectedResult = {
        type: LOGIN_SUCCESS,
        repos: fixture,
        username,
      };

      expect(loginSuccess(fixture, username, password)).toEqual(expectedResult);
    });
  });

  describe('loginError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_REPOS_ERROR,LOGIN_ERROR
        error: fixture,
      };

      expect(loginError(fixture)).toEqual(expectedResult);
    });
  });
});
