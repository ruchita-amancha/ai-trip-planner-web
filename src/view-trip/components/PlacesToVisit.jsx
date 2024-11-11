import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Places To Visit</h2>
            <div className='mt-4'>
                {trip?.tripData?.itinerary.map((itinerary, index) => (
                    <div>
                        <h2 className='font-medium text-lg'>Day {itinerary.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {itinerary.plan?.map((places, index) => (
                                <div className='my-3'>
                                    <h2 className='font-medium text-sm text-orange-600'>{places.time}</h2>
                                    <PlaceCardItem place={places} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit