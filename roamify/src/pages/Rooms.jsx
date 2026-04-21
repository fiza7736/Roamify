import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAdminRooms, ROOMS_STORAGE_KEY } from '../data/adminContent';
import { Link } from 'react-router-dom';
import useAdminCollection from '../hooks/useAdminCollection';

function Rooms() {
  const [rooms] = useAdminCollection(getAdminRooms, ROOMS_STORAGE_KEY);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='container min-vh-100 mt-5 py-5'>
      <h1 style={{ fontFamily: "Luckiest Guy", color: "black", fontSize: "50px" }} className='text-center mt-5 mb-5' >ROOMS & Stays</h1> 

      <div className='d-flex flex-wrap gap-4 justify-content-center'>
        {rooms.map((room) => (
          <Card key={room.id} style={{ width: '20rem', borderRadius: "15px" }} className='shadow border-0 h-100'>
            <Card.Img 
              variant="top" 
              src={room.coverImage} 
              style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px", height: "200px", objectFit: "cover" }}
            />
          
            <Card.Body className='d-flex flex-column'>
              <div className='d-flex justify-content-between mb-2'>
                  <span className="badge text-dark bg-light border">{room.category}</span>
              </div>
              <Card.Title 
                style={{ fontFamily: "Alan Sans", fontSize:"1.3rem" }} 
                className='fw-bold'
              >
                {room.placeName}
              </Card.Title>
          
              <Card.Text className='mb-3 text-secondary'>
                <span className='d-block mb-2'><i className="fa-solid fa-location-dot me-1"></i> {room.location}</span>
          
                <span style={{ color: "goldenrod", margin: 0 }}>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </span>
                <span className="text-dark fw-bold ms-2 mt-2 d-block fs-5">${room.price} <span className="fs-6 fw-normal text-muted">/ night</span></span>
              </Card.Text>
          
              <div className='d-flex justify-content-between mt-auto pt-3 border-top'>
                <Link to={`/rooms/${room.id}`}>
                  <Button 
                    style={{ backgroundColor: "yellowgreen", color: "black", border: "none" }} 
                    className='fw-bold shadow-sm px-4 rounded'
                  >
                     Details
                  </Button>
                </Link>
          
                <Link to={`/rooms/${room.id}`}>
                  <Button 
                    style={{ backgroundColor: "black", color: "yellowgreen", border: "none" }} 
                    className='fw-bold shadow-sm px-4 rounded'
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    
    </div>
  )
}

export default Rooms
