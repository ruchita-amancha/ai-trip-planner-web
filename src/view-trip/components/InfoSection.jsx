import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import { GetPlacedetails, PHOTO_REF_URL } from '@/service/GlobalApi';




function InfoSection({ trip }) {
    // console.log({trip});

    useEffect(()=>{
        trip&&GetPlacePhoto()
    },[trip])

    const [photoUrl,setPhotoUrl]=useState()

    const GetPlacePhoto = async () => {

        const data={
            textQuery:trip?.userSelection?.location?.label
        }
        const result = await GetPlacedetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);
             const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
             console.log(PhotoUrl);
             setPhotoUrl(PhotoUrl)
        })
    }
    return (
        <div>
            <img src={photoUrl} className="h-[340px] w-full object-cover rounded-xl" />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>

                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-grey-500'>📅 {trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-grey-500'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-grey-500'>👥 No. of Traveler: {trip?.userSelection?.traveler} People</h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    )
}

export default InfoSection