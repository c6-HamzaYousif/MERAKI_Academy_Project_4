import "./style.css"
import React, {useState, useEffect, useContext} from "react";
import { NewContext } from "../../App";
import axios from 'axios';


const Order = () => {
  const loggerId = useContext(NewContext).loggedInUserId;
  const[orders, setOrders] = useState([]);
  const getOrders = () => {
    axios.get(`http://localhost:5000/orders/${loggerId}`)
    .then((result) => {
      if(result){
      console.log(result.data);
      setOrders(result.data)
      console.log(orders);
    }
    })
    .catch((err) => {
      console.log("err");
    })
  }
  useEffect(() => {
    getOrders()
  },[])
  return (
    <div className='order'>
      <div className="order-header">
            <h4>Order Number</h4>
            <h4>Product</h4>
            <h4>Desciption</h4>
            <h4>Quantity</h4>
            <h4>Price</h4>
            <h4>Order's date &amp;  time</h4>

        </div>
      {orders && orders.map((elem, i) =>{
        return(
          <div className="single-order">
            <h4>Order #{i+1} </h4>
            <div>
              <img src={elem.cart.items.image} />
            </div>
              <h4>{elem.cart.items.name}</h4>
              <h4>{elem.createdAt.split('T')[0]}</h4>
              <h4>{elem.createdAt.split('T')[1].split('.')[0]}</h4>
              <h4>*{elem.cart.counter}</h4>
              <h4>{elem.cart.counter * elem.cart.items.price}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default Order