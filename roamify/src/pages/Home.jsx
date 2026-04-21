import React from 'react'
import { Link } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import PlaceCard from '../components/PlaceCard'
import HomeCard from '../components/HomeCard'
import DesignCard from '../components/DesignCard'

function Home() {
  return (
    <div className="overflow-hidden">
      {/* landing */}
      <div className='home-hero'>
        <div className='home-hero-copy'>
          <h1 style={{ fontFamily: 'Audiowide', fontSize: 'clamp(40px, 8vw, 80px)', color: "black" }} className='text-center'>Roamify</h1>
          <h4 style={{ fontFamily: "Macondo", color: "black" }} className='text-center'>“Discover destinations. Book your stay. <br /> Roamify your world.”</h4>
          <Link to={'./service'} className="d-inline-block mt-4"> 
            <button style={{ backgroundColor: "black" }} className='btn btn-dark fw-bold rounded shadow py-2 px-4'>
              <span style={{ color: "yellowgreen" }}>Starts To Explore</span>
            </button>
          </Link>
        </div>
        <div className="home-hero-visual">
          <HomeCard />
        </div>
      </div>

      {/* places */}
      <div className='text-center container-fluid' style={{ marginTop: '100px' }}>
        <h1 style={{ fontFamily: "Luckiest Guy", color: "black", fontSize: "clamp(30px, 5vw, 50px)" }}>Top Destinations</h1>
        <div className="d-flex justify-content-center w-100">
          <PlaceCard />
        </div>
        <Link to={'./destination'} className="d-inline-block mt-5"> 
          <button style={{ backgroundColor: "black", color: "yellowgreen" }} className='btn rounded shadow fw-bold py-2 px-4'>
            Go to Destinations
          </button>
        </Link>
      </div>

      {/* destcard */}
      <div className='home-design-section'>
        <div className='home-design-collage'>
          <DesignCard />
        </div>
        <div className="banner">
          <p className="small-text">IT'S TIME TO</p>
          <h1 className="main-text">EXPLORE</h1>
          <p className="script-text">The World</p>
        </div>
      </div>

      {/* stay */}
      <div className='text-center container-fluid home-stay-section' style={{ marginTop: '100px', marginBottom: '100px' }}>
        <h1 style={{ fontFamily: "Luckiest Guy", color: "black", fontSize: "clamp(30px, 5vw, 50px)" }}>Book Your Stay</h1>
        <div className="d-flex justify-content-center w-100">
           <RoomCard />
        </div>
        <Link to={'./rooms'} className="d-inline-block mt-5"> 
          <button style={{ backgroundColor: "black", color: "yellowgreen" }} className='btn rounded shadow fw-bold py-2 px-4'>
            View More
          </button>
        </Link>
      </div>
      
    </div>
  )
}

export default Home
