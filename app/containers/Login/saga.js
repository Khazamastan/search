/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST } from 'containers/Login/constants';
import { loginSuccess, loginError } from 'containers/Login/actions';

import request from 'utils/request';
import { makeSelectFormData } from 'containers/Login/selectors';
import { push } from 'react-router-redux';

/**
 * Github repos request/response handler
 */

function authenticate(usersData, username, password){
    usersData = usersData.results;
    const current = usersData.filter((user) => {
      return user.name === username && user.birth_year === password;
    });

    if(current && current.length){
      return current[0];
    } else {
      return false;
    }
}

export function* doLogin() {
  // Select username from store
  
  try {
    const formData = yield select(makeSelectFormData());
    const { username, password } = formData;
    const requestURL = `people/?search=${username}`;
    // Call our request helper (see 'utils/request')
    
    //*Move this to actions
    const user = yield call(request, requestURL);
    const authenticatedUser = authenticate(user, username, password);
    
    if (authenticatedUser) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      if(authenticatedUser.birth_year == password){
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        yield put(loginSuccess(authenticatedUser));
        yield put(push('/search'));
      } else {
        yield put(loginError({}));
      }

    } else {
      yield put(loginError({}));
    }
    //*Move this to actions
    
  } catch (err) {
    yield put(loginError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* Login() {
  // Watches for LOGIN_REQUEST actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount.
  yield takeLatest(LOGIN_REQUEST, doLogin);
}