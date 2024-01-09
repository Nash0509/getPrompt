'use client'

import React, {useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import { FaClipboard,FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {toast} from 'react-toastify';

const page = () => {

    const router = usePathname();
    const [card, setCard] = useState([]);
    const [down, setDown] = useState(0);
    
    useEffect(() => {
     
      async function getData() {

        console.log("I reached here!...");
        console.log(router.split('/')[2])
 
       await fetch(`https://getprompt-api.onrender.com/cards1/${router.split('/')[2]}`, {
         method : 'GET',
         headers : {
             'Content-Type': 'application/json',
         }
      })
      .then((res) => res.json())
      .then((res) => {
       console.log(res);
       setCard(res);
      })
      .catch((err) => {
         alert("Error from the fetchCard function : " + err.message);
      })
 
      }
      getData();
 
   }, [])

   async function handleClip(prompt) {

    await navigator.clipboard.writeText(prompt);
    toast.success("Copied to the clipboard...")

 }

 async function handleLike() {

  setDown(0);

   await fetch('https://getprompt-api.onrender.com/upvote', {

     method : 'PATCH',
     headers : {
      'Content-Type': 'application/json',
     },
     body : JSON.stringify({
      id : router.split('/')[2],
     })

   })
   .then((res) => res.json())
   .then((res) => {
    toast.success("Upvoted!");
   })
   .catch((err) => alert(err.message));

  }

 async function handledis() {

   if(down == 1) {
    return ;
   }
   setDown(1);

   await fetch('https://getprompt-api.onrender.com/downvote', {

     method : 'PATCH',
     headers : {
      'Content-Type': 'application/json',
     },
     body : JSON.stringify({
      id : router.split('/')[2],
     })

   })
   .then((res) => res.json())
   .then((res) => {
    toast.success("Downvoted!");
   })
   .catch((err) => alert(err.message));

 }

  return (
    <div className='h-[90vh] flex justify-center flex-col' style={{alignItems : 'center'}}>
      <p className='mb-[2rem] text-[2rem]'>The prompt</p>
      <div className='flex' style={{alignItems : 'center'}}>
     {
      (card.length == 0) ? <div>Loading the prompt...</div>    : card.map((c, index) => {
        return (
         <div className='border rounded shadow-lg w-[30vw] text-center p-[2rem] relative min-w-[60vw] max-w-[80vw]'>
           <p className='bg-[]'>Type : {c.type}</p><br />
           <p>Prompt : {c.prompt}</p><br />
          <p>Discription: {c.dis}</p><br />
         <div className='flex' style={{alignItems:'center'}}>

         <div className='flex bg-[rgb(120,120,120)] text-[white] rounded p-3' style={{alignItems:'center'}}>
         
         <div className='flex' style={{alignItems:'center'}}>
         {c.likes}   &nbsp;
         <FaArrowUp size={25}  className='mt-[0.4rem] hover:text-[rgb(100,100,100)] hover:cursor-pointer' title='upvote' onClick={handleLike}/>
         </div>
         
         &nbsp;
         <FaArrowDown size={25}  className='mt-[0.4rem] hover:text-[rgb(100,100,100)] hover:cursor-pointer' title='downvote' onClick={handledis}/>
  
         </div>
         <FaClipboard className='text-black cursor-pointer hover:text-[green] absolute right-6' onClick={()=> handleClip(c.prompt)} title='copy text'/>
         </div>
         </div>
        )
      })
    } 
      </div>
    </div>
  )
}

export default page