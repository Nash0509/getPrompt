'use client'
import React from 'react';
import { Typewriter } from 'react-simple-typewriter'
import { FaArrowAltCircleRight } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {

  const router = useRouter();

  return (
    <div className='h-[90vh] bg-back bg-cover bg-center bg-no-repeat pt-[20vh]'>
      <div className='flex justify-center flex-col' style={{alignItems:'center'}}>
        <p className='sm:text-4xl font-bold text-white bg-black bg-opacity-50 rounded p-7'>Discover and create AI &nbsp;<br />
        <Typewriter
            words={['prompts...']}
            loop={50}
            cursor
            cursorStyle='|'
            typeSpeed={30}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>
        <div className='mt-[8rem] flex ' style={{alignItems:'center'}} onClick={() => router.push('/prompts')}>  <button className='bg-[#c4cece] shadow-xl flex justify-center p-[1rem] rounded hover:bg-[blue] hover:text-[white]' >Get started&nbsp;&nbsp; <FaArrowAltCircleRight size={30}/></button></div>
      </div>
    </div>
  );
};

export default Page;
