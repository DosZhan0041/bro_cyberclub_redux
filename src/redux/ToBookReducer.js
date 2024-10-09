const SET_PACKETS = "SET_PACKETS";
const ADD_BASKET = "ADD_BASKET";
const PLUS_ONE_BASKET = "PLUS_ONE_BASKET";
const MINUS_ONE_BASKET = "MINUS_ONE_BASKET"
const DELETE_BASKET = "DELETE_BASKET";
const POST_ORDERS = "POST_ORDERS";
const GET_PRELOADER = "GET_PRELOADER";

let initialState = {
    packets:
    [
        // {
        //     id: 1,
        //     name: "2+1 hours",
        //     img: "https://sun9-25.userapi.com/impg/VXZO_v1yDiiU0Z1_-VfSCELX6tBp_kTgaegzqA/4JG_nxstuCE.jpg?size=1375x804&quality=96&sign=0c25816a6a4f352fa396f1a4a2888770&c_uniq_tag=l-C1BsOZrXb-yOmem8n-vni9FHek4Qxxj4-ee6ZD0Bg&type=album",
        //     price: "1200",
        //     description: "Минимум минимум стресса!"
        // },
        // {
        //     id: 2,
        //     name: "3+2 hours",
        //     img: "https://art.kartinkof.club/uploads/posts/2023-06/1685773856_art-kartinkof-club-p-cs-go-arti-36.jpg",
        //     price: "1800",
        //     description: "Что то на геймерском, хэхэ"
        // },
        // {
        //     id: 3,
        //     name: "День",
        //     img: "https://art.kartinkof.club/uploads/posts/2023-06/1685773865_art-kartinkof-club-p-cs-go-arti-57.jpg",
        //     price: "2100",
        //     description: "С 8:00 - 18:00, границы не, не слышал"
        // },
        // {
        //     id: 4,
        //     name: "Ночь",
        //     img: "https://3dnews.ru/assets/external/illustrations/2021/07/07/1043725/p1_2523513_3c75d02c.jpg",
        //     price: "2800",
        //     description: "С 22:00 - 8:00, день и ночь, день и ночь!"
        // }
    ],
    basket: [],
    orders: [],
    isLoad: true,
}

let ToBookReducer  = (state=initialState, action)=>{
    switch (action.type){
        case SET_PACKETS:{
            return{
                ...state,
                packets: action.packets,
            }
        }

        case GET_PRELOADER: {
            return{
                ...state, isLoad: action.status
            }
        }
        case ADD_BASKET: {
            const packetWithCount = { ...action.packet, count: 1 };
            return {
              ...state,
              basket: state.basket.concat(packetWithCount) 
            };
          }
          case PLUS_ONE_BASKET:{
            debugger
            const packetToUpdate = state.basket.find(packet => packet.id === action.packetId);
            if(packetToUpdate){
                const updatedBasket = state.basket.map(packet => {
                    if(packet.id === action.packetId) {
                        return {...packet, count: packet.count + 1};
                    }
                    return packet;
                });
                    localStorage.setItem('basket', JSON.stringify(updatedBasket));
                return {
                    ...state,
                    basket: updatedBasket
                };
            } else {
                return state;
            }
        }
        

        case MINUS_ONE_BASKET:{
            const packetIndex = state.basket.findIndex(packet => packet.id === action.packetId);
            if (packetIndex !== -1) {
                const updatedBasket = [...state.basket];
                if (state.basket[packetIndex].count > 1) {
                    updatedBasket[packetIndex].count -= 1;
                } else {
                    updatedBasket.splice(packetIndex, 1);
                }
                localStorage.setItem('basket', JSON.stringify(updatedBasket));
                return {
                    ...state, 
                    basket: updatedBasket
                };
            }
            return state;
        }

        case DELETE_BASKET:{
            let deletedBasket = state.basket.filter(packet=>packet.id != action.id);
            localStorage.setItem('basket', JSON.stringify(deletedBasket));
            return{
                ...state,
                basket: deletedBasket
            }
        }

        case POST_ORDERS: {
            const userData = JSON.parse(localStorage.getItem('user'))
            let today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');

            const orderAndData = {orderData: action.orderData,
            datetime: date + ' | ' + time,
            userName: userData.name,
            userSurname: userData.surname,
            userId: userData.id,
            userNumber: userData.phone
            }
            fetch("http://192.168.0.104:8080/orders", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderAndData)
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Ошибка HTTP, статус " + response.status);
                }
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                return {
                    ...state,
                    orders: orderAndData
                };
            })
            .catch(function(error) {
                console.error("Произошла ошибка:", error);
            });
        }

        default:
            return state;
    }
}

export const setPacketsActionCreater = (packets) =>({type: SET_PACKETS, packets: packets}) 
export const addBasketActionCreater = (packet) =>({type: ADD_BASKET, packet:packet})
export const plusOneBasketActionCreater = (packetId)=>({type: PLUS_ONE_BASKET, packetId:packetId})
export const minusOneBasketActionCreater = (packetId)=>({type: MINUS_ONE_BASKET, packetId:packetId})
export const deleteBasketActionCreater = (id)=>({type: DELETE_BASKET, id:id})
export const postOrdersActionCreater = (orderData)=>({type: POST_ORDERS, orderData:orderData})
export const getPreloaderActionCreater = (status)=>({type: GET_PRELOADER, status: status})
export default ToBookReducer;