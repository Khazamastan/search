/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

 // Import all the third party stuff
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect, withRouter  } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { makeLoggedInUser  } from 'containers/Login/selectors';
import { push } from 'react-router-redux';
import reducer from '../Login/reducer';
import saga from '../Login/saga';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Header from "components/Header"
//components
// Import route containers
import Login from 'containers/Login/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import { logOut } from 'containers/Login/actions';


const AppWrapper = styled.div`
  margin: 0 auto;
  height: 100%;
  background :transparent url(${ props => props.bg}) center/cover;
  transition : background 0.3s ease-in;
`;

class App extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
     super(props, context);
  }
  onLogout(){
    const { dispatch } = this.context.store;
    localStorage.setItem('user',"");
    this.props.logout();
    dispatch(push("/login"));
  }
  componentDidMount(){
    const { dispatch } = this.context.store;
    if(!localStorage.getItem('user')){
      this.props.logout();
      dispatch(push("/login"));
    }else{
      dispatch(push("/search"));
    }
  }
  render(){
    const { loggedInUser } = this.props
    return (
      <AppWrapper>
      <Helmet
        titleTemplate="%s - SWAPI Search"
        defaultTitle="SWAPI Search"
      >
      <meta name="description" content="A SWAPI Search application" />
      </Helmet>
      {localStorage.getItem("user") ? <Header user={loggedInUser} logout={this.onLogout.bind(this)} /> : null}
      <Switch>
          <Route path="/search" component={SearchPage} />
          <Route path="/login" component={Login} /> 
          <Route path="/" component={Login} /> 
      </Switch>
      {/*<Footer />*/}
      </AppWrapper>
    );
  }
}

App.contextTypes = {  
  store:  PropTypes.object,
  router : PropTypes.object 
};


App.propTypes = {
  loggedInUser:   PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};


export function mapDispatchToProps(dispatch) {
  return {
    dispatch : dispatch,
    logout : () => {
      dispatch(logOut())
    }
  }
}

const mapStateToProps = createStructuredSelector({
  loggedInUser: makeLoggedInUser(),
});


const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });


const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect
)(App));
