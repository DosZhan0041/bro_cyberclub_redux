import {useNavigate} from 'react-router-dom'
import CardBasket from "./CardBasket";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from 'react';


    let Basket = (props) =>{
        let navigate = useNavigate()
        let getBasketData = localStorage.getItem('basket')
        let basketData = JSON.parse(getBasketData)
        const [totalPrice, setTotalPrice] = useState(0);
        useEffect(() => {
            calculateTotalPrice();
        }, [basketData]);
    
        const calculateTotalPrice = () => {
            let total = 0;
            basketData.forEach((packet) => {
                total += packet.price * packet.count;
            });
            setTotalPrice(total);
        }
        const handleConfirmOrder = () => {
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
                        basketData.length ? 
                        (basketData.map(packet=>(
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