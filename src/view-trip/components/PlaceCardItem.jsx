import { GetPlacedetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
     useEffect(()=>{
        place&&GetPlacePhoto()
    },[place])

    const [photoUrl,setPhotoUrl]=useState()

    const GetPlacePhoto = async () => {

        const data={
            textQuery:place?.place
        }
        const result = await GetPlacedetails(data).then(resp => {
            console.log(resp.data.places[0].photos[3].name);
             const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
             console.log(PhotoUrl);
             setPhotoUrl(PhotoUrl)
        })
    }
  return (
   <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.place} target="_blank">
    <div className='border p-3 rounded-xl mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg cursor-pointer'>
        <img src={photoUrl} className="w-[130px] h-[130px] rounded-xl" alt={place?.place} />
        <div>
            <h2 className='font-bold text-lg'>{place.place}</h2>
            <p className='text-sm text-gray-500'>{place.details}</p>
            <h2 className='text-green-00 mt-5'>{place.ticket_pricing}</h2>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem