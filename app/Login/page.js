"use client"

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import "./login.css"

import { useRouter } from 'next/navigation';

const Login= () => {
 let router= useRouter();
  // Initialize state to manage form data
  const [formData, setFormData] = useState({
  
    username: '',
  
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
      const response = await axios.post('https://food-api-theta.vercel.app/login', formData);

      // Assuming your server sends a response like { message: 'Registration successful' }
      if (response.status === 200) {
        console.log('Registration successful');
        console.log('User data:', response.data);
     

        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(localStorage.getItem("user"))
        router.push("/");
       
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
            <input type="username" name='username' value={formData.username} onChange={handleChange} placeholder="Email" />
        </div>
       
        <div className="input">
            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder="Password"/>
        </div>
    <button type="submit" className="btn1">  Login</button>
    <p> Create an Account?
    <Link href="SignUp">Login</Link>
    </p>
    </form>
</div>
</div>
</>

   
  )
}

export default Login
