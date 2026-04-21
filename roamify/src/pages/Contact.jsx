import React from 'react'

function Contact() {
  return (
    <div>
      <h1 style={{ fontFamily: "Luckiest Guy", color: "black", fontSize: "50px" }} className='text-center mt-5'>Contact Us</h1>


      <div className='row'>


        <div className='col-lg-6'>

          <div style={{ backgroundColor: "yellowgreen", width: "300px", marginLeft: "170px" }} className='text-center p-3 mt-5 rounded shadow '>
            <div style={{ fontSize: "25px" }}>
              <i className="fa-solid fa-phone" ></i>
            </div>
            <h5 className='mt-2 fw-bold'>Phone Number</h5>
            <p>881-738-449</p>
          </div>

          <div style={{ backgroundColor: "yellowgreen", width: "300px", marginLeft: "170px" }} className='text-center p-3 mt-5 rounded shadow '>
            <div style={{ fontSize: "25px" }}>
              <i className="fa-solid fa-envelope" ></i>
            </div>
            <h5 className='mt-2 fw-bold'>Email Address</h5>
            <p>roamify@gmail.com</p>
          </div>

          <div style={{ backgroundColor: "yellowgreen", width: "300px", marginLeft: "170px" }} className='text-center p-3 mt-5 rounded shadow'>
            <div style={{ fontSize: "25px" }}>
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h5 className='mt-2 fw-bold'>Our Location</h5>
            <p>8891 Oak ridge omaha,alaska </p>
          </div>

        </div>


       <div className='col-lg-6'>

        <div style={{backgroundColor:"white",width:"450px",}} className='mt-3 ms-5 p-3 rounded shadow'>
        <h2 style={{fontFamily:"Alan Sans",color:"yellowgreen"}} className=' fw-bold'>Get In Touch</h2>
       <p style={{fontSize:"14px"}} className='mt-2'>"Have something on your mind? We’re here to help!!<br /> Get in touch with us."</p>
       
       <div>
        <label className='fw-bold' htmlFor="">Name :</label><br /><input className='mt-2 p-1 rounded shadow w-100' type="text" placeholder='Your name' />
       </div>

       <div className='mt-2'>
        <label className='fw-bold' htmlFor="">Email :</label><br /><input className='mt-2 p-1 rounded shadow w-100 '  type="email" placeholder='xyz@gmail.com' />
       </div>

       <div className='mt-2'>
        <label className='fw-bold ' htmlFor="">Subject :</label><br /><input className='mt-2 p-1 rounded shadow w-100' type="text" placeholder='Topic' />
       </div>

       <div className='mt-2'>
        <label className='fw-bold' htmlFor="">Message :</label><br /><textarea className='mt-2 p-1 rounded shadow' name="" id="" cols="40" rows="5" placeholder='Type here....'></textarea>
       </div>

       <button style={{backgroundColor:"yellowgreen",fontFamily:"Alan Sans"}} className='w-100 mt-3 p-2 rounded shadow fw-bold'>Send Now</button>
       
        </div>


        </div>
      </div>
    </div>
  )
}

export default Contact
