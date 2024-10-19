
import {connect}  from 'react-redux';
import ToBook from './ToBook';
import React, { useEffect } from 'react';
import { addBasketActionCreater, getPreloaderActionCreater, minusOneBasketActionCreater, plusOneBasketActionCreater, setPacketsActionCreater } from '../../redux/ToBookReducer';
import withAuthRedirect from '../HOC/withAuthRedirect';
import { Dispatch } from 'redux';

  interface propsToContainer{
    ToBookPage: ToBookPageType,
    addBasket: (packet: object)=>void;
    authUser: authUserType,
    basket: [],
    getPreloader:(status: boolean)=>void,
    minusOneBasket: (packetId: number)=>void;
    plusOnebasket: (packetId: number)=>void;
    setPackets:(packets: [])=>void;
    isLoad: boolean,
    }

  interface authUserType{
    id: number,
    img: string,
    name: string,
    price: number,
    description: string,
    photo: string,
    accessToken: string,
  }

  interface ToBookPageType{
    basket: [],
    isLoad: boolean,
    orders: [],
    packets: []
  }


let ToBookContainer: React.FC<propsToContainer> = (props) => {
  
    useEffect(()=>{
      props.getPreloader(true)
      const timeout = setTimeout(() => {
        fetch("http://192.168.0.102:8080/packets")
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Ошибка HTTP, статус " + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                props.setPackets(data);
                props.getPreloader(false);
            })
            .catch(function(error) {
                console.error("Произошла ошибка:", error);
                props.getPreloader(false); 
            });
      }, 1000); 
    return () => clearTimeout(timeout);
    },[])
    return <ToBook {...props}/> 
}

interface RootState{
  ToBookPage: ToBookPageType,
  basket: [],
  isLoad: boolean
}

function mapStateToProps(state: RootState){
    return{
        ToBookPage: state.ToBookPage,
        basket: state.ToBookPage.basket,
        isLoad: state.ToBookPage.isLoad,
    }
}

function mapDispatchToProps(dispatch: Dispatch){
    return{
        setPackets: (packets: [])=>{
            dispatch(setPacketsActionCreater(packets))
        },
        addBasket: (packet: object)=>{
          dispatch(addBasketActionCreater(packet))
        },
        plusOnebasket: (packetId: number)=>{
          dispatch(plusOneBasketActionCreater(packetId))
        },
        minusOneBasket: (packetId: number)=>{
          dispatch(minusOneBasketActionCreater(packetId))
        },
        getPreloader: (status: boolean)=>{
          dispatch(getPreloaderActionCreater(status))
        }
    }
}

let AuthRedirect = withAuthRedirect(ToBookContainer)
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect)