import Profile from "./Profile";
import React from "react";
import { connect } from "react-redux";
import withAuthRedirect from "../HOC/withAuthRedirect";
import { updateNewText, updateUser } from "../../redux/usersReducer";
import { Dispatch } from "redux";

interface authUserType {
  accessToken: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  photo: string | null;
  surname: string;
  country: null | string;
}

interface ToBookPageType {
  basket: [];
  isLoad: boolean;
  orders: [];
  packets: [];
}

interface usersPageType {
  userName: null | string;
  userSurname: null | string;
  userPhone: null | string;
  userPhoto: null | string;
}

interface propsType {
  ToBookPage: ToBookPageType;
  updateUser: (id: number, user: any) => void;
  updateNewText: (
    userName: string,
    userSurname: string,
    userPhone: string,
    userPhoto: string,
  ) => void;
  usersPage: usersPageType;
}

interface FCType {
  authUser: authUserType;
  props: propsType;
  ToBookPage: ToBookPageType;
  updateNewText: (
    userName: string,
    userSurname: string,
    userPhone: string,
    userPhoto: string,
  ) => void;
  updateUser: (id: number, updatedUser: updatedUserType) => void;
  usersPage: usersPageType;
}
interface updatedUserType {
  id: number;
  user: {
    name: string;
    surname: string;
    phone: string | number;
    photo: string | null;
  };
}

interface RootState {
  usersPage: usersType;
}

interface usersType {
  users: [];
  authUser: authUserType;
}

let ProfileContainer: React.FC<FCType> = ({ authUser, ...props }) => {
  return <Profile {...props} authUser={authUser} />;
};

const mapStateToProps = (state: RootState) => {
  const authUser = JSON.parse(localStorage.getItem("user") as string);
  return {
    usersPage: state.usersPage,
    authUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUser: (id: number, user: any) => {
      dispatch(updateUser(id, user));
    },
    updateNewText: (
      userName: string,
      userSurname: string,
      userPhone: string,
      userPhoto: string,
    ) => {
      dispatch(updateNewText(userName, userSurname, userPhone, userPhoto));
    },
  };
};

let AuthRedirect = withAuthRedirect(ProfileContainer);
export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
