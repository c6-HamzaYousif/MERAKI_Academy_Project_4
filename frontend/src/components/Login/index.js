import React, {useState, useContext} from "react";
import "./style.css"
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import {NewContext} from '../../App'



const Login = () => {
  const setTokenValue = useContext(NewContext).setToken;
  const token = useContext(NewContext).token;
  const setLogged = useContext(NewContext).setIsLoggedIn;
  const profilePic = useContext(NewContext).setProfilePicture;
  const setUserGender = useContext(NewContext).setLoggedInUserGender;
  const setUserAge = useContext(NewContext).setLoggedInUserAge;
  const setLoggerId = useContext(NewContext).setLoggedInUserId;
  const loggerFN = useContext(NewContext).setLoggerFirstName;
  const setUserLastName = useContext(NewContext).setUserLastName;
  const setUserCity = useContext(NewContext).setUserCity;
  const setUserPassword = useContext(NewContext).setUserPassword;
  const setUserEmail = useContext(NewContext).setUserEmail;
  const [showPassword, setShowPassword] = useState(false)



  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userResponse, setUserResponse] = useState('')

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
      // gender, image, age, id, firstName
      //  lastName, city, email, password
      setUserGender(result.data.result[0].gender);
      profilePic(result.data.result[0].image);
      setUserAge(result.data.result[0].age);
      setUserEmail(result.data.result[0].email);
      setUserPassword(result.data.result[0].password);
      setUserCity(result.data.result[0].city);
      setUserLastName(result.data.result[0].lasName);
      setTokenValue(result.data.token);
      // console.log(result.data.token);
      // console.log(token);
      // localStorage.setItem("theToken", token)
      setLoggerId(result.data.result[0]._id)
      loggerFN(result.data.result[0].firstName)
      setLogged(true);
      // navigate('/home')
    })
    .catch((err) => {
      // console.log(err.response.data);
      setUserResponse(err.response.data);
    })
  }

  return (
    <div className="test">

      {/* <img className="login-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAeFBMVEX///8AAACzs7NNTU3o6OjU1NT5+fnr6+vg4OD29varq6vd3d1sbGyKiorZ2dlZWVmEhISjo6PMzMyampqRkZG9vb15eXk/Pz9ERESxsbFlZWVxcXEyMjKXl5elpaVISEgNDQ1fX18kJCQvLy8XFxceHh5RUVExMTEgnwQbAAAEeElEQVR4nO3a65qqIBQG4DAPmVpmaqV2btr3f4db0SYOdpqmCOd7/8Vmng1LhAXY6wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8Le4kjlS3QTGHlMaqW6HWtooBWaluhlI0BGStuhlK1THoq26GUj6NgaG6GUrZ/TIEU9WtUM0ZqG4BwIcwVTdAvZAgCGvy1/cLvd7mj2cHFUImqpvwPlHitJS6hARttQeJ9eL2vN+ItCeEA0L8lurHsvZMKLNf0a7XsTNC5h5bUm+O5Jwwat01prR2zBatiGZvTZ/2gRn7Vh2DoVTTKEvlv69rz5mShFwYSJ/KJeJzHNUlC6nq8koM2C11Vhf9fltfxakbHDJFB3FkNNLW0pjWZof+WLcYNM8xYUrMTeswoJNfywpQPfYjW7Akup08Vm85yfiy9rVxc+EIxTP4yNgXxtEHi3L/rvTPlub/S9wgi93nGvWhvCoGW9WteCd5aaRL3kYqdhOpSFMrIadZyOt7QF9zaYz74gIQ6rq5nBEuVSxjsBOr1MmU2EFHXASNtiVFCwaX6dG82BOqkNb0bynEwNYqMeDxKUK1PxL2iE36KC77hBTc75wsX9G8txCepyMlelPSlv4lQn40apkxtOEKa7+QO/Z68yYG/IRQThI5+/sf/1MzOZ/aiderzb6CkJQtLV8Z7p0ZytOITkb8qD4Im4PJKQbcy+Dzs6Qtn6bopeBG/77s3Z751+8QsEtfNQzYLxJy8QXSjcFlQHt+IVycY8AMhFn185xRRnrtmNtwK1/d3dPb4DIhOE8A9VIxZP+m9dBVIwHboaa/zQw3Z2NwqlSfmZ2PT6rJQfeLKJPp9PeDj82enewIb1uODy9tfpyOoAxxKdES3RHUU8KI3K1ZCehf6D0jVujgPtC7gfR6vzl00qCDSPcZsUL7cYh6dvxACOjTr+eG8PZ/8fEe67qsC9/qmM+FoLj9P2ig/1QM5PM3HSVPxUCzm9ZLnglB26W0joInYqDrWapo8EQMVLf918x+HIK7rqC0YPw4Brpvlxg/DYHeB0i8R3YKrC59tudJD9gPpkYSWaNByRtZkTGM0/GXWE11u39Vce59aHiX8x4nmvib77o6H6nL6llxE9y13DtG8/VRxz5RrJ7q6IH6yZrIN7SaS1LuusyMFtMwH69nu6/dvpj3szRYJRb3qc0g68KuuZUbLbfS3Pftn7/q2AsgMZdsyngo+tvM97NsPOMOWI9Dfa9Yb7Gak4TDNlhEA3FxcL1kFR6bMPgdShBZNFHaxdH1h+wkIY2CVt8m36vq2p3TnDXvWI54QoQr9qvWXTlI5BHpy9UrCiJ8y9QN1RfHx/vSpKi6oNb/eqkFPVLbL2+s/3YU0A2Drh/j3WA1N81FOokG8urgjpJp3qRPmVZfZz/ECw7nVGi3ztIwiOM4TPMxexFfTLsbAco0woJctg6S7iaJHDMaxvn2nCFvqjExNayOP38AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC46j+/Jyc0VEgavgAAAABJRU5ErkJggg=="/> */}

      <div className="login-container">
        <h2 className="login-header">Login</h2>
        <div className="some-div">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svglog" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg>
          <input onChange={handleEmail} placeholder='Type Your Email'  className="login-input"/>
        </div>
        <div className="some-div">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="svglog" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>
            <input onChange={handlePassword} placeholder="Type Your Password" type={showPassword ? "text" : "password"}  className="login-input"/>
            {!showPassword && <svg onClick={() => {setShowPassword(!showPassword)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="showPass" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>} 
            {showPassword && <svg onClick={() => {setShowPassword(!showPassword)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="showPass" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/></svg>}        
        </div>
        <button className="login-button" onClick={handleButton}>Login</button>
        <h3 className="login-response">{userResponse}</h3>
        <h3 className="login-text">New Here?<span className="span-log" onClick={handleSpan}>Sign In</span> </h3>
      </div>
    </div>
  )
};
export default Login;
