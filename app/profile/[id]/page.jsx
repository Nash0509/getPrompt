'use client'

import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {toast} from 'react-toastify';
import { FaUser, FaEdit, FaArrowUp, FaArrowDown, FaAward } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { usePathname } from 'next/navigation';

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
    const path = usePathname();

    const [user, setUser] = useState([]);
    const [card, setCard] = useState([]);
    const [name,setName] = useState('');
    const [follow, setFollow] = useState(0);
    const [followers ,setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    useEffect(() => {
       
        if(!localStorage.getItem('token')) {
            router.push('/login');
            toast.warning("You need to login first");
            return ;
        }

        async function getInfo() {

            await fetch(`https://getprompt-api.onrender.com/getUser/${path.split('/')[2]}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setUser(res);
                setFollowing(res[0].following.length);
                setFollowers(res[0].followers.length);
                res[0].followers.map((f) => {
                    if(f === `${localStorage.getItem('id')}`) {
                        setFollow(1);
                        console.log("Got it!")
                    }
                })
            })
            .catch((err) => {
                toast.error('Error: ' + err.message);
            })

        }

        getInfo();

        async function getData() {

            console.log("I reached here!...");
     
           await fetch(`https://getprompt-api.onrender.com/getUserPrompts/${path.split('/')[2]}`, {
             method : 'GET',
             headers : {
                 'Content-Type': 'application/json',
             }
          })
          .then((res) => res.json())
          .then((res) => {
           console.log(res);
           setCard(res);

           const likesArray = [res].map((card) => card.likes);
           const totalLikesCount = likesArray.reduce((total, likes) => total + likes, 0);
           setTotalLikes(totalLikesCount);

          })
          .catch((err) => {
             alert("Error from the fetchCard function : " + err.message);
          })
     
          }
          getData();

    }, [])

    async function handleFollow() {

     try {

      if(follow == 0) {

        await fetch('https://getprompt-api.onrender.com/follow', {

        method : 'PATCH', 
        headers : {
           'Content-Type': 'application/json',
           'token' : localStorage.getItem('token'),
        },
        body : JSON.stringify({
           storage : localStorage.getItem('id'),
           route : path.split('/')[2],
        })
        
        
     })
     .then((res) => res.json())
     .then((res) => {
          
        if(res.message === '1') {
           toast.warning("Your session token is invalid, you have to login again...");
           localStorage.removeItem('token');
           localStorage.removeItem('id');
           router.push('/login');
        }
        else {
           toast.success("Followed successfully...");
           setFollow(1);
        }

     })
     .catch((err) => {
       console.log(err.message);
       toast.error("An error occured while following : "+err.message);
     })

      }
      else {
         
        await fetch('https://getprompt-api.onrender.com/unfollow', {

        method : 'PATCH', 
        headers : {
           'Content-Type': 'application/json',
           'token' : localStorage.getItem('token'),
        },
        body : JSON.stringify({
           storage : localStorage.getItem('id'),
           route : path.split('/')[2],
        })
        
        
     })
     .then((res) => res.json())
     .then((res) => {
          
        if(res.message === '1') {
           toast.warning("Your session token is invalid, you have to login again...");
           localStorage.removeItem('token');
           localStorage.removeItem('id');
           router.push('/login');
        }
        else {
           toast.success("Unfollowed successfully...");
           setFollow(0);
        }

     })
     .catch((err) => {
       console.log(err.message);
       toast.error("An error occured while following : "+err.message);
     })

      }

     }
     catch (err) {

      toast.success(err.message);

     }

    }

  return (
    <div className='min-h-[90vh] flex'>
      
      <div className='border p-3 rounded pt-[3rem] min-w-[17vw] '>
      <div className='flex justify-center'>
       <FaUser size={70}/>
       </div>
       <div className='mt-[4rem]  relative min-h-[45vh]'>
       {
       (user.length == 0) ?  <div className='text-center'>Loading the info...</div> :  user.map((user, index) => {

        return (

           <>
                <p>User Name : {user.userName}</p><br />
                <p>Total contributions : {card.length}</p><br />
                <p className='flex'>Reputation : {Math.floor(card.length/5)}&nbsp;<FaAward size={20}/></p><br />
                <p>Total Likes : {totalLikes}</p><br />
                <p>Followers : {followers}</p><br />
                <p>Following : {following}</p><br />
                <hr />

           </>
       
        )

       })
       }
       </div>
       <div className='text-center' >
        <button className='p-2 rounded bg-[blue] text-white shadow-md hover:bg-blue-600 cursor-pointer' title='follow' onClick={handleFollow}>{
            (follow == 0) ? '' : 'Un'
        }Follow</button>
       </div>
      </div>

      <div>
        <h1 className='text-[2rem] ml-[2rem] mt-[2rem]'>Prompts</h1>

        <div className='border grid xl:grid-cols-3 xl:gap-8 lg:grid-cols-2 lg:gap-12 sm:grid-cols-1'>
        {
           (card.length == 0) ?   <div className='flex justify-center w-[50vw] h-[20vw]' style={{alignItems:'center'}}>No prompts till now...</div>   :  card.map((card, index) => {

            return (
             <div className='border-2 mx-[1rem] p-8 rounded shadow-lg mt-[1.3rem] text-white relative hover:cursor-pointer lg:min-h-[35vh] sm:min-h-[35vh] min-w-[21vw]' style={{backgroundColor:'rgb(245, 247, 124)'}} onClick={() => router.push(`/watch/${card._id}`)}>
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


    </div>
  )
}

export default page