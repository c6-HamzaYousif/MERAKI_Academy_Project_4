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
  const [showPassword, setShowPassword] = useState(false)

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
      <div className="container-pass-reg">
          <input className="regist-input" onChange={handlePassword} placeholder="Password" type={showPassword ? "text" : "password"} />
          {!showPassword && <svg onClick={() => {setShowPassword(!showPassword)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="showPass" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>} 
          {showPassword && <svg onClick={() => {setShowPassword(!showPassword)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="showPass" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/></svg>}        
      </div>
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
