
import Profile from "./Profile";
import React from "react";
import { connect } from 'react-redux';
import withAuthRedirect from "../HOC/withAuthRedirect";
import { updateNewText, updateUser } from "../../redux/usersReducer";



let ProfileContainer = ({ authUser, ...props}) => {
        
    return <Profile {...props} authUser={authUser} />
}

const mapStateToProps = (state) => {
    const authUser = JSON.parse(localStorage.getItem("user"))
    return {
        usersPage: state.usersPage,
        authUser,
        ...state
    }
};

const mapDispatchToProps = (dispatch)=>{
    return{
        updateUser: (id, user)=>{
            dispatch(updateUser(id, user))
        },
        updateNewText: (userName, userSurname, userPhone, userPhoto)=>{
            dispatch(updateNewText(userName, userSurname, userPhone, userPhoto))
        }
    }
}

let AuthRedirect = withAuthRedirect(ProfileContainer);
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
