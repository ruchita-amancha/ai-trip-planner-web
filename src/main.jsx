import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import CreateTrip from './create-trip'
import Header from './components/custom/header'
import { Toaster } from './components/ui/toaster'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]'
import MyTrips from './my-trips'



const router=createBrowserRouter([
  {
    path:'/',
    element:<App />
  },
  {
    path:'/create-trip',
    element:<CreateTrip />
  },
  {
    path:'/view-trip/:tripId',
    element:<ViewTrip />
  },
  {
    path:'/my-trips',
    element:<MyTrips />
  }


])

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      {/* Use RouterProvider with the defined router */}
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)
