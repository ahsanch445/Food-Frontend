"use client"

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import "./sign.css"

import { useRouter } from 'next/navigation';
useRouter
const Register = () => {
 let router= useRouter();
  // Initialize state to manage form data
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  });

  // Access Next.js router
  

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to your server using axios
      const response = await axios.post('https://food-api-theta.vercel.app/register', formData);

    
      if (response.status === 200 && response.data && response.data.message === 'Registration successful') {
        console.log('Registration successful');
      
       
        console.log(localStorage.getItem("user"))
        router.push("/Login");


        const email = formData.email;
        localStorage.setItem('email', email  );


      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <>

    <div className="main">
        <div className="wrapper">
        <form onClick={handleSubmit}>
            <h1>Login</h1>
           
            <div className="input">
                <input type="text" name='fullname' value={formData.fullname} onChange={handleChange} placeholder="Fullname" />
            </div>
            <div className="input">
                <input type="text" name='username' value={formData.username} onChange={handleChange} placeholder="Username" />
            </div>
            <div className="input">
                <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder="Email" />
            </div>
           
            <div className="input">
                <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder="Password"/>
            </div>
        <button type="submit" className="btn1">  Login</button>
        <p> Create an Account?
        <Link href="Login">Login</Link>
        </p>
        </form>
    </div>
    </div>
 
    </>
  );
};

export default Register;
