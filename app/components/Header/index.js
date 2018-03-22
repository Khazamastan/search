import React from 'react';

import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import WelcomeText from './WelcomeText';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <NavBar>
          <WelcomeText>Welcome {this.props.user && this.props.user.name || ""}</WelcomeText>
          <HeaderLink onClick={this.props.logout}>Log Out</HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
