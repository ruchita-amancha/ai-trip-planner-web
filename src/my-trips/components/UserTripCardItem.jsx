import { GetPlacedetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({ trip }) {
  useEffect(() => {
    trip && GetPlacePhoto()
  }, [trip])

  const [photoUrl, setPhotoUrl] = useState()

  const GetPlacePhoto = async () => {

    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    const result = await GetPlacedetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
      console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl)
    })
  }
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all  cursor-pointer'>
      <img src={photoUrl} className="object-cover rounded-xl h-[220px] w-full" />
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget}</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem