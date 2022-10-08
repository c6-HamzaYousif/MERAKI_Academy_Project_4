import "./style.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { NewContext } from "../../App";


const EditProfile = () => {
    
    const loggedInUserId = useContext(NewContext).loggedInUserId;
    const userEmail = useContext(NewContext).userEmail;
    const userPassword = useContext(NewContext).userPassword;
    const userCity = useContext(NewContext).userCity;
    const userLastName = useContext(NewContext).userLastName;
    const loggerFirstName = useContext(NewContext).loggerFirstName;
    const profilePicture = useContext(NewContext).profilePicture;
    const loggedInUserGender = useContext(NewContext).loggedInUserGender;
    const loggedInUserAge = useContext(NewContext).loggedInUserAge;
    const setIsLoggedIn = useContext(NewContext).setIsLoggedIn;


    const [e1, setE1] = useState(false)
    const [e2, setE2] = useState(false)

    const [e3, setE3] = useState(false)
    const [e4, setE4] = useState(false)
    const [e5, setE5] = useState(false)
    const [e6, setE6] = useState(false)
    const [e7, setE7] = useState(false)
    const [e8, setE8] = useState(false)

    
    const navigate = useNavigate();
    const [responseToUser, SetResponseToUser] = useState('')
    const [email, setEmail] = useState(userEmail)
    const [password, setPassword] = useState(userPassword)
    const [firstName, setFirstName] = useState(loggerFirstName)
    const [lastName, setLastName] = useState(userLastName)
    const [age, setAge] = useState(loggedInUserAge)
    const [city, setCity] = useState(userCity)
    const [gender, setGender] = useState(loggedInUserGender)
    const [image, setImage] = useState(profilePicture)
    const [userResponse, setUserResponse] = useState('')
  
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
        axios.put(`http://localhost:5000/users/edit/${loggedInUserId}`, {
            firstName , lastName, email, password, age, city, gender, image
        })
        .then((result) => {
            console.log(result.data.message);
            SetResponseToUser(result.data.message);
            setTimeout(() => {
              localStorage.clear();
              setIsLoggedIn(false)
              navigate('/')
            }, 3000)
        })
        .catch((err) => {
            console.log(err.message);
        })
    }
  return (
    <div className='profile-divv'>
      <div className="edit">
        <h3>Edit Your First Name</h3>
        <div className="toChek">
        <svg onClick={() => {setE1(true)}}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prof-svg" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
        </div>
        {e1 && <input className="profile-input" onChange={handleFirstName} type={Text} placeholder = "New First Name" />}

      </div>
      <div className="edit">
            <h3>Edit Your Last Name</h3>
            <svg onClick={() => {setE2(true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prof-svg" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
            { e2 && <input className="profile-input" onChange={handleLastName} type={Text} placeholder = "New Last Name" />}      </div>
      <div className="edit">
            <h3>Edit Your Email</h3>
            <svg onClick={() => {setE3(true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prof-svg" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
            { e3 &&<input className="profile-input" onChange={handleEmail} placeholder="New Email" />}
      </div>
      <div className="edit">
            <h3>Edit Your Password</h3>
            <svg onClick={() => {setE4(true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prof-svg" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
            { e4 &&<input className="profile-input" onChange={handlePassword} placeholder="New Password" type={"password"} />}
      </div>
      <div className="edit">
            <h3>Edit Your Age</h3>
            <svg onClick={() => {setE5(true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prof-svg" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
            { e5 && <input className="profile-input" onChange={handleAge} type={Number} placeholder = "New Age" />}
      </div>
      <div className="edit">
            <h3>Edit Your Gender</h3>
            <svg onClick={() => {setE6(true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prof-svg" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
            { e6 &&<input className="profile-input" onChange={handleGender} type={Text} placeholder = "New Gender" />}
      </div>
      <div className="edit">
            <h3>Edit Your City</h3>
            <svg onClick={() => {setE7(true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prof-svg" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
            {e7 && <input className="profile-input" onChange={handleCity} type={Text} placeholder = "New City" />}

      </div>
      <div className="edit">
            <h3>Edit Your Image</h3>
            <svg onClick={() => {setE8(true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="prof-svg" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
            {e8 && <input className="profile-input" onChange={handleImage} type={Text} placeholder = "New Image-URL" />}
      </div>

      <button className="edit-btn" onClick={handleButton}>Save Changes</button>
      {responseToUser && 
        <h4 className="edit-res">{responseToUser}</h4>
      }
    </div>
  )
}

export default EditProfile