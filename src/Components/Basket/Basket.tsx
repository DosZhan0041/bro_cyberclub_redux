import {useNavigate} from 'react-router-dom'
import CardBasket from "./CardBasket";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState }  from 'react';
import React from 'react';

        interface BasketItem {
            id: number,
            name: string,
            price: number,
            img: string,
            description: string,
            count: number
        }

        interface ToBookPageType {
            basket: BasketItem[],
            isLoad: boolean,
            orders: [any],
            packets: [{
                    id: number,
                    name: string,
                    price: number,
                    img: string,
                    description: string,
                    count: number
                }],
        }

        interface authUserType {
            accessToken: string,
            email: string,
            id: number,
            name: string,
            phone: string,
            photo: string,
            surname: string
        }

        interface BasketType{
            ToBookPage: ToBookPageType,
            authUser: authUserType,
            basket: BasketItem[]
            deletedBasket: (id: number)=>void;
            minusOneBasket: (packetId: number)=>void;
            plusOnebasket: (packetId: number)=>void;
            orders: [],
            postOrders: (orderData: any)=>void;

        }


    let Basket:React.FC<BasketType> = (props) =>{
        let navigate = useNavigate();
        let getBasketData = localStorage.getItem('basket');
        let basketData = getBasketData ? JSON.parse(getBasketData) : [];
        const [totalPrice, setTotalPrice] = useState(0);
        useEffect(() => {
            calculateTotalPrice();
        }, [basketData]);
    
        const calculateTotalPrice = () => {
            let total = 0;
            basketData.forEach((packet: {price: any; count: number}) => {
                total += packet.price * packet.count;
            });
            setTotalPrice(total);
        }
        const handleConfirmOrder = () => {
            debugger
            props.postOrders(props.basket)
            localStorage.removeItem('basket');
            navigate("/")
            alert('Ваш заказ успешно оформлен!')
          };
        return(
            <div className="Basket">
                <div className="container">
                    <p className='down_the_tobook' onClick={()=>navigate('/tobook')}> <IoIosArrowBack /> к выбору пакетов</p> 
                    <h1 className='basket_text'>Корзина <span className='basket_mini_text'>(в корзине {basketData && basketData.length ? basketData.length : 0} элементов)</span></h1>
                    {
                        basketData.length > 0 ? 
                        (basketData.map((packet: {id: number; name: string; description: string; price: number; img: string; count: number;})=>(
                           <CardBasket id={packet.id} name={packet.name} description={packet.description} price={packet.price} img={packet.img} count={packet.count} plusOnebasket={props.plusOnebasket} minusOneBasket={props.minusOneBasket} deletedBasket={props.deletedBasket} key={packet.id}/>
                            ))
                        )
                         :
                        (
                            <div className="Basket_Empty">
                                
                            </div>
                        )
                    }
                    {
                        basketData.length ? (
                        <div className='basket_all_total'>
                            <button onClick={handleConfirmOrder}>Подвердить заказ: {totalPrice} тг</button>
                        </div>
                        )
                        :
                        (
                        <div></div>
                        )
                    }
                </div>
            </div>
        )
    }
    export default Basket