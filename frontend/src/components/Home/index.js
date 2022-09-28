import "./style.css"
import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NewContext } from "../../App";
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
                return elem.gender === "female";
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
            console.log(result);
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
        console.log(loggerId);
        console.log(comment);
        console.log(productID);
        axios.post(`http://localhost:5000/comments/add/${productID}`, {
            comment: comment,
            commenter: loggerId,
            image: profilePic,
            firstName: loggerName
        })
        .then((result) => {
            console.log(result);
            setShowInputComment(false)
            setWhyNot(true)
            // getallProducts()
        })
        .catch((err) => {
            console.log(err.response);
        })
    }

    if(!showTheProduct){
        if(age <= 16){
            return (
                <>
            <>
            


                <div>
                {kidsTop.map((elem, i) => {
                    return(
                       <div className="porduct" key={i}>
                        <h2 className="porduct-text">{elem.name}</h2>
                        <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
        
                        <div className = "text-cart-container">
                        <h2 className="porduct-text">{elem.price}</h2>
                        <button>Add To Shopping Cart</button>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                        </div>
                        </div> 
                    )
                }) }
                </div>
                <div>
                {kidsBottom.map((elem, i) => {
                    return(
                       <div className="porduct"  key={i}>
                        <h2 className="porduct-text">{elem.name}</h2>
                        <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
                        
                        <div className = "text-cart-container">
                        <h2 className="porduct-text">{elem.price}</h2>
                        <button>Add To Shopping Cart</button>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                        </div>
                        </div> 
                    )
                }) }
                </div>
                <div>
                {kidsShoes.map((elem, i) => {
                    return(
                       <div className="porduct"  key={i}>
                        <h2 className="porduct-text">{elem.name}</h2>
                        <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
                        <div className = "text-cart-container">
        
                        <h2 className="porduct-text">{elem.price}</h2>
                        <button>Add To Shopping Cart</button>
                        {/* <svg xmlns= "http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                        </div>
                        </div> 
                    )
                }) }
                </div>
                </>
            </>
            )
        }else if(gender === "male"){
            return (
                <>

                <div>
                {menTop.map((elem, i) => {
                    return(
                       <div className="porduct" key={i}>
                        <h2 className="porduct-text">{elem.name}</h2>
                        <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
        
                        <div className = "text-cart-container">
                        <h2 className="porduct-text">{elem.price}</h2>
                        <button>Add To Shopping Cart</button>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="160" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                        </div>
                        </div> 
                    )
                }) }
                </div>
                <div>
                {menBottom.map((elem, i) => {
                    return(
                       <div className="porduct"  key={i}>
                        <h2 className="porduct-text">{elem.name}</h2>
                        <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
                        
                        <div className = "text-cart-container">
                        <h2 className="porduct-text">{elem.price}</h2>
                        <button>Add To Shopping Cart</button>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                        </div>
                        </div> 
                    )
                }) }
                </div>
                <div>
                {menShoes.map((elem, i) => {
                    return(
                       <div className="porduct"  key={i}>
                        <h2 className="porduct-text">{elem.name}</h2>
                        <img onClick={showProduct} id={elem._id} className="porductimg" src={elem.image} />
                        <div className = "text-cart-container">
        
                        <h2 className="porduct-text">{elem.price}</h2>
                        <button>Add To Shopping Cart</button>
                        {/* <svg xmlns= "http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" ewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> */}
                        </div>
                        </div> 
                    )
                }) }
                </div>
                </>
            )        }
            else if(gender === "female"){
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
                )    }
    }

}

export default Home;