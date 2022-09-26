import React, {useState, useEffect, useContext} from "react";
import axios from "axios";

const Home = () => {
    const[products, setProducts] = useState([]);
    const[mensWear, setMenWear] = useState([]);
    const[menTop, setMenTop] = useState([]);
    const[menBottom, setMenBottom] = useState([]);
    const[menShoes, setMenShoes] = useState([])


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

        })
        .catch((err) => {
            console.log(err.response);
        })
    }
    useEffect(() => {
        getallProducts()
    }, [])

    return (
        <>
        {menTop.map((elem, i) => {
            return(
               <div>
                <h2>{elem.name}</h2>
                <img src={elem.image} />
                <h2>{elem.price}</h2>
                </div> 
            )
        }) }
        {menBottom.map((elem, i) => {
            return(
               <div>
                <h2>{elem.name}</h2>
                <img src={elem.image} />
                <h2>{elem.price}</h2>
                </div> 
            )
        }) }
        {menShoes.map((elem, i) => {
            return(
               <div>
                <h2>{elem.name}</h2>
                <img src={elem.image} />
                <h2>{elem.price}</h2>
                </div> 
            )
        }) }
        </>
    )
}

export default Home;