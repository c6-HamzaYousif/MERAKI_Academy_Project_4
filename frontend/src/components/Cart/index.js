import "./style.css"
import React, {useContext, useEffect, useState} from "react";
import {NewContext} from '../../App'
import axios from "axios";


const Cart = () => {
    const cart = useContext(NewContext).cart;
    const cartItems = useContext(NewContext).cartItems;
    const setCartitems = useContext(NewContext).setCartitems;
    const loggerId = useContext(NewContext).loggedInUserId;
    const userToken = useContext(NewContext).theToken;
    // const [cartItems, setCartitems] = useState([]);


    const getCarts = () => {
        axios.get(`http://localhost:5000/carts/${loggerId}`, {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
        .then((result) => {
            if(result.data.product.length>0){
                setCartitems(result.data.product);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        getCarts()
    }, [])

    const deleteCart = (e) => {
        const selectedId = e.target.id;
        axios.delete(`http://localhost:5000/carts/delete/${selectedId}`, {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
          .then((result) => {
            // console.log(result);
            const newCart = cartItems.filter((elem, i) => {
                return selectedId !== elem._id
            })
            setCartitems(newCart);
          })
          .catch((err) => {
            console.log(err);
          })
    }

  return (
    <div className='cartt'>
        <div className="cart-header">
            <h4 className="cart-header-medium">Product</h4>
            <h4 className="cart-header-big">Desciption</h4>
            <h4 className="cart-header-small">Quantity</h4>
            <h4 className="cart-header-small">Price</h4>
            <h4 className="cart-header-small">Remove</h4>
        </div>
    {cartItems.map((elem, i) => {
        if(elem && !elem.isOrdered){
            return(
                <div className="cart-single-line">
                    <div className="single-line-medium">
                        <img className="cart-prod-img" src={elem.items.image} />
                    </div>
                    <h4 className="single-line-big">{elem.items.name}</h4>
                    <div className="arrow-quantity">
                        <h4 className="arrow">&lt;</h4>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg> */}
                        <h4 className="counterr">{elem.counter}</h4>
                        <h4 className="arrow">&gt;</h4>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg> */}
                    </div>
                    <h4 className="single-line-small">{elem.items.price * elem.counter} JOD</h4>
                    <h4 className="x" onClick={deleteCart} id={elem._id}>X</h4>
                </div>
            )
        }
    })}
    </div>
  )
}

export default Cart;