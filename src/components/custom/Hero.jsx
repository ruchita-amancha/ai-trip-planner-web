import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';


function Hero() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineries at your Fingertips</h1>

      <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      {user ?
        <div className='flex items-center gap-3'>
          <Link to={'/create-trip'}>
            <Button className="cursor-pointer">Get Started, It's Free</Button>
          </Link>
          <Link to={'/my-trips'}>
            <Button className="cursor-pointer">My Trips</Button>
          </Link>
        </div> : <Link to={'/create-trip'}>
          <Button className="cursor-pointer">Get Started, It's Free</Button>
        </Link>
      }

      <img src="/landing.png" className='-mt-19' />
    </div>

  )
}

export default Hero