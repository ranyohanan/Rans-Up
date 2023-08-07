import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import Register from './components/Register';
import NavBar from './components/NavBar';
import './NavBar.css';
import './CardItem.css';
import './Mobile576-680.css';
import './Mobile681-819.css';
import './Mobile820-1200.css';
import './Mobile1201-1531.css';
import CardDetails from './components/CardDetails';
import MyCards from './components/MyCards';
import About from './components/About';
import AddCard from './components/AddCard';
import EditCard from './components/EditCard';
import FavCards from './components/FavCards';
import Card from './interfaces/Card';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';

let classes = {
  light: {
    color: "light-mode-color",
    background: "light-mode-bgc"
  },
  dark: {
    color: "dark-mode-color",
    background: "dark-mode-bgc"
  }
}

let classes2 = {
  light: {
    color: "dark-mode-color",
    background: "dark-mode-bgc"
  },
  dark: {
    color: "light-mode-color",
    background: "light-mode-bgc"
  }
}

export let SiteTheme = createContext(classes.light);
export let SiteTheme2 = createContext(classes2.light);
function App() {
  let [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo") as string) == null ? { email: false, userType: false }
    : JSON.parse(sessionStorage.getItem("userInfo") as string));
  let [isLoggedIn, setIsLoggedIn] = useState<boolean>(sessionStorage.getItem("isLoggedIn") == "true" ? true : false);
  let [card, setCard] = useState<Card[]>([]);
  let [darkMode, setDarkMode] = useState<boolean>(sessionStorage.getItem("darkMode") == "true" ? true : false);
  return (

    <SiteTheme.Provider value={darkMode ? classes.dark : classes.light}>
      <SiteTheme2.Provider value={darkMode ? classes2.dark : classes2.light}>
        <div className="App">
          <ToastContainer />
          <Router>
            <NavBar userInfo={userInfo} setUserInfo={setUserInfo} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setDarkMode={setDarkMode} darkMode={darkMode}></NavBar>
            <Routes>
              <Route path='/' element={<Home userInfo={userInfo} darkMode={darkMode} />} />
              <Route path='/login' element={<Login setUserInfo={setUserInfo} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} />} />
              <Route path='/register' element={<Register darkMode={darkMode} />} />
              <Route path='/carddetails/:id' element={<CardDetails darkMode={darkMode} />} />
              <Route path='/about' element={<About darkMode={darkMode} />} />
              <Route path='/mycards/:userId' element={<MyCards userInfo={userInfo} darkMode={darkMode} />} />
              <Route path='/addcard' element={<AddCard userInfo={userInfo} darkMode={darkMode} />} />
              <Route path='/cards/edit/:id' element={<EditCard userInfo={userInfo} darkMode={darkMode} />} />
              <Route path='/favCards/:userId' element={<FavCards userInfo={userInfo} darkMode={darkMode} />} />
              <Route path='*' element={<PageNotFound darkMode={darkMode} />} />
            </Routes>
            <Footer userInfo={userInfo} setUserInfo={setUserInfo} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} ></Footer>
          </Router>
        </div>
      </SiteTheme2.Provider></SiteTheme.Provider>
  );
}

export default App;
