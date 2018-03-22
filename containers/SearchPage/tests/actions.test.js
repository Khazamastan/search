import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR
} from './constants';

import {
  searchRequest,
  searchSuccess,
  searchError,
} from '../actions';

describe('App Actions', () => {
  describe('searchRequest', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SEARCH_REQUEST,
      };

      expect(searchRequest()).toEqual(expectedResult);
    });
  });

  describe('searchSuccess', () => {
    it('should return the correct type and the passed users', () => {
      const fixture = ['Test'];
      const planets = [{name : "1", popularity : '10000'},{name : "2", popularity : '40000'}];
      const expectedResult = {
        type: SEARCH_SUCCESS,
        planets: planets,
      };

      expect(searchSuccess(planets)).toEqual(expectedResult);
    });
  });

  describe('searchError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: SEARCH_ERROR,
        error: fixture,
      };

      expect(searchError(fixture)).toEqual(expectedResult);
    });
  });
});
