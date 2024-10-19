import { connect } from "react-redux"
import Registration from "./Registration"
import { createUser } from "../../redux/usersReducer"
import React from "react"

interface usersPageType {
    userName: null | string,
    userSurname: null | string,
    userPhone: null | string,
    userPhoto: null | string
}

interface propsRegister {
    usersPage: usersPageType,
    createUser: (newUser: object) => void    
}

let RegistrationContainer: React.FC<propsRegister> = (props) => {
    console.log(props);
    
    return <Registration {...props}/>
}

interface RootState {
    usersPage: usersPageType
}

let mapStateToProps =(state: RootState)=>{
    return{
        usersPage: state.usersPage
    }
}

export default connect(mapStateToProps, {createUser})(RegistrationContainer)