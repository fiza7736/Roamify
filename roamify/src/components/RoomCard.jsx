import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { getAdminRooms, ROOMS_STORAGE_KEY } from '../data/adminContent';
import useAdminCollection from '../hooks/useAdminCollection';

function RoomCard() {
  const [rooms] = useAdminCollection(getAdminRooms, ROOMS_STORAGE_KEY);

  return (
    <div className='room-card-grid mt-5'>

      {rooms.slice(0, 4).map((room) => (
        <Card key={room.id} className='destination-card room-card-preview shadow-sm h-100'>
          <Card.Img variant="top" src={room.coverImage} className='destination-card-image' />
          <Card.Body className='destination-card-body d-flex flex-column'>
            <div className='destination-card-meta'>
              <span className='destination-chip'>{room.category}</span>
              <span className='destination-location'>{room.location}</span>
            </div>
            <Card.Title style={{fontFamily:"Alan Sans"}} className='destination-card-title fw-bold'>{room.placeName}</Card.Title>
            <Card.Text className="destination-card-text room-card-text">
              {room.shortTagline ? `"${room.shortTagline}"` : room.about}
            </Card.Text>
            
            <div className='d-flex justify-content-between align-items-center mt-auto pt-3 border-top room-card-footer'>
              <span className='room-card-price'>${room.price}<small> / night</small></span>
              <Link to={`/rooms/${room.id}`} style={{textDecoration:"none"}}>
                <Button style={{backgroundColor:"black", border: 'none', color: "yellowgreen"}} className='fw-bold shadow-sm px-4 rounded room-card-preview-btn'>Reserve Room</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
        ))}

    </div>
  )
}

export default RoomCard
