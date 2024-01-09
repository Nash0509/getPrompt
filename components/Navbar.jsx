import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex p-3 bg-[black] text-white'>
      <div className='ml-5'><Link href='/'><p className='text-3xl' style={{fontFamily:'cursive'}}>getPrompts</p></Link></div>
      <div className='sm:ml-[5vw] md:ml-[20vw] lg:ml-[30vw] xl:ml-[50vw]'>
        <ul className='flex mt-2'>
         <Link href='/'> <li className='mx-2'>Home</li></Link>
         <Link href='/prompts'><li className='mx-2'>Prompts</li></Link>
         <Link href='/about'><li className='mx-2'>About</li></Link>
         <Link href='/register'><li className='mx-2'>Register</li></Link>
         <Link href='/login'><li className='mx-2'>LogIn</li></Link>
         <Link href='/profile'><li className='mx-2'>Profile</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Navbar