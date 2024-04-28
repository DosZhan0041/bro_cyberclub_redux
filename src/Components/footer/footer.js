import './../../App.css';
import {NavLink} from 'react-router-dom';

let footer =()=>{
    return(
        <div className='footer'>
            <div className='footer-left'>
                <img src='./img/logo2.png' alt=''></img>
            </div>
            <div className='footer-middle'>
                <h1>Клубы:</h1>
                <a href='https://2gis.kz/almaty/inside/70030076182184372/firm/70000001047831011?m=76.89716%2C43.230568%2F16' target='blank'> ул.Жандосова, 58/1</a>
                <a href='https://2gis.kz/almaty/inside/9430047374966811/firm/70000001067765974?m=76.92469%2C43.241301%2F16' target='blank'>ул.Абая, 89</a>
                <a href='https://2gis.kz/almaty/inside/9430047375164715/firm/70000001067758725?m=76.927326%2C43.24849%2F14.11' target='blank'>ул.Наурызбай Батыра 50</a>
                <a href='https://2gis.kz/almaty/inside/70030076192009219/firm/70000001057527568?m=76.895012%2C43.208481%2F16' target='blank'>ул.Розыбакиева, 320</a>
            </div>
            <div className='footer-right'>
                <p className="security">© Все права защищены</p>
                <p className="security">DeVeLoPeR: <a href='https://www.instagram.com/bauyrzhanuly_16' target='blank'>@bauyrzhanuly_16</a></p>
            </div>
        </div>
    )
}
export default footer;