import React from "react";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { GiCrossedBones } from "react-icons/gi";
import { PiEyedropperSample } from "react-icons/pi";

interface propsCard {
  count: number;
  deletedBasket: (id: number) => void;
  minusOneBasket: (id: number) => void;
  plusOnebasket: (id: number) => void;
  description: string;
  id: number;
  img: string;
  name: string;
  price: number;
}

let CardBasket: React.FC<propsCard> = (props) => {
  const { id, img } = props;
  let plusOneTobasket: React.MouseEventHandler<SVGElement> = () => {
    props.plusOnebasket(props.id);
  };

  let minusOneToBasket: React.MouseEventHandler<SVGElement> = () => {
    props.minusOneBasket(props.id);
  };

  let deletedToBasket: React.MouseEventHandler<SVGElement> = () => {
    props.deletedBasket(props.id);
  };

  const totalPrice = props.price * props.count;

  return (
    <div className="card_basket">
      <div className="card_basket_img">
        <img src={props.img} />
      </div>
      <div className="card_basket_text">
        <h1>{props.name}</h1>
        <p>{props.description}</p>
      </div>
      <div className="card_basket_counter">
        <span
          onClick={() => {
            minusOneToBasket(props.id as any);
          }}
        >
          <CiCircleMinus />
        </span>
        <p>{props.count}</p>
        <span
          onClick={() => {
            plusOneTobasket(props.id as any);
          }}
        >
          <CiCirclePlus />
        </span>
      </div>
      <div className="card_basket_total">
        <p>{totalPrice} тг</p>
      </div>
      <div className="card_basket_delete">
        <span
          onClick={() => {
            deletedToBasket(props.id as any);
          }}
        >
          <GiCrossedBones />
        </span>
      </div>
    </div>
  );
};
export default CardBasket;
