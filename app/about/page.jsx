import React from 'react'

const page = () => {
  return (
    <div className='h-[90vh]  flex justify-center' style={{alignItems:'center', backgroundColor:'rgb(253, 255, 247)'}}>
      <div className='w-[60vw] shadow-lg p-3'>
        <h1 className='text-[1.5rem] text-center mb-4'>ABOUT</h1>
        <p className='first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold
  first-letter:mr-3 first-letter:float-left'>Hey there 👋, this is the Get Prompt. The AI tools are rapidly growing, and with that, it is important to talk to them in an efficient way. And this can be done by only feeding them with good prompts. <br /> Now you may ask, "What is the prompt ?!" Don't worry I got you covered. <br /> Prompt is the text with the help of which you communicate with the AI tools like chat GPT. <br /> You know what, sometimes it may get so hectic to write and engineer perfect prompts. So in order to tackle that I made this platform called 'GetPrompt'. <br /> Here you can search the prompts with the help of the keys. Have a good prompt that you want to share with other people and help them ? Share it o Get Prompt ! <br /> Now on the way, you start loving the work of some individual, just go ahead and follow him/her. <br /> Didn't found the key that you were looking for ? Go ahead and make one! But heres the catch, for making a new prompt topic you will have to have atleast 1 reputation. <br />
        Reputation can be gained by contributing more and more peompts to the platform. For every 5 contributions you will get 1 reputation. <br />
        So with that said let's go and have some fun🙌.</p>
      </div>
    </div>
  )
}

export default page