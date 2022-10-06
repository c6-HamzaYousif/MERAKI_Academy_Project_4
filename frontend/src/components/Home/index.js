import "./style.css"
import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NewContext } from "../../App";
import ReactPaginate from "react-paginate";
import Footer from "../Footer";

import Kids from "../Kids";
import Men from "../Men";
import Women from "../Women";
import Product from "../Product";

const Home = () => {
    


    const gender = useContext(NewContext).loggedInUserGender;
    const age = useContext(NewContext).loggedInUserAge;
    const showTheProduct = useContext(NewContext).show;
    const setShowTheProduct = useContext(NewContext).setShow; 
    const loggerId = useContext(NewContext).loggedInUserId;
    const loggerName = useContext(NewContext).loggerFirstName;
    const profilePic = useContext(NewContext).profilePicture;
    const navigate = useNavigate();

    const [test, setTest] = useState(false);

    
    const womenWear = useContext(NewContext).womenWear;
    const setWomenWear = useContext(NewContext).setWomenWear;
    const womenShoes = useContext(NewContext).womenShoes;
    const setWomenShoes = useContext(NewContext).setWomenShoes;
    const womenTop = useContext(NewContext).womenTop;
    const setWomenTop = useContext(NewContext).setWomenTop;
    const womenBottom = useContext(NewContext).womenBottom;
    const setWomenBottom = useContext(NewContext).setWomenBottom;
    const[whyNot, setWhyNot] = useState(false)

    const mensWear = useContext(NewContext).mensWear;
    const setMenWear = useContext(NewContext).setMenWear;
    const menTop = useContext(NewContext).menTop;
    const setMenTop = useContext(NewContext).setMenTop;
    const menBottom = useContext(NewContext).menBottom;
    const setMenBottom = useContext(NewContext).setMenBottom;
    const menShoes = useContext(NewContext).menShoes;
    const setMenShoes = useContext(NewContext).setMenShoes;

    const kidsWear = useContext(NewContext).kidsWear;
    const setKidsWear = useContext(NewContext).setKidsWear;
    const kidsTop = useContext(NewContext).kidsTop;
    const setKidsTop = useContext(NewContext).setKidsTop;
    const kidsBottom = useContext(NewContext).kidsBottom;
    const setKidsBottom = useContext(NewContext).setKidsBottom;
    const kidsShoes = useContext(NewContext).kidsShoes;
    const setKidsShoes = useContext(NewContext).setKidsShoes;
    //------------------------------------------------------------
    const productID = useContext(NewContext).productID;
    const setProductID = useContext(NewContext).setProductID;

    const singleProducts = useContext(NewContext).singleProducts;
    const setSingleProduct = useContext(NewContext).setSingleProduct;

    const addComment = useContext(NewContext).addComment;
    const setAddComment = useContext(NewContext).setAddComment;

    const showInputComment = useContext(NewContext).showInputComment;
    const setShowInputComment = useContext(NewContext).setShowInputComment; 

    const comment = useContext(NewContext).comment;
    const setCommment = useContext(NewContext).setCommment;
    const userToken = useContext(NewContext).theToken;
    const setCart = useContext(NewContext).setCart;
    const cart = useContext(NewContext).cart;
    const cartItems = useContext(NewContext).cartItems;
    const setCartitems = useContext(NewContext).setCartitems;
    const [counter, setCounter] = useState(0)



    const[products, setProducts] = useState([]);



    const getallProducts = () => {
        axios.get('http://localhost:5000/products')
        .then((result) => {
            const data = result.data.product;
            setProducts(data);
            const menClothes = (data.filter((elem, i) => {
                return elem.gender === "male";
            }))
            setMenWear(menClothes);

            const menTopClothes = menClothes.filter((elem, i) => {
                return elem.type === "top";
            })
            setMenTop(menTopClothes);

            const menBottomClothes = menClothes.filter((elem, i) => {
                return elem.type === "bottom";
            })
            setMenBottom(menBottomClothes);

            const menshooes = menClothes.filter((elem, i) => {
                return elem.type === "shoes";
            })
            setMenShoes(menshooes);
//---------------------------------------------------------------------------------
            const womenClothes = (data.filter((elem, i) => {
                return elem.gender === "female" && elem.ageRange === "adult";
            }))
            setWomenWear(womenClothes);

            const womenTopClothes = womenClothes.filter((elem, i) => {
                return elem.type === "top";
            })
            setWomenTop(womenTopClothes);

            const womenBottomClothes = womenClothes.filter((elem, i) => {
                return elem.type === "bottom";
            })
            setWomenBottom(womenBottomClothes);

            const womenshooes = womenClothes.filter((elem, i) => {
                return elem.type === "shoes";
            })
            setWomenShoes(womenshooes);
//-----------------------------------------------------------------------------------------
            const kidsClothes = (data.filter((elem, i) => {
                return elem.ageRange === "kids";
            }))
            setKidsWear(kidsClothes);

            const kidsTopClothes = kidsClothes.filter((elem, i) => {
                return elem.type === "top";
            })
            setKidsTop(kidsTopClothes);

            const kidsBottomClothes = kidsClothes.filter((elem, i) => {
                return elem.type === "bottom";
            })
            setKidsBottom(kidsBottomClothes);

            const kidsshooes = kidsClothes.filter((elem, i) => {
                return elem.type === "shoes";
            })
            setKidsShoes(kidsshooes);


        })
        .catch((err) => {
            console.log(err.response);
        })
    }

    const getAllComments = (e) => {
        const selectedProductId = e.target.id;
        axios.get(`http://localhost:5000/comments/${selectedProductId}`)
        .then((result) => {
            // console.log(result);
        })
        .catch((err) => {
            console.log("err");
        })
    }
    useEffect(() => {
        getallProducts()
    }, [])

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

    const handleCommentButton = () => {
        // if(!addComment){
            // setAddComment(true);
            setShowInputComment(true);
            // return(
            //     <input placeholder="Type your opinion about this product" />
            // )
        // }
    }
    const handleSubmitComment = () => {
 
        axios.post(`http://localhost:5000/comments/add/${productID}`, {
            comment: comment,
            commenter: loggerId,
            image: profilePic,
            firstName: loggerName
        })
        .then((result) => {
            // console.log(result);
            setShowInputComment(false)
            setWhyNot(true)
            // getallProducts()
        })
        .catch((err) => {
            console.log(err.response);
        })
    }

    //loggerId

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
            console.log(result);
            setCartitems([...cartItems, result.data.product])
        })
        .catch((err) => {
            console.log(err);
        })
    }
            //------------------------------PAGINATION WOMEN TOP-------------------------------\\


            const [WomenTopNumber, setWomenTopNumber] = useState(0) 
            const WomenTopPerPage = 4;
            const WomenTopVisited = WomenTopNumber * WomenTopPerPage;
            const displayWomenTop = womenTop.slice(WomenTopVisited, WomenTopVisited + WomenTopPerPage).map((elem, i) => {
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
            const WomenTopCount = Math.ceil(womenTop.length / WomenTopPerPage);
            const changeWomenTop = ({selected}) => {
              setWomenTopNumber(selected);
            }
    
          //------------------------------PAGINATION WOMEN BOTTOM-------------------------------\\
          const [WomenBottomNumber, setWomenBottomNumber] = useState(0) 
          const WomenBottomPerPage = 4;
          const WomenBottomVisited = WomenBottomNumber * WomenBottomPerPage;
          const displayWomenBottom = womenBottom.slice(WomenBottomVisited, WomenBottomVisited + WomenBottomPerPage).map((elem, i) => {
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
          const WomenBottomCount = Math.ceil(womenBottom.length / WomenBottomPerPage);
          const changeWomenBottom = ({selected}) => {
            setWomenBottomNumber(selected);
          }
    
    
                //------------------------------PAGINATION WOMEN SHOES-------------------------------\\
                const [WomenShoesNumber, setWomenShoesNumber] = useState(0) 
                const WomenShoesPerPage = 4;
                const WomenShoesVisited = WomenShoesNumber * WomenShoesPerPage;
                const displayWomenShoes = womenShoes.slice(WomenShoesVisited, WomenShoesVisited + WomenShoesPerPage).map((elem, i) => {
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
                const WomenShoesCount = Math.ceil(womenShoes.length / WomenShoesPerPage);
                const changeWomenShoes = ({selected}) => {
                  setWomenShoesNumber(selected);
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

         //------------------------------PAGINATION MEN TOP-------------------------------\\


  const [itemNumber, setItemNumber] = useState(0)
  const itemPerPage = 4;
  const itemVisited = itemNumber * itemPerPage;
  const displayMenTop = menTop.slice(itemVisited, itemVisited + itemPerPage).map((elem, i) => {
    return(
        <div className="porduct" key={i}>
            <h2 className="porduct-text">{elem.name}</h2>
            <div className="testtt">
                <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
            </div>
            <div className = "text-cart-container">
                <h2 className="text-cart-txt">{elem.price} JOD</h2>
                <button className={elem._id} onClick={AddToCart}>Add To Cart</button>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={elem._id} onClick={AddToCart} viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/></svg> */}
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
            <h2 className="text-cart-txt">{elem.price} JOD</h2>
            <button className={elem._id} onClick={AddToCart}>Add To Cart</button>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={elem._id} onClick={AddToCart} viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/></svg> */}
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
                        <h2 className="text-cart-txt">{elem.price} JOD</h2>
                        <button className={elem._id} onClick={AddToCart}>Add To Cart</button>
                        {/* <svg class={elem._id} onClick={AddToCart} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/></svg> */}
                    </div>
                  </div> 
              )
            })
            const menShoesCount = Math.ceil(menShoes.length / menShoesPerPage);
            const changeMenShoes = ({selected}) => {
              setMenShoesNumber(selected);
            }

    if(!showTheProduct){
        if(age <= 16){
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
        }else if(gender === "male"){
            return (
                <div className="hoem-marg">

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

                </div>
            )        }
            else if(gender === "female"){
                return (
                    <div className="hoem-marg">
        <div className="box-div">
            {displayWomenTop}
        </div>
        <ReactPaginate
                        previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
                        nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
                        pageCount = {WomenTopCount}
                        onPageChange={changeWomenTop}
                        containerClassName={"container"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"nxt"}
                        disabledClassName={"dis"}
                        activeClassName={"act"}
    
    />

        <div className="box-div">
        {displayWomenBottom}
        </div>
        <ReactPaginate
                        previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
                        nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
                        pageCount = {WomenBottomCount}
                        onPageChange={changeWomenBottom}
                        containerClassName={"container"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"nxt"}
                        disabledClassName={"dis"}
                        activeClassName={"act"}
    
    />

        <div className="box-div">
        {displayWomenShoes}
        </div>
        <ReactPaginate
                        previousLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
                        nextLabel = {<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
                        pageCount = {WomenShoesCount}
                        onPageChange={changeWomenShoes}
                        containerClassName={"container"}
                        previousLinkClassName={"prev"}
                        nextLinkClassName={"nxt"}
                        disabledClassName={"dis"}
                        activeClassName={"act"}
    
    />
            <Footer />

        </div>
                )    }
    }

}

export default Home;