import {combineReducers, legacy_createStore as createStore} from 'redux';
import ToBookReducer from './ToBookReducer';
import usersReducer from './usersReducer';


let reducers = combineReducers({
    ToBookPage: ToBookReducer,
    usersPage: usersReducer,
});
export type AppStoreType = ReturnType<typeof reducers>;
let store = createStore(reducers);

export default store;