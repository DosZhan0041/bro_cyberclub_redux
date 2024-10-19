// HeaderContainer.js

import React from 'react';
import { connect } from 'react-redux';
import Header from './header';

const HeaderContainer: React.FC = () => {
  return <Header />;
};

interface ToBookPageState{
  basket: []
}

interface RootState{
  ToBookPage: ToBookPageState
}

const mapStateToProps = (state: RootState) => {
  return {
    basket: state.ToBookPage.basket 
  };
};

export default connect(mapStateToProps)(HeaderContainer);
