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
            <h4 className="or-head-sml">Order Number</h4>
            <h4 className="or-head-med">Product</h4>
            <h4 className="or-head-big">Desciption</h4>
            <h4 className="or-head-sml">Quantity</h4>
            <h4 className="or-head-sml">Price</h4>
            <h4 className="or-head-med">Order's date</h4>
            {/* <h4 className="or-head-med">Order's date &amp;  time</h4> */}


        </div>
      {orders && orders.map((elem, i) =>{
        return(
          <div className="single-order">
            <h4 className="or-head-sml">Order #{i+1} </h4>
            <div className="or-head-med">
              <img className="order-img" src={elem.cart.items.image} />
            </div>
              <h4 className="or-head-big">{elem.cart.items.name}</h4>
              <h4 className="or-head-sml">{elem.cart.counter}</h4>
              <h4 className="or-head-sml">{elem.cart.counter * elem.cart.items.price} JOD</h4>
              <div className="or-head-med">
                <h4>{elem.createdAt.split('T')[0]}</h4>
                 {/* <h4>{elem.createdAt.split('T')[1].split('.')[0]}</h4> */}
              </div>
              
          </div>
        )
      })}
    </div>
  )
}

export default Order