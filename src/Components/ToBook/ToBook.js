import { useEffect, useState } from "react";
import Packet from "./ToBookPackets/Packet";
import Preloader from "../Preloader/Preloader";


let ToBook = (props)=>{
    const addBasket = (packet) =>
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
                                    props.ToBookPage.packets.map((packet)=>(
                                        <Packet name={packet.name} img={packet.img} description={packet.description} id={packet.id} key={packet.id} price={packet.price} addBasket={addBasket} plusOnebasket={props.plusOnebasket} minusOneBasket={props.minusOneBasket} />
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