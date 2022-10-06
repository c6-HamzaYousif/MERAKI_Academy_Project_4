import "./style.css"
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NewContext } from "../../App";
import ReactPaginate from "react-paginate";

const Search = () => {
    
    const searchArray = useContext(NewContext).searchArray;
    const navigate = useNavigate();
    const setShowTheProduct = useContext(NewContext).setShow;
    const setSingleProduct = useContext(NewContext).setSingleProduct;
    const setProductID = useContext(NewContext).setProductID;
    const loggerId = useContext(NewContext).loggedInUserId;
    const userToken = useContext(NewContext).theToken;
    const cartItems = useContext(NewContext).cartItems;
    const setCartitems = useContext(NewContext).setCartitems;
    const [width, setWidth] = useState("big")

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


            //------------------------------PAGINATION SEARCH-------------------------------\\


            const [SearchNumber, setSearchNumber] = useState(0)
            let SearchPerPage = 2;
            if(window.innerWidth>800){
                  SearchPerPage = 4;
            }else{
                 SearchPerPage = 1;
            } 
            
            const SearchVisited = SearchNumber * SearchPerPage;
            const displaySearch = searchArray.slice(SearchVisited, SearchVisited + SearchPerPage).map((elem, i) => {
              return(
                <div className="porduct" key={i}>
                <h2 className="porduct-text">{elem.name}</h2>
                <img  onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} /> 
                
                <div className = "text-cart-container">
                <h2 className="text-cart-txt">{elem.price} JOD</h2>
                <button className={elem._id} onClick={AddToCart}>Add To Cart</button>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                </div>
                </div>  
              )
            })
            const SearchCount = Math.ceil(searchArray.length / SearchPerPage);
            const changeSearch = ({selected}) => {
              setSearchNumber(selected);
            }
  



    if(searchArray.length > 0){
        return (
            <div className="hoem-marg">
            <div className="box-div">
                {displaySearch}
            </div>
            <ReactPaginate
            previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
            nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
            pageCount = {SearchCount}
            onPageChange={changeSearch}
            containerClassName={"container"}
            previousLinkClassName={"prev"}
            nextLinkClassName={"nxt"}
            disabledClassName={"dis"}
            activeClassName={"act"}

/>
            </div>
          )
    }else{
        return <h1>No items matched your search</h1>
    }

  
}

export default Search