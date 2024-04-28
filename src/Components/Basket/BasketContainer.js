
import React from 'react';
import { connect } from 'react-redux';
import Basket from './Basket';
import { deleteBasketActionCreater, minusOneBasketActionCreater, plusOneBasketActionCreater, postOrdersActionCreater } from '../../redux/ToBookReducer';
import withAuthRedirect from '../HOC/withAuthRedirect';

const BasketContainer = (props) => {
  return <Basket {...props}/>;
};

const mapStateToProps = (state) => {
  return {
    ToBookPage: state.ToBookPage,
    basket: state.ToBookPage.basket,
    orders: state.ToBookPage.orders,
  };
}

const mapDispatchToProps = (dispatch)=>{
  return{
    plusOnebasket: (packetId)=>{
      dispatch(plusOneBasketActionCreater(packetId))
    },
    minusOneBasket: (packetId)=>{
      dispatch(minusOneBasketActionCreater(packetId))
    },
    deletedBasket: (id)=>{
      dispatch(deleteBasketActionCreater(id))
    },
    postOrders: (orderData)=>{
      dispatch(postOrdersActionCreater(orderData))
    }
  }
}

let AuthRedirect = withAuthRedirect(BasketContainer)
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
