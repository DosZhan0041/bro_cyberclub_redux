import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/footer/footer';
import Main from './Components/main/main';
import Devices from './Components/Devices/devices';
import ToBookContainer from './Components/ToBook/ToBookContainer';
import HeaderContainer from './Components/header/headerContainer';
import BasketContainer from './Components/Basket/BasketContainer';
import RegistrationContainer from './Components/Registration/RegistrationContainer';
import Login from './Components/Login/Login';
import ProfileContainer from './Components/Profile/ProfileContainer';
import JsonShortener from './Components/JsonShortener';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <HeaderContainer/>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/tobook' element={<ToBookContainer/>} />
          <Route path='/devices' element={<Devices />} />
          <Route path='/basket' element={<BasketContainer />} />
          <Route path='/register' element={<RegistrationContainer />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/profile' element={<ProfileContainer/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
