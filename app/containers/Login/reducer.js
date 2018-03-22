import { fromJS } from 'immutable';


import { 
  LOGIN_REQUEST,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   LOGOUT,
   SET_USERNAME,
   SET_PASSWORD,
   SET_SERACH_COUNT,
} from './constants';

let user =false;
if(localStorage.getItem('user')){
  user = JSON.parse(localStorage.getItem('user'));
} 
const initialState = user ? fromJS({ user }) : fromJS({formData : {username : '', password : ''}});

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    localStorage.setItem('user', "");
    return state
    .set('loading', true)
    .set('error', false)
    .set('user', false);
    case LOGIN_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .setIn(['formData', 'username'], '')
        .setIn(['formData', 'password'], '')
        .set('user', action.user);
    case LOGIN_ERROR:
      return state
        .set('loading', false)
        .set('error', true)
        .set('user', false);
    case SET_USERNAME:
      return state
        .setIn(['formData', 'username'], action.username);
    case SET_PASSWORD:
        return state
          .setIn(['formData', 'password'], action.password);
    case SET_SERACH_COUNT:
        return state
          .setIn(['user', 'count'], action.count);
    case LOGOUT:
        localStorage.setItem('user', "");
        return state
          .set('loading', false)
          .set('error', false)
          .setIn(['formData', 'username'], '')
          .setIn(['formData', 'password'], '');
          
    default:
      return state
  }
}