import "./style.css"
import React, {useState, useEffect, useContext} from "react";
import { NewContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Women() {
    const navigate = useNavigate();
    const womenWear = useContext(NewContext).womenWear;
    const setWomenWear = useContext(NewContext).setWomenWear;
    const womenShoes = useContext(NewContext).womenShoes;
    const setWomenShoes = useContext(NewContext).setWomenShoes;
    const womenTop = useContext(NewContext).womenTop;
    const setWomenTop = useContext(NewContext).setWomenTop;
    const womenBottom = useContext(NewContext).womenBottom;
    const setWomenBottom = useContext(NewContext).setWomenBottom;
    const setShowTheProduct = useContext(NewContext).setShow;
    const setSingleProduct = useContext(NewContext).setSingleProduct;
    const setProductID = useContext(NewContext).setProductID;
    const showTheProduct = useContext(NewContext).show;


    const showProduct = (e) => {
        const selectedProductId = e.target.id;
        setProductID(selectedProductId);
        axios.get(`http://localhost:5000/products/${selectedProductId}`)
        .then((result) => {
            // console.log(result.data.product);
            setSingleProduct(result.data.product)
            setShowTheProduct(true)
            navigate('/product')
            console.log("whyy");
    
        })
        .catch((err) => {
            console.log("err");
        })
    }

    if(!showTheProduct){

    return (
        <>
        <div>
        {womenTop.map((elem, i) => {
            return(
               <div className="porduct" key={i}>
                <h2 className="porduct-text">{elem.name}</h2>
                <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
                <div className = "text-cart-container">
                <h2 className="porduct-text">{elem.price}</h2>
                <button>Add To Shopping Cart</button>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                </div>
                </div> 
            )
        }) }
        </div>

        <div>
        {womenBottom.map((elem, i) => {
            return(
               <div className="porduct" key={i}>
                <h2 className="porduct-text">{elem.name}</h2>
                <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
                <div className = "text-cart-container"> 
                <h2 className="porduct-text">{elem.price}</h2>
                <button>Add To Shopping Cart</button>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                </div>
                </div> 
            )
        }) }
        </div>

        <div>
        {womenShoes.map((elem, i) => {
            return(
               <div className="porduct" key={i}>
                <h2 className="porduct-text">{elem.name}</h2>
                <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
                <div className = "text-cart-container">
                <h2 className="porduct-text">{elem.price}</h2>
                <button>Add To Shopping Cart</button>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                </div>
                </div> 
            )
        }) }
        </div>
        </>
    )
    }
}

export default Women;