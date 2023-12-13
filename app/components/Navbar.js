"use client"
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Models from "../Models"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge } from 'react-bootstrap'
import Cart from "./Cart"
import { useCart } from './ContextReducer'
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let data =useCart()
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };



let router = useRouter()

const logHandler=()=>{
  localStorage.removeItem("user")
  router.push("/Login")
}


  return (
   
<nav className="navbar navbar-expand-lg bg-dark-success" id='nav'>
  <div className="container-fluid gap-3">
    <Link className="navbar-brand fs-1 fst-italic text-primary" href="/">GoFood</Link>
  
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse d-flex justify-between" id="navbarNav">
      <ul className="navbar-nav me-auto ">
       <li className='nav-item'>
          <Link className="nav-link active text-white fs-6 font-sans-arial" aria-current="page" href="/">Home</Link>
          
          </li>
          <div>
            <li className='nav-item'>
      {(localStorage.getItem("user"))? (
      <Link href="MyOrder" className='nav-link active text-white fs-6 font-sans-arial'>My Orders</Link>
      ) : (
      ""
      )}
      </li>
    </div>

          </ul>


    {(!localStorage.getItem("user"))?
       <div className='d-flex'>
        <Link className="btn bg-white text-success mx-3 fw-bold" href="SignUp">Sign Up</Link>
       
        <Link className="btn bg-white text-success fw-bold" href="Login">Login</Link>
       
        </div>
           :<div className='d-flex'> 
           <div   className= 'btn me-3 bg-white p-1 fw-bold px-2 ' onClick={toggleModal}>My card{" "}
       <Badge pill bg = "danger">{data.length}</Badge>
           
           </div>
<Models isOpen={isModalOpen} onClose={toggleModal} ><Cart></Cart></Models>
           <div className="btn me-3 bg-white text-danger fw-bold p-1 px-2"  onClick={logHandler}>Logout</div>
            </div>
      }
    </div>
  </div>
</nav>

  )
}

export default Navbar
