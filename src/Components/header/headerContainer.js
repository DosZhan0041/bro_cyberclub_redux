// HeaderContainer.js

import React from 'react';
import { connect } from 'react-redux';
import Header from './header';

const HeaderContainer = () => {
  return <Header />;
};

const mapStateToProps = (state) => {
  return {
    basket: state.ToBookPage.basket 
  };
};

export default connect(mapStateToProps)(HeaderContainer);
