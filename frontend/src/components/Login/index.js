import React, {useState, useContext} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import {NewContext} from '../../App'



const Login = () => {
  const setTokenValue = useContext(NewContext).setToken;
  const setLogged = useContext(NewContext).setIsLoggedIn;
  const profilePic = useContext(NewContext).setProfilePicture;

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSpan = () => {
    navigate('/register')
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleButton = () => {
    axios.post('http://localhost:5000/users/login',{
      email: email,
      password: password
    })
    .then((result) => {
      profilePic(result.data.result[0].image)
      setTokenValue(result.data.token)
      setLogged(true)
      // navigate('/home')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <input onChange={handleEmail} placeholder="Email" />
      <input onChange={handlePassword} placeholder="Password" type={"password"} />
      <button onClick={handleButton}>Login</button>
      <h5>Don't have an account? click <span onClick={handleSpan}>Here</span> to Register in our website</h5>
    </div>
  )
};
export default Login;
