import React from 'react';
import { Store } from 'redux';  
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store, { AppStoreType } from './redux/redux-store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);



let rerenderEntireTree = (store:Store<AppStoreType>) =>{
  root.render(
    <Provider store={store}>
      <App /> 
    </Provider>
  );
}
rerenderEntireTree(store as any)
store.subscribe(()=>{
  rerenderEntireTree(store as any);
}) 



