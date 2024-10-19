import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";


let withAuthRedirect = (Component: ComponentType<any>)=>{
    let NewComponent = (props: any)=>{
        
        let navigate = useNavigate()
        let authUser = JSON.parse(localStorage.getItem("user") as string)
        useEffect(()=>{
            if(!authUser){
                navigate('/login')
            }
        },[])
        return <Component {...props} authUser={authUser}/>
    }
    return NewComponent
}
export default withAuthRedirect;