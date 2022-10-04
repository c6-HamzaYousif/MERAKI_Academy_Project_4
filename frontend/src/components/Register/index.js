import React, {useState} from "react";
import "./style.css"
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')
  const [image, setImage] = useState('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg')
  const [userResponse, setUserResponse] = useState('')
  const [errorResponse, setErrorResponse] = useState('')


  const handleFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastName = (e) => {
    setLastName(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleAge = (e) => {
    setAge(e.target.value)
  }
  const handleCity = (e) => {
    setCity(e.target.value)
  }
  const handleImage = (e) => {
    if(e.target.value){
      setImage(e.target.value)
    }
  }
  const handleGender = (e) => {
    setGender(e.target.value)
  }

  const handleButton = () => {
    axios.post('http://localhost:5000/users/register', {
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      city: city,
      email: email,   
      password: password,
      image: image
    })
    .then((result) => {
      console.log(result.data);
      setErrorResponse('')
      setUserResponse(result.data.message)
    })
    .catch((err) => {
      console.log(err.response.data);
      setErrorResponse(err.response.data)

    })
  }
  const handleBackButton = () => {
    navigate('/')
  }

  return (
    <div className="test-regist">
      <div className="regist-container">
      <h2 className="regist-header">Register</h2>

      <input className="regist-input" onChange={handleFirstName} type={Text} placeholder = "First Name" />
      <input className="regist-input" onChange={handleLastName} type={Text} placeholder = "Last Name" />
      <input className="regist-input" onChange={handleEmail} placeholder="Email" />
      <input className="regist-input" onChange={handlePassword} placeholder="Password" type={"password"} />
      <input className="regist-input" onChange={handleAge} type={Number} placeholder = "Age" />
      <input className="regist-input" onChange={handleGender} type={Text} placeholder = "Gender" />
      <input className="regist-input" onChange={handleCity} type={Text} placeholder = "City" />
      <input className="regist-input" onChange={handleImage} type={Text} placeholder = "Image-URL" />

      {!userResponse && 
        <button className="regist-button" onClick={handleButton}>Register</button>
      } 
      <div className="response">{userResponse}</div>
      <div className="response">{errorResponse}</div>
      {userResponse && 
      <button className="back" onClick={handleBackButton}>Back to login page</button>
      }
      </div>
    </div>
  );
};
export default Register;
