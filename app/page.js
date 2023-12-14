"use client"
import React, { useEffect, useState } from 'react';
import Home from '../app/components/Home';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import axios from 'axios';
import { CartProvider } from './components/ContextReducer';



const Page = () => {
  const [search, setsearch] = useState("")
  const [fooddata, setFooddata] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchFoodData = async () => {
    try {
      const response = await axios.post('https://food-api-theta.vercel.app/api/fooddata');

      if (response.data.length >= 2) {
        console.log(response.data[0], response.data[1]); // Check the structure of response.data

        // Assuming response.data[0] contains an object with 'CategoryName' property
        setCategory(response.data[0]); // Setting category with response.data[0]
        setFooddata(response.data[1]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  return (
<CartProvider>
    <>

      <Navbar />
      <div>
      <div id="carouselExampleFade"  className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner" id='curousel'>
  <div className="carousel-caption d-none d-md-block" style={{zIndex:"11"}}>
  <div className="form-inline ">
    <input className="form-control mr-sm-2 w-50 d-inline-block bg-slate-500 gap-5 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=> setsearch(e.target.value)}/>
   
  </div>


      </div>
    <div className="carousel-item active"style={{objectFit:"cover"}}>
      <img style={{filter:"brightness(50%)",objectFit:"cover"}} src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img  style={{filter:"brightness(50%)",objectFit:"cover"}} src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img  style={{filter:"brightness(50%)",objectFit:"cover"}} src="https://source.unsplash.com/random/900×700/?momos" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
{console.log(search)}
      </div>
      <div className='container '>
        {category.length > 0 ? (
          category.map((data, index) => (
            <div className='row mt-3' key={index}>
               <div className='fs-4 m-3 fw-bold'>{data.CategoryName}</div>
              <hr />
              {fooddata.length > 0 &&
                fooddata
                  .filter((foodata) => (foodata.CategoryName === data.CategoryName)&&foodata.name.toLowerCase().includes(search.toLocaleLowerCase()))
                  .map((itdata, idx) => (
                    <div className='col-12 col-md-6 col-lg-4' key={idx}>
                    <Home fooditem={itdata}
                    option = {itdata.options[0]}
                  
                    
                    ></Home>
                    </div>
                  ))}
            </div>
          ))
        ) : (
          <div>No categories found!</div>
        )}
      </div>
    
    </>
    </CartProvider>
  );
  
};

export default Page;
