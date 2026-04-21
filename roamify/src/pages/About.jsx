import React from 'react'
import Header from '../components/Header'

function About() {
  return (
    <>
      <h1 style={{ fontFamily: "Luckiest Guy", color: "black", fontSize: "50px" }} className='text-center mt-5'>About Us</h1>
      <h4 style={{ fontFamily: "red hat display" }} className='text-center fs-4' ><span className='fw-bold fs-3'>Roamify</span>-🌄“Discover destinations. Book your stay. Roamify your world.”🌌 </h4>

      <div style={{ marginLeft: "60px" }} className='row mt-5 '>

        <div className='col-lg-3 mt-2'>
          <img src="https://media.istockphoto.com/id/2147497907/photo/young-woman-traveler-relaxing-and-enjoying-the-tropical-sea-while-traveling-for-summer.jpg?s=612x612&w=0&k=20&c=iY2aqFsXX9Hzq_KwAZhy3ug74z0y7KHxUc_msPHyKzU=" alt="" className='img-fluid shadow' />
        </div>

        <div className='col-lg-5'>
          <p style={{ textAlign: "justify", fontFamily: "quicksand" }} className=''>Roamify is a modern travel destination discovery platform that helps users explore, plan, and experience beautiful destinations around the world with ease.
            Roamify is a modern travel discovery and accommodation booking platform designed to inspire wanderers and simplify travel planning. It allows users to explore beautiful destinations across the world, discover top attractions, and book comfortable stays — all in one place.
            With its clean interface and user-friendly design, Roamify helps travelers make smart choices by providing detailed destination information, high-quality images, and seamless room booking options. Whether you’re planning your next vacation or just exploring new places, Roamify makes every journey memorable and hassle-free.
          </p>
        </div>


        <div className='col-lg-3 mt-2'>
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/1d/a0/69/caption.jpg?w=1200&h=-1&s=1" alt="" className='img-fluid shadow' />
        </div>

      </div>


      <div style={{ marginLeft: "40px" }} className='row mt-5'>

        <div style={{ backgroundColor: "white" }} className='col-lg-4 d-flex shadow rounded'>

          <div >
            <button style={{ fontSize: "25px", backgroundColor: "yellowgreen", borderRadius: "50%" }} className='mt-2 p-2 '>
              <i className="fa-solid fa-earth-americas"></i>
            </button>
          </div>
          <div className='ms-3 mt-1'>
            <h5 style={{ fontSize: "15px" }} className='fw-bold'>Best travel destinations</h5>
            <p style={{ fontSize: "12px", textAlign: "justify" }}>Discover the most captivating tourist places that showcase <br /> the true beauty and culture of our region.🌄</p>
          </div>
        </div>


        <div style={{ backgroundColor: "white" }} className='col-sm-2 d-flex shadow rounded ms-2'>

          <div>
            <button style={{ fontSize: "25px", backgroundColor: "yellowgreen", borderRadius: "50%" }} className='mt-2 p-2 '><i className="fa-solid fa-location-dot"></i></button>
          </div>
          <div className='ms-3 mt-2'>
            <h5 style={{ fontSize: "15px" }} className='fw-bold'>4200+</h5>
            <h5 style={{ fontSize: "12px" }}> Beautiful places</h5>
          </div>





        </div>

        <div style={{ backgroundColor: "white" }} className='col-lg-3 d-flex shadow rounded ms-2'>

          <div >
            <button style={{ fontSize: "25px", backgroundColor: "yellowgreen", borderRadius: "50%" }} className='mt-2 p-2 '>
              <i className="fa-solid fa-city" ></i>
            </button>
          </div>
          <div className='ms-3 mt-1'>
            <h5 style={{ fontSize: "15px" }} className='fw-bold'>Best stay options</h5>
            <p style={{ fontSize: "12px", textAlign: "justify" }}>Each room is curated to provide warmth, <br /> comfort, and a premium stay experience.⛺️</p>
          </div>
        </div>

        <div style={{ backgroundColor: "white" }} className='col-lg-2 rounded shadow ms-2 d-flex'>
          <div>
            <button style={{ backgroundColor: "yellowgreen", fontSize: "25px", borderRadius: "50%" }} className='mt-2 p-2'><i className="fa-solid fa-house"></i></button>
          </div>
          <div className='ms-3 mt-2'>
            <h5 style={{ fontSize: "15px" }} className='fw-bold'>6200+</h5>
            <h5 style={{ fontSize: "12px" }}>Accomodation</h5>
          </div>

        </div>





      </div>


      <h5 style={{color:"black",fontFamily:"Alan Sans"}} className='mt-5 text-center fw-bold'>“Discover your next destination and the perfect stay — only with Roamify.” 🌏✨</h5>



    </>
  )
}

export default About
