"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { CartProvider } from '../components/ContextReducer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const username = localStorage.getItem('username');
            if (!username) {
                console.log('Username not found in localStorage');
                return;
            }

            const response = await fetch("https://food-api-theta.vercel.app/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username
                })
            });
console.log(username)
            const data = await response.json();
            if (Array.isArray(data)) {
                setOrderData(data);
            } else {
                setOrderData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <CartProvider>
            <div >
                <Navbar />
                <div className='container '>
                    <div className='row  '>
                        {orderData && orderData.orderData && orderData.orderData.order_data ? (
                            orderData.orderData.order_data.slice(0).reverse().map((item, index) => (
                                <div key={index}>
                                    {item.map((arrayData, idx) => (
                                        <div key={idx} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{arrayData.qty}</span>
                                                        <span className='m-1'>{arrayData.size}</span>
                                                        {/* Assuming Order_date is available in arrayData */}
                                                        <span className='m-1'>{arrayData.Order_date}</span>
                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{arrayData.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                           <div className=' text-center '>
                            <h3 className='mt-5 fw-bold'>No order data available</h3></div>
                        )}
                    </div>
                </div>
            </div>
        </CartProvider>
    );
}
