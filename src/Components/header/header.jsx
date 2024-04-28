import '../../App.css'
import {NavLink, useNavigate} from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import BasketZero from '../Basket/BasketZero';


let Header = (props)=>{
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    let currentUser = JSON.parse(localStorage.getItem('user'))
    let basketData = localStorage.getItem('basket');
    let basket = JSON.parse(basketData);
    let lengthOfBasket = basket ? basket.length : 0;
    let logOut=()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("basket")
        navigate("/login")
      }
    return(
        <div className='header'>
            <div className="header-left"><img src="../img/logo2.png" alt="" /></div>
            <nav>
                <ul>
                    <li><NavLink to="/" className={(navData)=>(navData.isActive ? "active" : "")}>Главная</NavLink></li>
                    <li><NavLink to="/toBook" className={(navData)=>(navData.isActive ? "active" : "")}>Забронировать</NavLink></li>
                    <li><NavLink to="/devices" className={(navData)=>(navData.isActive ? "active" : "")}>Devicesss</NavLink></li>
                    <li><NavLink to="/profile" className={(navData)=>(navData.isActive ? "active" : "")}>Profile</NavLink></li>
                    {
                        currentUser!=null ? (<li onClick={logOut}>Log Out</li>) : (<li onClick={()=>{navigate("/login")}}>Sign In</li>)
                    }
                </ul>
            </nav>
            <div className="header-right">
                <div className="header-right-up">
                    <p>+7 747 305 64 71</p>
                </div>
                <div className="header-right-down">
                    <a href="https://www.instagram.com/brocyberclub/" target='blank'><img src="../img/insta.png" alt="" /></a>
                    {/* <a href="https://t.me/brocybercup" target='blank'><img src="../img/telegram.png" alt="" /></a> */}
                    <button onClick={()=>{lengthOfBasket ? navigate("/basket") : setShow(true)}}>
                        <FaCartShopping />
                        <p>{lengthOfBasket}</p>
                    </button>
                </div>
            </div>
            <BasketZero show={show} setShow={setShow}/>
        </div>
    )
}
export default Header;