'use client'

import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {toast} from 'react-toastify';
import { FaUser, FaEdit, FaArrowUp, FaArrowDown, FaAward } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
    color : 'white',
    borderRadius: '5px'
  };


const page = () => {

    const router = useRouter();

    const [user, setUser] = useState([]);
    const [card, setCard] = useState([]);
    const [name,setName] = useState('');
    const [follows, setFollows] = useState([]);
    const [following, setFollowing] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const [fetchdata, setFetchdata] = useState([]);
    const [flag, setFlag] = useState(0);
    const [repu, setRepu] = useState(0);
    const [topic, setTopic] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [open1, setOpen1] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const [open2, setOpen2] = React.useState(false);

    useEffect(() => {
       
        if(!localStorage.getItem('token')) {
            router.push('/login');
            toast.warning("You need to login first");
            return ;
        }

        async function getInfo() {

            await fetch(`https://getprompt-api.onrender.com/getUser/${localStorage.getItem('id')}`)
            .then((res) => res.json())
            .then((res) => {
                console.log("Console.log Momos : ", res[0]);
                setUser(res);
                setFollowing(res[0].following);
                setFollows(res[0].followers);
                
            })
            .catch((err) => {
                alert('Error: ' + err.message);
            })

        }

        getInfo();

        async function getData() {

            console.log("I reached here!...");
     
           await fetch(`https://getprompt-api.onrender.com/getUserPrompts/${localStorage.getItem('id')}`, {
             method : 'GET',
             headers : {
                 'Content-Type': 'application/json',
             }
          })
          .then((res) => res.json())
          .then((res) => {
           console.log("Look here once alos", res);
           setCard(res);
           if(res.length == 0) {
            toast.info("No prompts till now, create one...");
           }
           const likesArray = res.map((card) => card.likes);
           const totalLikesCount = likesArray.reduce((total, likes) => total + likes, 0);
           setTotalLikes(totalLikesCount);
           setRepu(Math.floor(res.length/5));
           console.log("Here you wanna look mate..."+ res.length);
          })
          .catch((err) => {
             alert("Error from the fetchCard function : " + err.message);
          })
     
          }
          getData();

    }, [])

    async function handleName() {

        if(name === '') {
            toast.warning("please enter a valid user name...");
            return ;
        }

        await fetch('https://getprompt-api.onrender.com/changename', {
            method : 'PATCH',
            headers : {
                'Content-Type': 'application/json',
                'token' : localStorage.getItem('token'),
            },
            body : JSON.stringify({
                userName : name,
                id : localStorage.getItem('id'),
            })
        })
        .then((res) => res.json())
        .then((res) => {
           if(res.message === '1') {
            toast.warning("Your session token expired, you have to login again...");
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            router.push('/login');
           }
           else {
            toast.success("UserName updated successfully,. your updated userName will appear soon!");
            setOpen(false);
            console.log(res);
           }
        })
        .catch((err) => toast.error(err.message));

    }

    async function handleFetch(flag) {

    try {

      if(flag == 0) {

        setFetchdata([]);

        setFlag(0);

        console.log("I am in the fleg === 0 ");

       follows.map((id, index) => {

        async function getInfo() {

          await fetch(`https://getprompt-api.onrender.com/getUser/${id}`)
          .then((res) => res.json())
          .then((res) => {
              console.log("Console.log inside follows : ", res[0]);
              setFetchdata((pre) => [...pre, res[0]]);
          })
          .catch((err) => {
              alert('Error: ' + err.message);
          })

      }

      getInfo();

       })

       }

       if(flag == 1) {

        setFetchdata([]);

        setFlag(1);

        console.log("I am in the fleg === 1 ");

       following.map((id, index) => {

        async function getInfo() {

          await fetch(`https://getprompt-api.onrender.com/getUser/${id}`)
          .then((res) => res.json())
          .then((res) => {
              console.log("Console.log inside follows : ", res[0]);
              setFetchdata((pre) => [...pre, res[0]]);
          })
          .catch((err) => {
              alert('Error: ' + err.message);
          })

      }

      getInfo();

       })

       }

    }
    catch (err) {

     toast.error(err.message);

    }

    }

    async function handleCreateType() {

      console.log("Here you wanna look mate..."+ repu);


       if(repu == 0) {
        toast.info("You need to have atleast 1 reputation to create a type, refer to the about section for more information");
        return ;
       }

       await fetch('https://getprompt-api.onrender.com/addType', {
          method : 'PATCH',
          headers : {
            'Content-Type': 'application/json',
            'token' : localStorage.getItem('token'),
          },
          body : JSON.stringify({
            topic : topic,
          })
       })
       .then((res) => res.json())
       .then((res) => {
 
        if(res.message === '1') {
          toast.warning("Your token have expired, you have to login again...");
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          router.push('/login');
        }
        else {
          toast.success("Type created successfully");
          setOpen2(false);
        }

       })
       .catch((err) => toast.error(err.message));

    }

  return (
    <div className='min-h-[90vh] flex'>
      
      <div className='border p-3 rounded pt-[3rem] min-w-[17vw] '>
      <div className='flex justify-center'>
       <FaUser size={70}/>
       </div>
       <div className='mt-[4rem]  relative min-h-[50vh]'>
       {
        (user.length == 0) ? <div className='text-center'>  
        <Box sx={{ width: 250 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        </Box>
        </div> : user.map((user, index) => {

          return (
 
             <>
                  <p>User Name : {user.userName}</p><br />
                  <p>Total contributions : {card.length}</p><br />
                  <p className='flex'>Reputation : {Math.floor(card.length/5)}&nbsp;<FaAward size={20}/></p><br />
                  <p>Total Likes : {totalLikes}</p><br />
                  <Button onClick={() => {
                    handleOpen1();
                    handleFetch(0);
                  }}>Followers : {follows.length}</Button><br />
                  <Button onClick={() => {
                    handleOpen1();
                    handleFetch(1);
                  }}>Following : {following.length}</Button><br />
                  <hr />
                  <div className='text-center flex mt-[3rem] cursor-pointer hover:bg-[rgb(100,100,100)] p-3 hover:text-white rounded' style={{alignItems:'center'}} onClick={handleOpen}>
                       <FaEdit size={20}/>&nbsp; Edit Username
                  </div>
 
             </>
         
          )
 
         })
       }
       </div>

      </div>

      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit UserName : 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input type="text" placeholder='username' className='p-[0.7rem] rounded text-[1.5rem] shadow-lg border text-[black]' onChange={(e) => setName(e.target.value)}/><br /><br />
            <Button onClick={handleName}>Save</Button>
          </Typography>
        </Box>
      </Modal>
       <div className='relative flex' style={{alignItems:'center'}}>
       <h1 className='text-[2rem] ml-[2rem] mt-[2rem]'>Prompts</h1>
        <button className='bg-[blue] text-white p-2 rounded shadow-lg absolute right-8 hover:bg-blue-600' onClick={handleOpen2} >Create new type +</button>
       </div>

        <div className='border grid xl:grid-cols-3 xl:gap-8 md:grid-cols-2 md:gap-12 sm:grid-cols-1'>
        {
           (card.length == 0) ?   <div className='border-2 mx-[1rem] p-8 rounded shadow-lg mt-[1.3rem] text-white relative hover:cursor-pointer lg:min-h-[35vh] sm:min-h-[35vh] min-w-[21vw]' style={{alignItems:'center'}}>  <Stack spacing={1}>
           {/* For variant="text", adjust the height via font-size */}
           <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
           {/* For other variants, adjust the size with `width` and `height` */}
           <Skeleton variant="circular" width={40} height={40} />
           <Skeleton variant="rectangular" width={210} height={60} />
           <Skeleton variant="rounded" width={210} height={60} />
         </Stack></div>   :  card.map((card, index) => {

            return (
             <div className='border-2 mx-[1rem] p-8 rounded shadow-lg mt-[1.3rem] text-white relative hover:cursor-pointer lg:min-h-[35vh] sm:min-h-[35vh] min-w-[21vw]' style={{backgroundColor:'rgb(245, 247, 124)'}} onClick={() => router.push(`/watch/${card._id}/profile`)}>
             <h1 className='bg-black rounded p-2'>{card.type}</h1><br />
             <h1 className=' bg-black rounded p-2 relative truncate'><span className='text-[rgb(90,90,90)]'>Prompt :</span> {card.prompt}</h1><br />
             <h1 className='bg-black rounded p-2 truncate'><span  className='text-[rgb(90,90,90)]'>Discription :</span> {card.dis}</h1>
             <div className='flex bg-[rgb(120,120,120)] text-[white] rounded p-1 mt-2' style={{alignItems:'center'}}>
             <div> {card.likes} </div>
             &nbsp;
              <FaArrowUp size={25}  className='mt-[0.4rem]'/>&nbsp;
              <FaArrowDown size={25}  className='mt-[0.4rem]'/>
            <p className='mt-[0.7rem] absolute right-10 text-[10px]'>{card.createdAt.split('T')[0]}</p>
            </div>
        </div>
            )

       })
        }
      </div>

      </div>

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='max-h-[65vh] overflow-auto'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {
              (flag == 0) ? 'Followers' : 'Following'
            }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <div>
              {
                (fetchdata.length == 0) ? 'No data available' : <div className='overscroll-auto'>
                  { 
                    fetchdata.map((user) => {
                           
                       return (
                        <div className='flex bg-white text-black rounded p-3 relative mb-1' style={{alignItems:'center'}}>
                        <div><FaUser size={25}/></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div>{user.userName}</div>&nbsp;&nbsp;
                        <div className='absolute right-1'><button className='bg-[blue] text-white rounded shadow-md p-2 hover:bg-blue-500' onClick={() => router.push(`/profile/${user._id}`)} title='visit profile'>Profile</button></div>
                     </div>
                       )

                    })
                  }
                </div>
              }
             </div>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

            <div className='flex' style={{alignItems:'center'}}>
            <input type="text" placeholder='type name...' title='enter type' className='p-2 rounded text-black' onChange={(e) => setTopic(e.target.value)}/><br />
            <button className='bg-[blue] text-white p-2 rounded shadow-lg absolute right-8 hover:bg-blue-600' onClick={handleCreateType} >Create</button>
            </div>

          </Typography>
        </Box>
      </Modal>


    </div>
  )
}

export default page