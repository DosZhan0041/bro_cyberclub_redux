import React from "react";
import { connect } from "react-redux";
import Basket from "./Basket";
import {
  deleteBasketActionCreater,
  minusOneBasketActionCreater,
  plusOneBasketActionCreater,
  postOrdersActionCreater,
} from "../../redux/ToBookReducer";
import withAuthRedirect from "../HOC/withAuthRedirect";

interface ToBookPageType {
  basket: BasketItem[];
  isLoad: boolean;
  orders: [any];
  packets: [
    {
      id: number;
      name: string;
      price: number;
      img: string;
      description: string;
      count: number;
    },
  ];
}

interface authUserType {
  accessToken: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  photo: string;
  surname: string;
}
interface BasketItem {
  id: number;
  name: string;
  price: number;
  img: string;
  description: string;
  count: number;
}

interface BasketType {
  ToBookPage: ToBookPageType;
  authUser: authUserType;
  basket: BasketItem[];
  deletedBasket: (id: number) => void;
  minusOneBasket: (packetId: number) => void;
  plusOnebasket: (packetId: number) => void;
  orders: any;
  postOrders: (orderData: any) => void;
}

interface ToBookPageState {
  basket: BasketItem[];
  orders: any[];
}

interface RootState {
  ToBookPage: ToBookPageState;
}

const BasketContainer: React.FC<BasketType> = (props) => {
  return <Basket {...props} />;
};

const mapStateToProps = (state: RootState) => {
  return {
    ToBookPage: state.ToBookPage,
    basket: state.ToBookPage.basket,
    orders: state.ToBookPage.orders,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    plusOnebasket: (packetId: number) => {
      dispatch(plusOneBasketActionCreater(packetId));
    },
    minusOneBasket: (packetId: number) => {
      dispatch(minusOneBasketActionCreater(packetId));
    },
    deletedBasket: (id: number) => {
      dispatch(deleteBasketActionCreater(id));
    },
    postOrders: (orderData: any) => {
      dispatch(postOrdersActionCreater(orderData));
    },
  };
};

const AuthRedirect = withAuthRedirect(BasketContainer);
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
