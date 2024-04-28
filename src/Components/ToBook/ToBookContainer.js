
import {connect}  from 'react-redux';
import ToBook from './ToBook';
import { useEffect } from 'react';
import { addBasketActionCreater, getPreloaderActionCreater, minusOneBasketActionCreater, plusOneBasketActionCreater, setPacketsActionCreater } from '../../redux/ToBookReducer';
import withAuthRedirect from '../HOC/withAuthRedirect';


let ToBookContainer = (props) => {
    useEffect(()=>{
      props.getPreloader(true)
      const timeout = setTimeout(() => {
        fetch("http://localhost:8080/packets")
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

function mapStateToProps(state){
    return{
        ToBookPage: state.ToBookPage,
        basket: state.ToBookPage.basket,
        isLoad: state.ToBookPage.isLoad,
    }
}

function mapDispatchToProps(dispatch){
    return{
        setPackets: (packets)=>{
            dispatch(setPacketsActionCreater(packets))
        },
        addBasket: (packet)=>{
          dispatch(addBasketActionCreater(packet))
        },
        plusOnebasket: (packetId)=>{
          dispatch(plusOneBasketActionCreater(packetId))
        },
        minusOneBasket: (packetId)=>{
          dispatch(minusOneBasketActionCreater(packetId))
        },
        getPreloader: (status)=>{
          dispatch(getPreloaderActionCreater(status))
        }
    }
}

let AuthRedirect = withAuthRedirect(ToBookContainer)
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect)