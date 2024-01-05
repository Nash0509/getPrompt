'use client'
import React, {useEffect, useState} from 'react'


const page = () => {
 
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  async function handleLogin(e) {

     e.preventDefault();

     if(email === undefined || pass === undefined) {
      alert("Please enter all the required fields");
      return ;
     }

     if(localStorage.getItem('token')) {
      alert("You have already logged in");
      return ;
     }

     try {

        await fetch(`https://getprompt.onrender.com/login/${email}/${pass}`, {
          cache : 'no-store'
        }) 
        .then((res) => res.json())
        .then((res) => {

          if(res.statusCode === 404) {
            alert("No account found with this email...");
          }
          if(res.statusCode === 200) {
            alert("registered successfully..."+res.token);
            console.log("Registered successfully : "+res.token);
            localStorage.setItem("token", res.token);
          }
          else alert("Some error occured please try again");
          
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
         <h1 className='mb-[3rem] text-3xl'>LogIn</h1>
         <input type="email" placeholder='email@gmail.com' onChange={(e) => setEmail(e.target.value)} className='mb-[1rem] p-[0.5rem] rounded text-center text-black'/><br />
         <input type="password" placeholder='password' onChange={(e) => setPass(e.target.value)} className='my-[1rem] p-[0.5rem] rounded text-center text-black'/><br />
         <button onClick={(e) => handleLogin(e)} className='my-[1.5rem] bg-[blue] p-[0.5rem] rounded'><input type="submit" style={{display:'none'}}/>Register</button>
       </form>

     </div>
   </div>
 )
}

export default page