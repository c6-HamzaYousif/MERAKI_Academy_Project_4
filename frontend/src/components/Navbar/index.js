import React, {useContext, useEffect, useState} from "react";
import {NewContext} from '../../App'
import { useNavigate } from "react-router-dom";
import "./style.css"
import axios from "axios";



const Navbar = () => {
    const navigate = useNavigate();
    const profilePic = useContext(NewContext).profilePicture;
    const setIsLoggedIn = useContext(NewContext).setIsLoggedIn;
    const showTheProduct = useContext(NewContext).show;
    const setShowTheProduct = useContext(NewContext).setShow;
    const setSearchArray = useContext(NewContext).setSearchArray;
    const searchArray = useContext(NewContext).searchArray;
    const cartItems = useContext(NewContext).cartItems;
    const cart = useContext(NewContext).cart;
    const [toggle, setToggle] = useState(false);
    const [huskar, setHuskar] = useState(0)

    const [searchValue, setSearchValue] = useState('')
    
    const searchFunction = () => {
      axios.get(`http://localhost:5000/products/search/${searchValue}`)
      .then((result) => {
        console.log(result.data);
        if ((result.data).constructor == Array){
          setSearchArray(result.data)
        }else{
          setSearchArray([])
        }
        console.log(searchArray);
        navigate("/search")
      })
      .catch((err) => {
        console.log(err);
      })
    }
    const someFnuction = () => {
      let x = 0
      if(cartItems.length>0){
        cartItems.map((elem, i) => {
          if (elem && elem.isOrdered === false){
            x+= elem.counter;
          }
          setHuskar(x)
        })
      }
      
    }
    useEffect(() => {
      someFnuction()
    },[cartItems])

    const handleLogout = () => {
      localStorage.clear();
      setIsLoggedIn(false)
      navigate('/')
    }
    

  return (
    <>
    <div className="nav-bar-container">
      <div className="nav-1">
          <img onClick={() => {setShowTheProduct(false); navigate('/')}} className="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAeFBMVEX///8AAACzs7NNTU3o6OjU1NT5+fnr6+vg4OD29varq6vd3d1sbGyKiorZ2dlZWVmEhISjo6PMzMyampqRkZG9vb15eXk/Pz9ERESxsbFlZWVxcXEyMjKXl5elpaVISEgNDQ1fX18kJCQvLy8XFxceHh5RUVExMTEgnwQbAAAEeElEQVR4nO3a65qqIBQG4DAPmVpmaqV2btr3f4db0SYOdpqmCOd7/8Vmng1LhAXY6wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8Le4kjlS3QTGHlMaqW6HWtooBWaluhlI0BGStuhlK1THoq26GUj6NgaG6GUrZ/TIEU9WtUM0ZqG4BwIcwVTdAvZAgCGvy1/cLvd7mj2cHFUImqpvwPlHitJS6hARttQeJ9eL2vN+ItCeEA0L8lurHsvZMKLNf0a7XsTNC5h5bUm+O5Jwwat01prR2zBatiGZvTZ/2gRn7Vh2DoVTTKEvlv69rz5mShFwYSJ/KJeJzHNUlC6nq8koM2C11Vhf9fltfxakbHDJFB3FkNNLW0pjWZof+WLcYNM8xYUrMTeswoJNfywpQPfYjW7Akup08Vm85yfiy9rVxc+EIxTP4yNgXxtEHi3L/rvTPlub/S9wgi93nGvWhvCoGW9WteCd5aaRL3kYqdhOpSFMrIadZyOt7QF9zaYz74gIQ6rq5nBEuVSxjsBOr1MmU2EFHXASNtiVFCwaX6dG82BOqkNb0bynEwNYqMeDxKUK1PxL2iE36KC77hBTc75wsX9G8txCepyMlelPSlv4lQn40apkxtOEKa7+QO/Z68yYG/IRQThI5+/sf/1MzOZ/aiderzb6CkJQtLV8Z7p0ZytOITkb8qD4Im4PJKQbcy+Dzs6Qtn6bopeBG/77s3Z751+8QsEtfNQzYLxJy8QXSjcFlQHt+IVycY8AMhFn185xRRnrtmNtwK1/d3dPb4DIhOE8A9VIxZP+m9dBVIwHboaa/zQw3Z2NwqlSfmZ2PT6rJQfeLKJPp9PeDj82enewIb1uODy9tfpyOoAxxKdES3RHUU8KI3K1ZCehf6D0jVujgPtC7gfR6vzl00qCDSPcZsUL7cYh6dvxACOjTr+eG8PZ/8fEe67qsC9/qmM+FoLj9P2ig/1QM5PM3HSVPxUCzm9ZLnglB26W0joInYqDrWapo8EQMVLf918x+HIK7rqC0YPw4Brpvlxg/DYHeB0i8R3YKrC59tudJD9gPpkYSWaNByRtZkTGM0/GXWE11u39Vce59aHiX8x4nmvib77o6H6nL6llxE9y13DtG8/VRxz5RrJ7q6IH6yZrIN7SaS1LuusyMFtMwH69nu6/dvpj3szRYJRb3qc0g68KuuZUbLbfS3Pftn7/q2AsgMZdsyngo+tvM97NsPOMOWI9Dfa9Yb7Gak4TDNlhEA3FxcL1kFR6bMPgdShBZNFHaxdH1h+wkIY2CVt8m36vq2p3TnDXvWI54QoQr9qvWXTlI5BHpy9UrCiJ8y9QN1RfHx/vSpKi6oNb/eqkFPVLbL2+s/3YU0A2Drh/j3WA1N81FOokG8urgjpJp3qRPmVZfZz/ECw7nVGi3ztIwiOM4TPMxexFfTLsbAco0woJctg6S7iaJHDMaxvn2nCFvqjExNayOP38AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC46j+/Jyc0VEgavgAAAABJRU5ErkJggg=="/>
      </div>

      <div className="nav-2">
         <h4 className="nav-bar-text"><span onClick={() => { setShowTheProduct(false); navigate('/mensWear')}}>Men</span><span onClick={() => { setShowTheProduct(false); navigate('/womensWear')}}>Women</span><span onClick={() => { setShowTheProduct(false); navigate('/kidswear')}}>Kids</span></h4>
      </div>

      <div className="nav-3">
          <input className="nav-input" placeholder="Search for an item or a category" onChange={(e) => {setSearchValue(e.target.value)}}/>
          <svg onClick={searchFunction}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="searchsvg" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>
      </div>

      <div className="nav-4">
         <span className="text-cart">{huskar}</span>
          <svg onClick={() => {navigate("/cart")}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cartsvg" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
      </div>
{/* {navigate('/orders')}} */}
      
    </div>
    <div className="nav-5">
    <img onClick={() => {setToggle(!toggle)}} className="profile-pic" src= {profilePic}/>
    {toggle && <div className="toggle-div">
      <h4  className="menu" onClick={() => {navigate('/orders'); setToggle(!toggle)}}>My Orders</h4>
      <h4 className="menu" onClick={() => {navigate('/profile')}}>My Profile</h4>
      <h4 className="menu" onClick={handleLogout}>Logout</h4>
    </div>}
    </div>
    </>
  )

};
export default Navbar;