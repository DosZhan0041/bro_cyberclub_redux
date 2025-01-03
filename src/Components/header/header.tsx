import "../../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import BasketZero from "../Basket/BasketZero";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

let Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  let currentUser: string | null = JSON.parse(
    localStorage.getItem("user") as string,
  );
  let basketData = localStorage.getItem("basket") as string;
  let basket = JSON.parse(basketData);
  let lengthOfBasket = basket ? basket.length : 0;
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("basket");
    navigate("/login");
  };
  return (
    <header>
      <div className="menu-burger" onClick={() => setMenu(!menu)}>
        {<GiHamburgerMenu />}
      </div>
      <div className="header-left">
        <img src="../img/logo2.png" alt="" />
      </div>
      <nav ref={navRef} className={menu ? "menu-open" : ""}>
        <ul>
          <li className="menu-logo">
            <img src="./img/logobro.png"></img>
          </li>
          <li>
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/toBook"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Забронировать
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/devices"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Devicesss
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          </li>
          {currentUser != null ? (
            <li onClick={logOut}>Log Out</li>
          ) : (
            <li
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </li>
          )}
        </ul>
      </nav>
      <div className="header-right">
        <div className="header-right-up">
          <p>+7 747 305 64 71</p>
        </div>
        <div className="header-right-down">
          <a href="https://www.instagram.com/brocyberclub/" target="blank">
            <img src="../img/insta.png" alt="" />
          </a>
          {/* <a href="https://t.me/brocybercup" target='blank'><img src="../img/telegram.png" alt="" /></a> */}
          <button
            onClick={() => {
              lengthOfBasket ? navigate("/basket") : setShow(true);
            }}
          >
            <FaCartShopping />
            <p>{lengthOfBasket}</p>
          </button>
        </div>
      </div>
      <BasketZero show={show} setShow={setShow} />
    </header>
  );
};
export default Header;
