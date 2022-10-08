import "./App.css";
import React, {useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Home from "./components/Home";
import Men from "./components/Men";
import Women from "./components/Women";
import Kids from "./components/Kids";
import Product from "./components/Product";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Footer from "./components/Footer";
import EditProfile from "./components/EditProfile";

export const NewContext = createContext();


function App() {
  const [token, setToken] =useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profilePicture, setProfilePicture] = useState('');
  const [loggedInUserGender, setLoggedInUserGender] = useState('')
  const [loggedInUserAge, setLoggedInUserAge] = useState('')
  const [loggedInUserId, setLoggedInUserId] = useState('')
  const [show, setShow] = useState(false)
  const [loggerFirstName, setLoggerFirstName] = useState('')
  const[womenWear, setWomenWear] = useState([]);
  const[womenShoes, setWomenShoes] = useState([]);
  const[womenTop, setWomenTop] = useState([]);
  const[womenBottom, setWomenBottom] = useState([]); 
  const[mensWear, setMenWear] = useState([]);
  const[menTop, setMenTop] = useState([]);
  const[menBottom, setMenBottom] = useState([]);
  const[menShoes, setMenShoes] = useState([]);
  const[kidsWear, setKidsWear] = useState([]);
  const[kidsTop, setKidsTop] = useState([]);
  const[kidsBottom, setKidsBottom] = useState([]);
  const[kidsShoes, setKidsShoes] = useState([]);
  const [searchArray, setSearchArray] = useState([]);
  const [userEmail, setUserEmail] =useState('')
  const [userPassword, setUserPassword] =useState('')
  const [userCity, setUserCity] =useState('')
  const [userLastName, setUserLastName] =useState('')
  localStorage.setItem("theToken", token)

  
  const[singleProducts, setSingleProduct] = useState([]);
  const[addComment, setAddComment] = useState(false);
  const [showInputComment, setShowInputComment] = useState(false);
  const [comment, setCommment] = useState('')
  const [productID, setProductID] = useState('');
  const [cart, setCart] = useState([])
  const [cartItems, setCartitems] = useState([]);
  // localStorage.setItem("theToken", token)
  const theToken = localStorage.getItem("theToken")

  if(!isLoggedIn){
    return (
    
      <NewContext.Provider value={{token, setToken, setIsLoggedIn, setProfilePicture, setLoggedInUserGender, setLoggedInUserAge, setLoggedInUserId, setLoggerFirstName, cart, setUserEmail, setUserPassword, setUserCity, setUserLastName}}>
      <div className="App">
      <Routes>
        <Route path = "/" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/home" element = {<Home />} />
      </Routes>
  
      </div>
      </NewContext.Provider>
  
    );
  }else{
    return(

      <NewContext.Provider value={{setIsLoggedIn, profilePicture, loggedInUserGender, loggedInUserAge, setShow, show, loggedInUserId, loggerFirstName, setWomenWear, womenShoes, setWomenShoes, womenTop, setWomenTop, womenBottom, setWomenBottom, womenWear, mensWear, setMenWear, menTop, setMenTop, menBottom, setMenBottom, menShoes, setMenShoes, kidsWear, setKidsWear, kidsTop, setKidsTop, kidsBottom, setKidsBottom, kidsShoes, setKidsShoes,   singleProducts, setSingleProduct, addComment, setAddComment, showInputComment, setShowInputComment, comment, setCommment, productID, setProductID, searchArray, setSearchArray, theToken, setCart, cart, cartItems, setCartitems, userEmail, userPassword, userCity, userLastName, loggerFirstName, profilePicture, loggedInUserGender, loggedInUserAge}}>
        <Navbar />

        <Routes>

          <Route path = "/" element = {<Home />} />
          <Route path = "/mensWear" element = {<Men />} />
          <Route path = "/womensWear" element = {<Women />} />
          <Route path = "/kidswear" element = {<Kids />} />
          <Route path = "/product" element = {<Product />} />
          <Route path = "/search" element = {<Search />} />
          <Route path = "/cart" element = {<Cart />} />
          <Route path="/orders" element = {<Order />} />
          <Route path="/profile" element={<EditProfile />} />
        </Routes>

        {/* <Footer /> */}

      </NewContext.Provider>

    )
  }
  
}

export default App;




