import React, { useEffect, useState } from "react";
import Packet from "./ToBookPackets/Packet";
import Preloader from "../Preloader/Preloader";

interface propsToBook{
    ToBookPage: ToBookPageType,
    addBasket: (packet: object)=>void;
    authUser: authUserType,
    basket: [],
    getPreloader: (status: boolean)=>void,
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

let ToBook: React.FC<propsToBook> = (props)=>{
    
    const addBasket = (packet: object) =>
    {
        props.addBasket(packet);
        localStorage.setItem('basket', JSON.stringify([...props.basket,{...packet, count:1}]));
    }
    return(
        <div className="tobook-container">
            {
                props.isLoad ? <Preloader/> 
                :
                (
                    <div className="container">
                        <div className='tobook-wrapper'>
                            <div className="tobook-up">
                                <h1>Все пакеты</h1>
                            </div>
                            <div className="tobook-down">
                                {
                                    props.ToBookPage.packets.map((packet:{name: string; img: string, description: string; id: number; price: number; count: number})=>(
                                        <Packet name={packet.name} img={packet.img} count={packet.count} description={packet.description} id={packet.id} key={packet.id} price={packet.price} addBasket={addBasket} plusOnebasket={props.plusOnebasket} minusOneBasket={props.minusOneBasket} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default ToBook;