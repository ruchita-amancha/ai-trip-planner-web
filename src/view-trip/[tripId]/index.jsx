import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function ViewTrip() {
    const { tripId } = useParams(); // Get tripId from URL params

    const [tripData, setTripData] = useState(null)

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId])

    const GetTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTripData(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* {Information Section} */}
            <InfoSection trip={tripData}></InfoSection>

            {/* {Recommened Hotels} */}
            <Hotels trip={tripData}></Hotels>

            {/* {Daily Plan} */}
            <PlacesToVisit trip={tripData}></PlacesToVisit>

            {/* Footer */}
            <Footer></Footer>

        </div> // Display the value of tripId
    );
}

export default ViewTrip;
