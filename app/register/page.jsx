'use client'
import React, {useEffect, useState} from 'react'

const page = () => {

   const [email, setEmail] = useState('');
   const [pass, setPass] = useState('');

   async function handleRegister(e) {

    e.preventDefault();

    try {

      if(email === '' || pass === '') {
        alert("Please enter all the required information...");
        return ;
      }

      if(localStorage.getItem('token')) {
        alert("You have already registered...");
        return ;
      }

       await fetch(`http://localhost:3001/register/${email}/${pass}`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        }
       },{
         cache : 'no-store'
       }) 
       .then((res) => res.json())
       .then((res) => {
         if(res.token === undefined) {
          alert("This email is already registered...");
         }
         else {
          alert("registered successfully..."+res.token);
          console.log("Registered successfully : "+res.token);
          localStorage.setItem('token', res.token);
         }
       })

    }
    catch (err) {
     console.log("An error has occurred");
     alert("An error cooured from the login from the frontend..." +err.message);
    }

 }

   return (
    <div className='h-[90vh]  flex justify-center pt-[25vh]' style={{backgroundColor:'rgb(253, 255, 247)'}}>
      <div className='bg-black text-white h-[45vh] p-[2rem] rounded shadow-md'>
        
        <form>
          <h1 className='mb-[3rem] text-3xl'>Register</h1>
          <input type="email" placeholder='email@gmail.com' onChange={(e) => setEmail(e.target.value)} className='mb-[1rem] p-[0.5rem] rounded text-center text-black'/><br />
          <input type="password" placeholder='password' onChange={(e) => setPass(e.target.value)} className='my-[1rem] p-[0.5rem] rounded text-center text-black'/><br />
          <button onClick={(e) => handleRegister(e)} className='my-[1.5rem] bg-[blue] p-[0.5rem] rounded'><input type="submit" style={{display:'none'}}/>Register</button>
        </form>
 
      </div>
    </div>
  )
}

export default page