import "./App.css";
import React, {useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Home from "./components/Home";

export const NewContext = createContext();


function App() {
  const [token, setToken] =useState('')
  localStorage.setItem("theToken", token)
  const theToken = localStorage.getItem("theToken")
  return (
    <NewContext.Provider value={{setToken}}>
    <div className="App">
      {/* <Navbar /> */}
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/register" element = {<Register />} />
      <Route path = "/home" element = {<Home />} />
    </Routes>

    </div>
    </NewContext.Provider>

  );
}

export default App;
