/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectFormData = () => createSelector(
  selectGlobal,
  (globalState) => {
    return { username : globalState.getIn(['formData','username']),
             password : globalState.getIn(['formData','password'])
        };
  }, 
);

const makeLoggedInUser = () => createSelector(
  selectGlobal,
  (globalState) => { 
    if(localStorage.getItem('user')){
      return JSON.parse(localStorage.getItem('user')); 
    }else{
      return {};
    }
  }
);


const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);


const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);


export {
  selectGlobal,
  makeSelectFormData,
  makeSelectLoading,
  makeSelectError,
  makeLoggedInUser,
  
};
