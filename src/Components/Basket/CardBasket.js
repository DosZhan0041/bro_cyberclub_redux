import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { GiCrossedBones } from "react-icons/gi";
import { PiEyedropperSample } from "react-icons/pi";

let CardBasket = (props) =>{
    let plusOneTobasket = ()=>{
        props.plusOnebasket(props.id)
    }

    let minusOneToBasket =()=>{
        props.minusOneBasket(props.id)
    }

    let deletedToBasket=()=>{
        props.deletedBasket((props.id))
    }
    
    const totalPrice = props.price * props.count;

    return(
        <div className="card_basket">
            <div className="card_basket_img">
                <img src={props.img}/>
            </div>
            <div className="card_basket_text">
                <h1>{props.name}</h1>
                <p>{props.description}</p>
            </div>
            <div className="card_basket_counter">
                <CiCircleMinus onClick={()=>{minusOneToBasket(props.id)}}/>
                    <p>{props.count}</p>
                <CiCirclePlus onClick={()=>{plusOneTobasket(props.id)}} />
            </div>
            <div className="card_basket_total">
                <p>{totalPrice} тг</p>
            </div>
            <div className="card_basket_delete">
                <GiCrossedBones onClick={()=>{deletedToBasket(props.id)}}/>
            </div>
        </div>
    )
}
export default CardBasket;