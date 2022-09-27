import "./style.css"
import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { NewContext } from "../../App";

const Home = () => {
    const gender = useContext(NewContext).loggedInUserGender;
    const age = useContext(NewContext).loggedInUserAge;
    const showTheProduct = useContext(NewContext).show;
    const setShowTheProduct = useContext(NewContext).setShow;
    const loggerId = useContext(NewContext).loggedInUserId;
    const loggerName = useContext(NewContext).loggerFirstName;
    const profilePic = useContext(NewContext).profilePicture;



    const[products, setProducts] = useState([]);
    const[singleProducts, setSingleProduct] = useState([]);
    const[addComment, setAddComment] = useState(false);
    const [showInputComment, setShowInputComment] = useState(false);
    const [comment, setCommment] = useState('')
    const [productID, setProductID] = useState('')
    
    const[mensWear, setMenWear] = useState([]);
    const[menTop, setMenTop] = useState([]);
    const[menBottom, setMenBottom] = useState([]);
    const[menShoes, setMenShoes] = useState([]);

    const[womenWear, setWomenWear] = useState([]);
    const[womenShoes, setWomenShoes] = useState([]);
    const[womenTop, setWomenTop] = useState([]);
    const[womenBottom, setWomenBottom] = useState([]);

    const[kidsWear, setKidsWear] = useState([]);
    const[kidsTop, setKidsTop] = useState([]);
    const[kidsBottom, setKidsBottom] = useState([]);
    const[kidsShoes, setKidsShoes] = useState([]);


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
    useEffect(() => {
        getallProducts()
    }, [])

    const showProduct = (e) => {
        const selectedProductId = e.target.id;
        setProductID(selectedProductId);
        axios.get(`http://localhost:5000/products/${selectedProductId}`)
        .then((result) => {
            console.log(result.data.product);
            setSingleProduct(result.data.product)
            setShowTheProduct(true)
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
            // getallProducts()
        })
        .catch((err) => {
            console.log(err.response);
        })
    }

    if(!showTheProduct){
        if(age <= 16){
            return <div>kid</div>
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
                        <img className="porductimg" src={elem.image} />
                        
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
                        <img className="porductimg" src={elem.image} />
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
            )
        }else if(gender === "female"){
    
        return (
            <>
            <div>
            {womenTop.map((elem, i) => {
                return(
                   <div className="porduct" key={i}>
                    <h2 className="porduct-text">{elem.name}</h2>
                    <img className="porductimg" src={elem.image} />
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
                    <img className="porductimg" src={elem.image} />
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
                    <img className="porductimg" src={elem.image} />
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
    }else{
        return (
            <div className="big-container">
                <div className="first-small-container">
                     <img className="first-small-container-img" src={singleProducts[0].image} />
                </div>

             <div className="second-small-container">
                <div className="first-baby">
                    <h2>Product Name: {singleProducts[0].name}</h2>
                    <h2>Available Sizes: 
                    {singleProducts[0].size.map((elem, i) => {
                        if(i<(singleProducts[0].size.length) - 1){
                         return <span className = "prod-span" key={i}>{elem},</span>
                     }else{
                           return <span className = "prod-span" key={i}>{elem}</span>
                     }
                    })}
                    </h2>
                    <h2>Seasons: 
                    {singleProducts[0].season.map((elem, i) => {
                        return <span className = "prod-span" key={i}>{elem}</span>
                 })}
                 </h2>
                 <h2>Price: {singleProducts[0].price}</h2>
                </div>
                <div className="second-baby">

                <button onClick={handleCommentButton}>Add a comment</button>
                 <br/>
                 {showInputComment && 
                 <>
                 <textarea onChange={(e) => {setCommment(e.target.value)}} placeholder="Type your opinion about this product" />
                 <button onClick={handleSubmitComment}>Submit</button>
                 <button onClick={() => {setShowInputComment(false)}}>Cancel</button>
                 </>
                 }

                {singleProducts[0].comments.map((elem, i) => {

                    return (
                        <div className="comment-box">
                        <div className="small-comment-box">
                            <img className="comment-pic" src= {elem.image} />
                            <h4 className = "comment-text-name">{elem.firstName}</h4>
                        </div>
                        <div >
                            <h4 className = "comment-text-comment">{elem.comment}</h4>
                        </div>    
                    </div>
                    )
                 })}

                </div>
            </div>
                
            </div>
        )
    }

}

export default Home;