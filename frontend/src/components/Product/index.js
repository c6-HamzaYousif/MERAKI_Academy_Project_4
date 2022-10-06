import "./style.css"
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
                         return <span className = "prod-span" key={i}>{elem} ,</span>
                     }else{
                           return <span className = "prod-span" key={i}>{elem}</span>
                     }
                    })}
                    </h2>
                    <h2>Seasons: 
                    {singleProducts[0].season.map((elem, i) => {
                        if(i<(singleProducts[0].season.length) - 1){
                            return <span className = "prod-span" key={i}>{elem} ,</span>
                        }else{
                              return <span className = "prod-span" key={i}>{elem}</span>
                        }
                        // return <span className = "prod-span" key={i}>{elem}</span>
                 })}
                 </h2>
                 <h2>Price: {singleProducts[0].price} JOD</h2>
                </div>
                <div className="second-baby">

                <button className="comment_btn" onClick={handleCommentButton}>Add a comment</button>
                 <br/>
                 {showInputComment && 
                 <div className="comment-placeholder-container">
                 <textarea className="txtArea_cmnt" onChange={(e) => {setCommment(e.target.value)}} placeholder="Type your opinion about this product" />
                 <button className="comment_btnn" onClick={handleSubmitComment}>Submit</button>
                 <button className="comment_btnn" onClick={() => {setShowInputComment(false)}}>Cancel</button>
                 </div>
                 }

                {singleProducts[0].comments.map((elem, i) => {

                    return (
                        <div className="comment-box">
                        <div className="small-comment-box">
                            <img className="comment-pic" src= {elem.image} />
                        </div>
                        <div className="comment-space">
                            <h4 className = "comment-text-name">{elem.firstName}</h4>
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