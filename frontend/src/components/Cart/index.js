import "./style.css"
import React, {useContext, useEffect, useState} from "react";
import {NewContext} from '../../App'
import axios from "axios";


const Cart = () => {
    const cart = useContext(NewContext).cart;
    const loggerId = useContext(NewContext).loggedInUserId;
    const userToken = useContext(NewContext).theToken;
    const [cartItems, setCartitems] = useState([]);

    const getCarts = () => {
        axios.get(`http://localhost:5000/carts/${loggerId}`, {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
        .then((result) => {
            console.log(result.data.product);
            setCartitems(result.data.product);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        getCarts()
    }, [])

  return (
    <div className='cartt'>
        <div className="cart-header">
            <h4>Product</h4>
            <h4>Desciption</h4>
            <h4>Quantity</h4>
            <h4>Price</h4>
            <h4>Remove</h4>
        </div>
    {cartItems.map((elem, i) => {
        if(!elem.isOrdered){
            return(
                <div>
                    <h4>{elem.items.name}</h4>
                    <h4>{elem.items.price}</h4>
                    <img className="cart-prod-img" src={elem.items.image} />
                </div>
            )
        }
    })}
    </div>
  )
}

export default Cart;