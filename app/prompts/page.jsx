'use client';
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { FaSearch , FaUser} from 'react-icons/fa';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

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
  text: 'center',
};

const page = () => {

  const router = useRouter();
  const [cards1, setCards1] = useState([]);
  const [cards2, setCards2] = useState([]);
  const [user, setUser] = useState([]);
  const [user1, setUser1] = useState([]);
  const [pro, setPro] = useState(true);
  const [types, setTypes] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opend = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosed = () => {
    setAnchorEl(null);
  };


  React.useEffect(() => {

    toast.info("Cold loading may take upto 20 seconds (free teir), please wait...");
     
     async function getData() {

      await fetch('https://getprompt-api.onrender.com/cards', {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json',
        }
     })
     .then((res) => res.json())
     .then((res) => {
      console.log(res.result);
      setCards1(res.result);

      res.result.map((p, index) => {

        async function getName() {

          await fetch(`https://getprompt-api.onrender.com/getUser/${p.createdBy}`)
          .then((res) => res.json())
          .then((res) => {
              setUser((prevUser) => [...prevUser, res[0].userName]);
          })
          .catch((err) => {
              alert('Error: ' + err.message);
          })

        }

        getName();

      })

      const arr = res.result2
      arr.shift();
      
      arr.map((p, index) => {

        console.log("This is the second one...");
        console.log("CreatedBy: "+p.createdBy);

        async function getName() {

          await fetch(`https://getprompt-api.onrender.com/getUser/${p.createdBy}`)
          .then((res) => res.json())
          .then((res) => {
            console.log("This is from the inside of the fetch : ",res)
              setUser1((prevUser) => [...prevUser, res[0].userName]);
          })
          .catch((err) => {
              alert('Error: ' + err.message);
          })

        }

        getName();

      })

     })
     .catch((err) => {
        alert("Error from the fetchCard function : " + err.message);
     })

     }
     getData();

  }, [])

  useEffect(() => {
      
     async function getdata() {

     await fetch('https://getprompt-api.onrender.com/getTypes', {
      method : 'GET',
      headers : {
        'Content-Type': 'application/json'
      }
     })
     .then((res) => res.json())
     .then((res) => {
      console.log("This is the type array : "+res.topics);
      setTypes(res.topics);
     })
     .catch((err) => toast.error(err.message));

     }
     getdata();

  }, [])
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [type, setType] = React.useState('');
  const [prompt, setPrompt] = React.useState('');
  const [dis, setDis] = React.useState('');
  const [search, setSearch] = useState('');
  const [no, setNo] = useState(false);
  
  async function handleCreate(e) {

   e.preventDefault();

    if(!localStorage.getItem('token')) {
      alert("Please logIn first...");
       router.push('/login');
       return ;
    }

    if(type === '' || prompt === '' || dis === '') {
      toast.success("Please fill all the required fields");
      return ;
    }

    try {

      await fetch('https://getprompt-api.onrender.com/create',{
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
          'token' : localStorage.getItem('token'),
        },
        body : JSON.stringify({
          type : type,
          prompt : prompt,
          dis : dis,
          createdBy : localStorage.getItem('id'),
        })

      }, {next : {validate : 100}})
      .then((res) => res.json())
      .then((res) => {
       if(res.message === '1') {
        toast.warning("Your access token has expired, please login again...");
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        router.push('/login');
       }
       else {
        setOpen(false);
        toast.success("Prompt created successfully...");
         router.push('/prompts');
       }
        
      })
      .catch((err) => {
        toast.error(err.message);
      
      })

    }
    catch (err) {
      alert("An error occured while creating : "+err.message);
    }

  }

  async function handleSearch() {

    if(search === '') {
      return ;
    }
    
      await fetch(`https://getprompt-api.onrender.com/search/${search}`, {

         method : 'GET',
         headers : {
          'Content-Type': 'application/json'
         }

      })
      .then((res) => res.json())
      .then((res) => {

        if(res.length == 0) {
          setPro(false);
          toast.info("404 not found");
        }
        else {
          console.log("Searched results : ",res);
          setCards2(res);
          toast.success("Success!");
          setPro(true);
        }

      })
      .catch((err) => {
        toast.error(err.message);
      })

  }

  return (
    <div className='p-[2rem]' style={{backgroundColor:'rgb(253, 255, 247)'}}>
    <div className='flex justify-center relative'>
      <div className='flex justify-center' style={{alignItems:'center'}}>
      <div className='absolute left-7'>
      <Button
        id="basic-button"
        aria-controls={opend ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={opend ? 'true' : undefined}
        onClick={handleClick}
      >
        Dictionary
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={opend}
        onClose={handleClosed}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          types.map((type) => {

           return (
            <MenuItem onClick={handleClosed}>{type}</MenuItem>
           )

          })
        }
      </Menu>
    </div>
        <input type="text" placeholder='search prompts' className='p-[1rem] rounded text-[1.5rem] shadow-lg border w-[40vw]' title='search box' onChange={(e) => setSearch(e.target.value)}/>
       <div className='border p-6 rounded shadow-lg cursor-pointer hover:bg-[rgb(50,50,50)] hover:text-white' title='search' onClick={handleSearch}>
       <FaSearch size={20}/>
       </div>
       <button className='bg-[#c4cece] shadow-xl flex justify-center p-[1rem] rounded hover:bg-[blue] hover:text-[white] absolute lg:right-[10vw] sm:right-1' onClick={handleOpen}>Create +</button>
      </div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-white text-2xl text-center'>
            Create prompt
          </Typography>
            <form className='text-center mt-[1.5rem] flex flex-col'>
              <label>Type</label>
              <select className='my-2 p-2 rounded text-center' onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                {
                  types.map((type) => {
                    return (
                       <option value={type}>{type}</option> 
                    )
                  })
                }
              </select>
              <textarea cols="30" rows="10" placeholder='Enter the prompt' className='my-2 p-2 rounded text-center' onChange={(e) => setPrompt(e.target.value)} ></textarea><br />
              <input type="text" placeholder='Description' className='my-2 p-2 rounded text-center' onChange={(e) => setDis(e.target.value)} /><br />
             <div className='flex justify-center'>
             <button className='bg-[#c4cece] shadow-xl flex justify-center p-[1rem] rounded hover:bg-[blue] hover:text-[white]' onClick={(e) => handleCreate(e)}>Create</button>
             </div>
            </form>
        </Box>
      </Modal>
    </div>
    <hr className='mt-[1.5rem]'/>

   <div className='mt-[1.5rem] ml-[5rem] flex' style={{alignItems : 'center'}}>
   <h1>Suggestions : </h1>
   <div className='ml-[2.5rem]'>
    <h1>Try searching Code, projects...</h1>
   </div>
   </div>

   {
  (!no) ? '' :  <div>
  <p className='text-[1.5rem] flex justify-center mt-[3rem]'> No matched prompts...</p>
 </div>
   }  <br /><br />
   <hr className='my-[1.5rem]'/>

   {
    (search !== '') ? '' :  <div>
    <h1 className='font-semibold text-[1.5rem] ml-[10vw]'>Coding</h1>
   <Suspense fallback={<Loading />}>
   <div  className='border grid lg:grid-cols-3 lg:gap-10 sm:grid-cols-1 md:grid-cols-2 md:gap-12'>
       {
         (cards1.length == 0) ?  <Stack spacing={1}>
         {/* For variant="text", adjust the height via font-size */}
         <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
         {/* For other variants, adjust the size with `width` and `height` */}
         <Skeleton variant="circular" width={40} height={40} />
         <Skeleton variant="rectangular" width={210} height={60} />
         <Skeleton variant="rounded" width={210} height={60} />
       </Stack> :  cards1.map((card, index) => {

          return (
           <div className='border-2 mx-[1rem] p-8 rounded shadow-lg mt-[1.3rem] text-white relative lg:min-h-[35vh] sm:min-h-[35vh] min-w-[21vw]' style={{backgroundColor:'rgb(245, 247, 124)'}} >
            <div onClick={() => router.push(`/profile/${card.createdBy}`)} className='bg-white p-2 rounded shadow text-black flex mb-2 hover:cursor-pointer'><FaUser size={25}/>&nbsp;&nbsp;{user[index]}</div>
           <h1 className='bg-black rounded p-2'>{card.type}</h1><br />
           <h1 className=' bg-black rounded p-2 text-center relative truncate'>Prompt : {card.prompt}</h1><br />
           <h1 className='bg-black rounded p-2 truncate'>Discription : {card.dis}</h1>
           <div className='flex bg-[rgb(120,120,120)] text-[white] rounded p-1 mt-2' style={{alignItems:'center'}}>
           <div>{card.likes} </div>
              &nbsp;
              <FaArrowUp size={25}  className='mt-[0.4rem]'/>&nbsp;
              <FaArrowDown size={25}  className='mt-[0.4rem]' color='rgb(80,80,80)'/>
            <p className='mt-[0.7rem] absolute right-10 text-[10px]'>{card.createdAt.split('T')[0]}</p>
            </div>
            <div>
              <button onClick={() => router.push(`/watch/${card._id}`)} className='text-white bg-[blue] p-2 rounded hover:bg-blue-500 mt-2'>Watch</button>
            </div>

      </div>
          )

     })
        }
    </div>
   </Suspense>
  </div>
   }

    <hr  className='my-[1.5rem]'/>

   {
    (!pro) ?  <div>
    <p className='text-[1.5rem] flex justify-center mt-[3rem] h-[20vw]' style={{alignItems:'center'}}> No matched prompts...</p>
   </div> :  <div>
    <h1 className='font-semibold text-[1.5rem] ml-[10vw]'>{search}</h1>
    <div   className='border grid lg:grid-cols-3 lg:gap-10 sm:grid-cols-1 md:grid-cols-2 md:gap-12'>
         {
           (cards2.length == 0) ?   <div className='flex justify-center w-[100vw] h-[20vw]' style={{alignItems:'center'}}>Search for keywords...</div>  : cards2.map((card, index) => {

            return (
             <div className='border-2 mx-[1rem] p-8 rounded shadow-lg mt-[1.3rem] text-white relative lg:min-h-[35vh] sm:min-h-[40vh] min-w-[21vw]' style={{backgroundColor:'rgb(245, 247, 124)'}}>
              <div onClick={() => router.push(`/profile/${card.createdBy}`)} className='bg-white p-2 rounded shadow text-black flex mb-2 hover:cursor-pointer'><FaUser size={25}/>&nbsp;&nbsp;{user1[index]}</div>
             <h1 className='bg-black rounded p-2'>{card.type}</h1><br />
             <h1 className=' bg-black rounded p-2 text-center relative truncate'>Prompt : {card.prompt}</h1><br />
             <h1 className='bg-black rounded p-2 truncate'>Discription : {card.dis}</h1>
            <div className='flex bg-[rgb(120,120,120)] text-[white] rounded p-1 mt-2'  style={{alignItems:'center'}}>
              <div>{card.likes} </div>
              &nbsp;
              <FaArrowUp size={25}  className='mt-[0.4rem]'/>&nbsp;
              <FaArrowDown size={25}  className='mt-[0.4rem]' color='rgb(80,80,80)'/>
            <p className='mt-[0.7rem] absolute right-10 text-[10px]'>{card.createdAt.split('T')[0]}</p>
            </div>
            <button onClick={() => router.push(`/watch/${card._id}`)} className='text-white bg-[blue] p-2 rounded hover:bg-blue-500 mt-2'>Watch</button>
        </div>
            )

       })
         }
    </div>
  </div>
   }



  </div>
  )
}

export default page