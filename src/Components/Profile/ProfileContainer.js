
import Profile from "./Profile";
import React from "react";
import { connect } from 'react-redux';
import withAuthRedirect from "../HOC/withAuthRedirect";

let ProfileContainer = ({ authUser, ...props}) => {
    return <Profile {...props} authUser={authUser} />
}

const mapStateToProps = (state) => {
    const authUser = localStorage.getItem("user");
    return {
        authUser,
        ...state
    }
};

let AuthRedirect = withAuthRedirect(ProfileContainer);
export default connect(mapStateToProps, {})(AuthRedirect);
