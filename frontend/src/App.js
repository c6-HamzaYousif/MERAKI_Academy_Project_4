import "./App.css";
import React, {useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register"
import Navbar from "./components/Navbar"
import Login from "./components/Login"


function App() {
  return (
    // <NewContext.Provider>
    <div className="App">
      {/* <Navbar /> */}
    <Routes>
      <Route path = "/" element = {<Login />} />
      <Route path = "/register" element = {<Register />} />
    </Routes>

    </div>
    // </NewContext.Provider>

  );
}

export default App;
