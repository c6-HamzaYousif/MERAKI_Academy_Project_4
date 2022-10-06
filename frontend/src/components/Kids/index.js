import "./style.css"
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { NewContext } from "../../App";
import Footer from "../Footer";



function Kids() {
  const navigate = useNavigate();
  const kidsWear = useContext(NewContext).kidsWear;
  const setKidsWear = useContext(NewContext).setKidsWear;
  const kidsTop = useContext(NewContext).kidsTop;
  const setKidsTop = useContext(NewContext).setKidsTop;
  const kidsBottom = useContext(NewContext).kidsBottom;
  const setKidsBottom = useContext(NewContext).setKidsBottom;
  const kidsShoes = useContext(NewContext).kidsShoes;
  const setKidsShoes = useContext(NewContext).setKidsShoes;
  const setShowTheProduct = useContext(NewContext).setShow;
  const showTheProduct = useContext(NewContext).show;

  const setSingleProduct = useContext(NewContext).setSingleProduct;
  const setProductID = useContext(NewContext).setProductID;
  const loggerId = useContext(NewContext).loggedInUserId;

  const userToken = useContext(NewContext).theToken;
  const cartItems = useContext(NewContext).cartItems;
  const setCartitems = useContext(NewContext).setCartitems;



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

        //------------------------------PAGINATION KIDS TOP-------------------------------\\


        const [KidsTopNumber, setKidsTopNumber] = useState(0) 
        const KidsTopPerPage = 4;
        const KidsTopVisited = KidsTopNumber * KidsTopPerPage;
        const displayKidsTop = kidsTop.slice(KidsTopVisited, KidsTopVisited + KidsTopPerPage).map((elem, i) => {
          return(
              <div className="porduct" key={i}>
              <h2 className="porduct-text">{elem.name}</h2>
              <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
      
              <div className = "text-cart-container">
              <h2 className="text-cart-txt">{elem.price} JOD</h2>
              <button className={elem._id} onClick={AddToCart}>Add To Cart</button>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
              </div>
              </div> 
          )
        })
        const KidsTopCount = Math.ceil(kidsTop.length / KidsTopPerPage);
        const changeKidsTop = ({selected}) => {
          setKidsTopNumber(selected);
        }

      //------------------------------PAGINATION KIDS BOTTOM-------------------------------\\
      const [KidsBottomNumber, setKidsBottomNumber] = useState(0) 
      const KidsBottomPerPage = 4;
      const KidsBottomVisited = KidsBottomNumber * KidsBottomPerPage;
      const displayKidsBottom = kidsBottom.slice(KidsBottomVisited, KidsBottomVisited + KidsBottomPerPage).map((elem, i) => {
        return(
            <div className="porduct" key={i}>
            <h2 className="porduct-text">{elem.name}</h2>
            <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
    
            <div className = "text-cart-container">
            <h2 className="text-cart-txt">{elem.price} JOD</h2>
            <button className={elem._id} onClick={AddToCart}>Add To Cart</button>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
            </div>
            </div> 
        )
      })
      const KidsBottomCount = Math.ceil(kidsBottom.length / KidsBottomPerPage);
      const changeKidsBottom = ({selected}) => {
        setKidsBottomNumber(selected);
      }


            //------------------------------PAGINATION KIDS SHOES-------------------------------\\
            const [KidsShoesNumber, setKidsShoesNumber] = useState(0) 
            const KidsShoesPerPage = 4;
            const KidsShoesVisited = KidsShoesNumber * KidsShoesPerPage;
            const displayKidsShoes = kidsShoes.slice(KidsShoesVisited, KidsShoesVisited + KidsShoesPerPage).map((elem, i) => {
              return(
                  <div className="porduct" key={i}>
                  <h2 className="porduct-text">{elem.name}</h2>
                  <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
          
                  <div className = "text-cart-container">
                  <h2 className="text-cart-txt">{elem.price} JOD</h2>
                  <button className={elem._id} onClick={AddToCart}>Add To Cart</button>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                  </div>
                  </div> 
              )
            })
            const KidsShoesCount = Math.ceil(kidsShoes.length / KidsShoesPerPage);
            const changeKidsShoes = ({selected}) => {
              setKidsShoesNumber(selected);
            }

if(!showTheProduct){
  return (
    <div className="hoem-marg">
        <div className="box-div">
            {displayKidsTop}
        </div>
        <ReactPaginate
                        previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
                        nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
                        pageCount = {KidsTopCount}
                        onPageChange={changeKidsTop}
                        containerClassName={"container"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"nxt"}
                        disabledClassName={"dis"}
                        activeClassName={"act"}
    
    />

        <div className="box-div">
        {displayKidsBottom}
        </div>
        <ReactPaginate
                        previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
                        nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
                        pageCount = {KidsBottomCount}
                        onPageChange={changeKidsBottom}
                        containerClassName={"container"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"nxt"}
                        disabledClassName={"dis"}
                        activeClassName={"act"}
    
    />

        <div className="box-div">
        {displayKidsShoes}
        </div>
        <ReactPaginate
                        previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
                        nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
                        pageCount = {KidsShoesCount}
                        onPageChange={changeKidsShoes}
                        containerClassName={"container"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"nxt"}
                        disabledClassName={"dis"}
                        activeClassName={"act"}
    
    />
       
        <Footer />
        </div>
  )
              }
}

export default Kids
