
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ai_demo, AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useToast } from "@/hooks/use-toast"
import { chatSession } from '@/service/AIModel';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const useLoadGoogleScript = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  return scriptLoaded;
};

function CreateTrip() {
  const scriptLoaded = useLoadGoogleScript();

  // Initialize state for 'place'
  const [place, setPlace] = useState(null);

  // Initialize state for 'formData'
  const [formData, setformData] = useState([]);

  const { toast } = useToast()

  const [openDialog, setOpenDialog] = useState(false)

  const [loading, setLoading] = useState(false)

  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);

  }, [formData])

  const login = useGoogleLogin({
    onSuccess: tokenResponse => GetUserProfile(tokenResponse),
    onError: error => console.log(error)


  });

  const OnGenerateTrip = async () => {
console.log();

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return
    }

    if (formData.noOfDays > 5 && !formData.location || !formData.budget || !formData.traveler) {
      toast({
        title: "Please fill all details",
        // description: "Friday, February 10, 2023 at 5:57 PM",
      })

      return;
    }

    setLoading(true)
    const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData.location.label).replace('{totalDays}', formData.noOfDays).replace('{traveler}', formData.traveler).replace('{budget}', formData.budget).replace('{totalDays}', formData.noOfDays)
    // const demo = ai_demo.replace('{totalDays}', formData.noOfDays).replace('{traveler}', formData.traveler).replace('{location}', formData.location.label).replace('{budget}', formData.budget).replace('{totalDays}', formData.noOfDays)
    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    SaveAiTrip(result.response.text());
    setLoading(false)
  }

  const SaveAiTrip = async (TripData) => {

    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData:JSON.parse(TripData),
      userEmail: user.email,
      id: docId
    });
    setLoading(false)
    navigate('/view-trip/'+docId)
  }

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
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  };


  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl '>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          {scriptLoaded ? (
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v); handleInputChange('location', v)
                }
              }}
            />
          ) : (
            <p>Loading Google Places...</p>
          )}
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'} type="number" onChange={(e) => handleInputChange('noOfDays', e.target.value)
          }></Input>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.budget == item.title && 'shadow-lg border-black'}`} onClick={() => handleInputChange('budget', item.title)}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))
            }
          </div>



        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index} onClick={() => handleInputChange('traveler', item.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.traveler == item.people && 'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))
            }
          </div>
        </div>

      </div>

      <div className='my-10 justify-end flex'>
        <Button disable={loading} onClick={OnGenerateTrip}>{loading?<AiOutlineLoading3Quarters  className='h-7 w-7 animate-spin'/>:'Generate Trip'}</Button>
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
  );
}

export default CreateTrip;
