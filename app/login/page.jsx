'use client'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  color : 'white',
};



const page = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const router = useRouter();

  function handlelogout(e) {

    e.preventDefault();

    if(!localStorage.getItem('token')) {
      toast.warning("You need to login first...");
      return ;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    toast.success("You have been logged out");
    setOpen(false);

  }

  async function handleLogin(e) {

     e.preventDefault();

     if(email === '' || pass === '') {
      toast.warning("Please enter all the required fields");
      return ;
     }

     if(localStorage.getItem('token')) {
      toast.warning("You have already logged in");
      return ;
     }

     try {

        await fetch(`https://getprompt-api.onrender.com/login/${email}/${pass}`, {
          cache : 'no-store'
        }) 
        .then((res) => res.json())
        .then((res) => {

          if(res.message === '404') {
            toast.warning("No account found with this email...");
          }
          else {
              
            toast.success("Logged in successfully");
            localStorage.setItem("token", res.token);
            localStorage.setItem('id', res.id);
            router.push('/prompts');

          }
          
        })
        .catch((err) => {
          toast.error(err.message);
        })

     }
     catch (err) {
      console.log("An error has occurred");
      toast.error("An error cooured from the login from the frontend..." +err.message);
     }

  }

 return (
   <div className='h-[90vh]  flex justify-center' style={{backgroundColor:'rgb(253, 255, 247)', alignItems:'center'}}>
     <div className='bg-black text-white p-[2rem] rounded shadow-lg min-h-[90px]'>
       
       <form>
         <h1 className='mb-[3rem] text-3xl'>LogIn</h1>
         <input type="email" placeholder='email@gmail.com' onChange={(e) => setEmail(e.target.value)} className='mb-[1rem] p-[0.5rem] rounded text-center text-black'/><br />
         <input type="password" placeholder='password' onChange={(e) => setPass(e.target.value)} className='my-[1rem] p-[0.5rem] rounded text-center text-black'/><br />
        <div className='flex flex-col'>
        <button onClick={(e) => handleLogin(e)} className='my-[1.5rem] bg-[blue] p-[0.5rem] rounded'><input type="submit" style={{display:'none'}}/>LogIn</button>
        <Button onClick={handleOpen}>Logout</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to logout ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <button className='my-[1.5rem] bg-[blue] p-[0.5rem] rounded text-white' onClick={(e) => handlelogout(e)}>Yes!</button>
          </Typography>
        </Box>
      </Modal>
        </div>
       </form>

     </div>
   </div>
 )
}

export default page