import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
      <footer style={{ backgroundColor: "yellowgreen", marginTop: "120px" }} className='footer-shell'>
        <div className='footer-orb footer-orb-left'></div>
        <div className='footer-orb footer-orb-right'></div>

        <div className='footer-wrap row g-4'>
          <div className="col-lg-6">
            <div className='footer-card footer-brand-card'>
              <h3 style={{ fontFamily: "Alan sans" }} className='fs-1 mb-3'>Roamify</h3>
              <p style={{ textAlign: "justify" }} className='footer-brand-copy'>Roamify is a modern travel discovery and accommodation booking platform designed to inspire wanderers and simplify travel planning. It allows users to explore beautiful destinations across the world, discover top attractions, and book comfortable stays — all in one place.
With its clean interface and user-friendly design, Roamify helps travelers make smart choices by providing detailed destination information, high-quality images, and seamless room booking options. Whether you’re planning your next vacation or just exploring new places, Roamify makes every journey memorable and hassle-free.
“Discover your next destination and the perfect stay — only with Roamify.”</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className='footer-card footer-link-card'>
              <h3 style={{ fontFamily: "Alan sans" }}>Links</h3>
              <div className='mt-4 footer-link-stack'>
                <Link className='text-decoration-none d-block text-black footer-link' to={'/'}>Home</Link>
                <Link className='text-decoration-none d-block text-black footer-link' to={'/service'}>Service</Link>
                <Link className='text-decoration-none d-block text-black footer-link' to={'/destination'}>Destination</Link>
                <Link className='text-decoration-none d-block text-black footer-link' to={'/rooms'}>Stay</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className='footer-card footer-contact-card'>
              <h3 style={{ fontFamily: "Alan sans" }}>Contact Us</h3>

              <div className='mt-4'>
                <div className='footer-input-row'>
                  <input type="text" className='form-control footer-input shadow-sm' placeholder='enter email' />
                  <button style={{ backgroundColor: "black" }} className='btn footer-submit-btn shadow-sm'><i style={{ color: "yellowgreen" }} className="fa-solid fa-arrow-right"></i></button>
                </div>

                <div className='footer-socials mt-4'>
                  <i className="fa-brands fa-github fa-xl text-black"></i>
                  <i className="fa-brands fa-linkedin fa-xl text-black"></i>
                  <i className="fa-brands fa-facebook fa-xl text-black"></i>
                  <i className="fa-brands fa-twitter fa-xl text-black"></i>
                  <i className="fa-brands fa-instagram fa-xl text-black"></i>
                  <i className="fa-solid fa-phone fa-xl text-black"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className='footer-bottom text-center text-black mb-0'>Copyright © april 2025 batch, Roamify, Built with rect. </p>
      </footer>
    </>
  )
}

export default Footer
