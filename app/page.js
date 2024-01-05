'use client'
import React from 'react';
import { Typewriter } from 'react-simple-typewriter'
import { FaArrowAltCircleRight } from 'react-icons/fa';

const Page = () => {
  return (
    <div className='h-[90vh]'>
      <div className='flex justify-center mt-[25vh] flex-col' style={{alignItems:'center'}}>
        <p className='2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-[2rem] font-bold'>Discover and create AI &nbsp;<br />
        <Typewriter
            words={['prompts...']}
            loop={20}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>
        <div className='mt-[5rem] flex ' style={{alignItems:'center'}}>  <button className='bg-[#c4cece] shadow-xl flex justify-center p-[1rem] rounded hover:bg-[blue] hover:text-[white]'>Get started&nbsp;&nbsp; <FaArrowAltCircleRight size={30}/></button></div>
      </div>
    </div>
  );
};

export default Page;
