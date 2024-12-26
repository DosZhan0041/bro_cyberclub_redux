import React from "react";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

interface propsPacket {
  minusOneBasket: (packetId: number) => void;
  plusOnebasket: (packetId: number) => void;
  addBasket: (packet: object) => void;
  id: number;
  img: string;
  name: string;
  price: number;
  description: string;
  count: number;
}

const Packet: React.FC<propsPacket> = (props) => {
  const getBasket = localStorage.getItem("basket") || "[]";
  let getThisBasket = JSON.parse(getBasket);
  const addToBasket = () => {
    props.addBasket({
      id: props.id,
      name: props.name,
      price: props.price,
      img: props.img,
      description: props.description,
      count: props.count,
    });
  };

  let plusOneTobasket: React.MouseEventHandler<SVGElement> = () => {
    props.plusOnebasket(props.id);
  };

  let minusOneToBasket: React.MouseEventHandler<SVGElement> = () => {
    props.minusOneBasket(props.id);
  };

  return (
    <div className="packet">
      <div className="packet-container">
        <div className="packet-up">
          <img src={props.img}></img>
        </div>
        <div className="packet-down">
          <div className="packet-data">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            {getThisBasket.findIndex(
              (packet: { id: number }) => packet.id === props.id,
            ) > -1 ? (
              <div className="packet_change">
                <span
                  onClick={() => {
                    minusOneToBasket(props.id as any);
                  }}
                >
                  <CiCircleMinus />
                </span>
                {getThisBasket.map(
                  (packet: {
                    id: number;
                    name: string;
                    description: string;
                    price: number;
                    img: string;
                    count: number;
                  }) =>
                    packet.id === props.id && (
                      <div className="packet_change_count_price">
                        <p>{props.price * packet.count} тг</p>
                        <div className="packet_count_circle">
                          <p>{packet.count}</p>
                        </div>
                      </div>
                    ),
                )}
                <span
                  onClick={() => {
                    plusOneTobasket(props.id as any);
                  }}
                >
                  <CiCirclePlus />
                </span>
              </div>
            ) : (
              <div className="packet_default">
                <p>{props.price} тг</p>
                <button
                  className="glow-on-hover"
                  type="button"
                  onClick={addToBasket}
                >
                  {" "}
                  В Корзину
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packet;
