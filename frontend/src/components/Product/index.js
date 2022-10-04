import axios from 'axios';
import React, {useState, useEffect, useContext} from "react";
import { NewContext } from "../../App";


const Product = () => {
  const loggerId = useContext(NewContext).loggedInUserId;
  const setShowInputComment = useContext(NewContext).setShowInputComment; 
  const comment = useContext(NewContext).comment;
  const loggerName = useContext(NewContext).loggerFirstName;
  const profilePic = useContext(NewContext).profilePicture;
  const productID = useContext(NewContext).productID;
  const singleProducts = useContext(NewContext).singleProducts;
  const showInputComment = useContext(NewContext).showInputComment;
  const setCommment = useContext(NewContext).setCommment;





const handleCommentButton = () => {
        setShowInputComment(true);
}
const handleSubmitComment = () => {
    // console.log(loggerId);
    // console.log(comment);
    // console.log(productID);
    axios.post(`http://localhost:5000/comments/add/${productID}`, {
        comment: comment,
        commenter: loggerId,
        image: profilePic,
        firstName: loggerName
    })
    .then((result) => {
        console.log(result.data.newVal);
        console.log(singleProducts);
        singleProducts[0].comments.unshift(result.data.newVal)
        setShowInputComment(false)
        // getallProducts()
    })
    .catch((err) => {
        console.log(err.response);
    })
}

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

export default Product