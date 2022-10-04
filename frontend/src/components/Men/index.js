import "./style.css"
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Footer from "../Footer";

import { NewContext } from "../../App";

function Men() {
    const navigate = useNavigate();
    const mensWear = useContext(NewContext).mensWear;
    const setMenWear = useContext(NewContext).setMenWear;
    const menTop = useContext(NewContext).menTop;
    const setMenTop = useContext(NewContext).setMenTop;
    const menBottom = useContext(NewContext).menBottom;
    const setMenBottom = useContext(NewContext).setMenBottom;
    const menShoes = useContext(NewContext).menShoes;
    const setMenShoes = useContext(NewContext).setMenShoes;
    const setShowTheProduct = useContext(NewContext).setShow;
    const setSingleProduct = useContext(NewContext).setSingleProduct;
    const setProductID = useContext(NewContext).setProductID;
    const showTheProduct = useContext(NewContext).show;
    const loggerId = useContext(NewContext).loggedInUserId;
    const userToken = useContext(NewContext).theToken;
    const cartItems = useContext(NewContext).cartItems;
    const setCartitems = useContext(NewContext).setCartitems;

    //



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

    const AddToCart = (e) => {

        axios.post('http://localhost:5000/carts/add', {
            items: e.target.className,
            user: loggerId,
        }, {
            headers: {
              authorization: "Bearer " + userToken,
            },
          })
        .then((result) => {
            setCartitems([...cartItems, result.data.product])
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //------------------------------PAGINATION MEN TOP-------------------------------\\


  const [itemNumber, setItemNumber] = useState(0)
  const itemPerPage = 4;
  const itemVisited = itemNumber * itemPerPage;
  const displayMenTop = menTop.slice(itemVisited, itemVisited + itemPerPage).map((elem, i) => {
    return(
        <div className="porduct" key={i}>
        <h2 className="porduct-text">{elem.name}</h2>
        <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />

        <div className = "text-cart-container">
        <h2 className="porduct-text">{elem.price} JOD</h2>
        <button className={elem._id} onClick={AddToCart}>Add To Shopping Cart</button>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
        </div>
        </div> 
    )
  })
  const itemCount = Math.ceil(menTop.length / itemPerPage);
  const changePage = ({selected}) => {
    setItemNumber(selected);
  }

      //------------------------------PAGINATION MEN BOTTOM-------------------------------\\
      const [menBottomNumber, setMenBottomNumber] = useState(0) 
      const menBottomPerPage = 4;
      const menBottomVisited = menBottomNumber * menBottomPerPage;
      const displayMenBottom = menBottom.slice(menBottomVisited, menBottomVisited + menBottomPerPage).map((elem, i) => {
        return(
            <div className="porduct" key={i}>
            <h2 className="porduct-text">{elem.name}</h2>
            <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
    
            <div className = "text-cart-container">
            <h2 className="porduct-text">{elem.price} JOD</h2>
            <button className={elem._id} onClick={AddToCart}>Add To Shopping Cart</button>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
            </div>
            </div> 
        )
      })
      const menBottomCount = Math.ceil(menBottom.length / menBottomPerPage);
      const changeMenBottom = ({selected}) => {
        setMenBottomNumber(selected);
      }


            //------------------------------PAGINATION MEN SHOES-------------------------------\\
            const [menShoesNumber, setMenShoesNumber] = useState(0) 
            const menShoesPerPage = 4;
            const menShoesVisited = menShoesNumber * menShoesPerPage;
            const displayMenShoes = menShoes.slice(menShoesVisited, menShoesVisited + menShoesPerPage).map((elem, i) => {
              return(
                  <div className="porduct" key={i}>
                  <h2 className="porduct-text">{elem.name}</h2>
                  <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
          
                  <div className = "text-cart-container">
                  <h2 className="porduct-text">{elem.price} JOD</h2>
                  <button className={elem._id} onClick={AddToCart}>Add To Shopping Cart</button>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                  </div>
                  </div> 
              )
            })
            const menShoesCount = Math.ceil(menShoes.length / menShoesPerPage);
            const changeMenShoes = ({selected}) => {
              setMenShoesNumber(selected);
            }



    if(!showTheProduct){

    return (
        <>

                <div className="box-div">
                    {displayMenTop}
                   
                </div>
                <ReactPaginate
                        previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
                        nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
                        pageCount = {itemCount}
                        onPageChange={changePage}
                        containerClassName={"container"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"nxt"}
                        disabledClassName={"dis"}
                        activeClassName={"act"}
    
    />
                <div className="box-div">
                 {displayMenBottom}
                </div>
                <ReactPaginate
                        previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
                        nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
                        pageCount = {menBottomCount}
                        onPageChange={changeMenBottom}
                        containerClassName={"container"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"nxt"}
                        disabledClassName={"dis"}
                        activeClassName={"act"}
    
    />

                <div className="box-div">
                    {displayMenShoes}
                </div>
                <ReactPaginate
                        previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
                        nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
                        pageCount = {menShoesCount}
                        onPageChange={changeMenShoes}
                        containerClassName={"container"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"nxt"}
                        disabledClassName={"dis"}
                        activeClassName={"act"}
    
    />
            <Footer />

                </>
    )
            }
}

export default Men
