import React from 'react'

function HomeCard() {
  return (
    <div className='home-card-collage'>
      <div className='home-card-item home-card-item-primary'>
        <img
          src="https://i.pinimg.com/474x/81/62/c9/8162c9c13d7884ecd942828e304cce4a.jpg"
          alt="Traveler enjoying a scenic view"
          className='home-card-image shadow'
        />
        <span className='home-card-label'>Lake</span>
      </div>
      <div className='home-card-item home-card-item-secondary'>
        <img
          src="https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?cs=srgb&dl=pexels-rickyrecap-1586298.jpg&fm=jpg"
          alt="Tropical beach destination"
          className='home-card-image shadow'
        />
        <span className='home-card-label'>Mountain</span>
      </div>
      <div className='home-card-item home-card-item-tertiary'>
        <img
          src="https://images.unsplash.com/photo-1653641141220-253b7de6ab13?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWxiZXJ0YSUyMGNhbmFkYXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Mountain destination landscape"
          className='home-card-image shadow'
        />
        <span className='home-card-label'>Beach</span>
      </div>
    </div>
  )
}

export default HomeCard
