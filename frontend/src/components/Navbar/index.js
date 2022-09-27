import React, {useContext} from "react";
import {NewContext} from '../../App'
import "./style.css"



const Navbar = () => {
    const profilePic = useContext(NewContext).profilePicture;
    const showTheProduct = useContext(NewContext).show;
    const setShowTheProduct = useContext(NewContext).setShow;

  return (
    <div className="nav-bar-container">
        <img onClick={() => {setShowTheProduct(false)}} className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITfe6NzLz0D5QOrubCQDrAt4-HmS0eS_FIg&usqp=CAU"/>
        <h4><span>Men</span><span>Women</span><span>Kids</span></h4>
        <input placeholder="Search for an item or a category"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className = "bi bi-cart2" viewBox="0 0 16 16"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/></svg>
        <img className="profile-pic" src= {profilePic}/>
    </div>
  )

};
export default Navbar;