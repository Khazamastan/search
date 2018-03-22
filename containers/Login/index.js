import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectFormData , makeSelectLoading, makeSelectError } from './selectors';
import LoadingIndicator from 'components/LoadingIndicator';

import { setUserName, setPassword, loginRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

class Login extends React.Component {
  onChangeName = (e) => {
    const username = e.target.value;
    this.props.setUserName(username);
  }
  onChangePassword = (e) => {
    const password = e.target.value;
    this.props.setPassword(password)
  }
  doLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.props.formData;
    if (!username || !password) {
      this.setState({ error: 'Please enter all fileds' });
    } else {
      this.props.doLogin({ username, password })
    }
  }
  
  render() {
    const { username, password } = this.props.formData || {};
    let { error, loading } = this.props;
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={this.doLogin}>
            <input disabled={loading} type="text" placeholder="username" value={username || ""} onChange={this.onChangeName} />
            <input disabled={loading} type="password" placeholder="password" value={password || ""} onChange={this.onChangePassword} />
            <button>{loading ? <LoadingIndicator color="#fff" size="20"/> : "login"}</button>
            {this.props.error ? <p className="error-text">{this.props.error ? "Username or DOB is wrong, Please Correct" : ""}</p> : null}
          </form>
        </div>
      </div>);
  }
}


Login.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  formData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]),
  setPassword: PropTypes.func,
  setUserName: PropTypes.func,
  doLogin: PropTypes.func,

};


export function mapDispatchToProps(dispatch) {
  return {
    setUserName: (username) => { 
      dispatch(setUserName(username)) 
    },
    setPassword: (password) => { 
      dispatch(setPassword(password))
    },
    doLogin: (formData) => {
      dispatch(loginRequest(formData))
    },
  };
}

const mapStateToProps = createStructuredSelector({
  formData: makeSelectFormData(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Login);
