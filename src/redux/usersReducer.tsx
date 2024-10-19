const CREATE_USER = "CREATE_USER";
const PUT_USER = "PUT_USER";
const UPDATE_NEW_USERS_TEXT = "UPDATE_NEW_USERS_TEXT";
const authUser = JSON.parse(localStorage.getItem("user") as string);
let initialState = {
    users: [authUser],
    userName: '',
    userSurname: '',
    userPhone: '',
    userPhoto: ''
};

interface createUser {
    type: typeof CREATE_USER,
    newUser: object
}

interface updateNewText{
    type: typeof UPDATE_NEW_USERS_TEXT,
    userNameText: string | null,
    userSurnameText: string | null,
    userPhoneText: string | null,
    userPhotoFile: string | null
}

interface putUser{
    type: typeof PUT_USER,
    id: number,
    user: object,
    userName: string,
    userSurname: string,
    userPhone: string,
    userPhoto: string
}

type Action =     
    | createUser | updateNewText | putUser;

interface authUsertype{
    id: number,
    img: string,
    name: string,
    price: number,
    description: string,
    photo: string,
    accessToken: string,    
}

    interface State {
        users: authUsertype[],
        userName: string | null,
        userSurname: string | null,
        userPhone: string | null,
        userPhoto: string | null 
    }
let usersReducer = (state = initialState, action: Action): State => {
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


export const createUser = (newUser: object) => ({ type: CREATE_USER, newUser });
export const updateUser = (id: number, user: object) => ({ type: PUT_USER, id, user });
export const updateNewText = (userName: string, userSurname: string, userPhone: string, userPhoto: string) => ({
    type: UPDATE_NEW_USERS_TEXT,
    userNameText: userName,
    userSurnameText: userSurname,
    userPhoneText: userPhone,
    userPhotoFile: userPhoto
});

export default usersReducer;
