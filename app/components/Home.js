"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CartProvider, useCart,useCartDispatch } from './ContextReducer';
function home(props) {
  let priceRef = useRef() 
  let usecartdata =useCart()
let dispatch = useCartDispatch()
  let data = props.option
  let obejdata = Object.keys(data)
  var  foodItem= props.fooditem;
  const [qty, setqty] = useState(1)
  const [size, setsize] = useState("")

  const handleAddToCart = async () => {
    let food = []
    for (const item of usecartdata) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalprice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalprice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalprice, qty: qty, size: size })


    // setBtnEnable(true)

  }





















  let finalprice = qty * parseInt(data[size])
  useEffect(() => {
setsize(priceRef.current.value)
  
  },[])
  






 
  return (
    <CartProvider>

    <div className='mb-3'><div className="card object-cover "  style={{"width":"18rem","maxHeight":"361px"}}>
    <img style={{height:"150px",objectFit:"fill"}} src={foodItem.img} class="card-img-top " alt="..."/>
    <div className="card-body">
      <h5 className="card-title">{foodItem.name}</h5>
    
    
  
    </div>
  
    <div className="container w-100">
      <select className='m-2  h-100 bg-success' onChange={(e)=>setqty(e.target.value)}  > 
  {Array.from(Array(6),(e,i)=>{
    return <option value={i+1} key={i+1}>{i+1}</option>
  })}
  
      </select>
    <select className="m-2  h-100 bg-success"  ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
      {obejdata.map((data)=>(
<option key={data} value={data}>{data}</option>
      )
       
      )}
    </select>
<div className=' d-inline-block fw-bold'>Rs{finalprice}/</div>

  </div>
  <hr />

  <button onClick={ handleAddToCart} style={{fontWeight:"600",height:"40px",justifyContent:"center ",width:"50%"}} className='btn btn-success ms-1 me-5 text-center  mb-1 text-black'>Add to Cart</button>
 
  </div></div>
  </CartProvider>
  )
}

export default home