import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate, useNavigation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';


function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    console.log(user);

  }, [])
  

  const [openDialog, setOpenDialog] = useState(false)

   const login = useGoogleLogin({
    onSuccess: tokenResponse => GetUserProfile(tokenResponse),
    onError: error => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'Application/json',
      },
    })
      .then((resp) => {
        console.log(resp.data); // Access the user data here
        localStorage.setItem('user', JSON.stringify(resp.data))
        setOpenDialog(false)
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  };

  

console.log({user})
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <a href="/"><img src="/logo.svg" alt="" /></a>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <a href="/create-trip"><Button className="rounded-full text-black  ">+ Create Trip</Button></a>
            <a href="/my-trips"><Button className="rounded-full text-black" >My Trips</Button></a>
            <Popover>
              <PopoverTrigger>

                <img src='/user.png' className="h-[35px] w-[35px] rounded-full"/>
              </PopoverTrigger>
              <PopoverContent>
                
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
              
            </Popover>

          </div> :
          <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>
          
        }
      </div>
      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Important Notice</DialogTitle>
            </VisuallyHidden>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button onClick={login} className="w-full mt-5 "> <FcGoogle className='h-7 w-7' />Sign In with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header