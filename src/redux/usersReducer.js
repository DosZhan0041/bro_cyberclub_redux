const CREATE_USER = "CREATE_USER";
const PUT_USER = "PUT_USER";
const UPDATE_NEW_USERS_TEXT = "UPDATE_NEW_USERS_TEXT";
const authUser = JSON.parse(localStorage.getItem("user"));
let initialState = {
    users: [authUser],
    userName: '',
    userSurname: '',
    userPhone: '',
    userPhoto: ''
};

let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER: {
            return {
                ...state,
                users: [...state.users, action.newUser]
            };
        }
        case UPDATE_NEW_USERS_TEXT: {
            return {
                ...state,
                userName: action.userNameText,
                userSurname: action.userSurnameText,
                userPhone: action.userPhoneText,
                userPhoto: action.userPhotoFile,
            };
        }
        case PUT_USER: {
            debugger
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.id) {
                        return {
                            ...user,
                            name: action.userName, 
                            surname: action.userSurname, 
                            phone: action.userPhone, 
                            photo: action.userPhoto 
                        };
                    }
                    return user;
                })
            };
        }
        
        default:
            return state;
    }
};


export const createUser = (newUser) => ({ type: CREATE_USER, newUser });
export const updateUser = (id, user) => ({ type: PUT_USER, id, user });
export const updateNewText = (userName, userSurname, userPhone, userPhoto) => ({
    type: UPDATE_NEW_USERS_TEXT,
    userNameText: userName,
    userSurnameText: userSurname,
    userPhoneText: userPhone,
    userPhotoFile: userPhoto
});

export default usersReducer;
