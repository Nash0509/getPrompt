'use client'

import React, {useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import { FaClipboard, FaEdit } from 'react-icons/fa';
import {toast} from 'react-toastify';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius : '5px',
  color : 'white'
};


const page = () => {

    const router = usePathname();
    const [card, setCard] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [dis, setDis] = useState('No discription to show');
    const [prompt, setPrompt] = useState('');
    
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

 async function handleName() {

  if(prompt === '') {
      toast.warning("please change something...");
      return ;
  }

  await fetch('https://getprompt-api.onrender.com/editprompt', {
      method : 'PATCH',
      headers : {
          'Content-Type': 'application/json',
      },
      body : JSON.stringify({
          id : router.split('/')[2],
          dis : dis,
          prompt : prompt,
      })
  })
  .then((res) => res.json())
  .then((res) => {
      toast.success("Prompt updated successfully...");
      setOpen(false);
      console.log(res);
  })
  .catch((err) => toast.error(err.message));

}

  return (
    <div className='h-[90vh] flex justify-center flex-col' style={{alignItems : 'center'}}>
      <p className='mb-[2rem] text-[2rem]'>The prompt</p>
      <div className='flex justify-center' style={{alignItems : 'center'}}>
     {
      card.map((c, index) => {
        return (
         <div className='border rounded shadow-lg w-[30vw] text-center p-[2rem] relative  min-w-[60vw] max-w-[80vw]' >
          <FaEdit size={25} className='absolute right-2 text-[black] hover:text-[rgb(60,60,60)] hover:cursor-pointer' onClick={handleOpen}/>
           <p className='bg-[]'>Type : {c.type}</p><br />
           <p>Prompt : {c.prompt}</p><br />
          <p>Discription: {c.dis}</p><br />
          <FaClipboard className='text-black cursor-pointer hover:text-[green] absolute right-6' title='copy text' onClick={() => handleClip(c.prompt)}/>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p className='text-[1.5rem]'>Edit Prompt</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <input type="text" placeholder='Prompt' className='p-[0.7rem] rounded text-[1.5rem] shadow-lg border text-[black]' onChange={(e) => setPrompt(e.target.value)}/><br /><br />
          <input type="text" placeholder='Discription' className='p-[0.7rem] rounded text-[1.5rem] shadow-lg border text-[black]' onChange={(e) => setDis(e.target.value)}/><br /><br />
            <Button onClick={handleName}>Save</Button>
          </Typography>
        </Box>
      </Modal>
         </div>
        )
      })
    } 
      </div>
    </div>
  )
}

export default page