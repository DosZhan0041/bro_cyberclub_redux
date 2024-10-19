import { TbMoodSadDizzy } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import React from "react";


interface ZeroProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

let BasketZero: React.FC<ZeroProps> = ({show, setShow}) => {
    const navigate = useNavigate()
    const exitBasket = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('BasketZero') || target.closest('.BasketZero')) {
            setShow(false);
        }
    };
    return(
        <div className="BasketZero" style={{display: show ? 'flex' : 'none' }}>
            <div className="BasketZero_block">
                <div className="basket_zero_icon">
                    <TbMoodSadDizzy />
                </div>
                <h1>Корзина пустая</h1>
                <button onClick={(e)=>{navigate('/toBook'); exitBasket(e)}}>Выбрать Пакеты</button>
                <span onClick={exitBasket} className="BasketZero_exit">
                    <IoIosClose />
                </span>
            </div>
        </div>
    )
}
export default BasketZero;