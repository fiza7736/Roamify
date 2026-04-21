import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminRooms, ROOMS_STORAGE_KEY } from '../data/adminContent';
import { Container, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import useAdminCollection from '../hooks/useAdminCollection';

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [rooms] = useAdminCollection(getAdminRooms, ROOMS_STORAGE_KEY);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const found = rooms.find(r => r.id === id);
    setRoom(found);
  }, [rooms, id]);

  if (!room) {
    return (
      <Container className="text-center mt-5" style={{ minHeight: '60vh', paddingTop: '100px' }}>
        <h2 style={{ fontFamily: "Luckiest Guy", color: 'black' }}>Room Not Found</h2>
        <Button variant="dark" onClick={() => navigate(-1)} className="mt-4 px-4 py-2 rounded-pill fw-bold" style={{ backgroundColor: 'black', color: 'yellowgreen' }}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', paddingBottom: '80px' }}>
      {/* Hero Banner */}
      <div style={{ position: 'relative', height: '60vh', width: '100%', overflow: 'hidden' }}>
        <img 
          src={room.coverImage} 
          alt={room.placeName} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', color: 'white'
        }}>
          <h1 style={{ fontFamily: "Luckiest Guy", fontSize: 'clamp(3rem, 8vw, 6rem)', textShadow: '2px 4px 6px rgba(0,0,0,0.5)', textAlign: 'center', padding: '0 20px' }}>
            {room.placeName}
          </h1>
          <h4 style={{ fontFamily: "Macondo", fontSize: 'clamp(1.2rem, 3vw, 2rem)', marginTop: '10px', textAlign: 'center', padding: '0 20px' }}>
            {room.location}
          </h4>
        </div>
      </div>

      <Container className="mt-5">
        <Row className="g-4">
          {/* Main Description */}
          <Col lg={8}>
            <div className="bg-white p-4 p-md-5 rounded shadow-sm mb-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 style={{ fontFamily: "Alan Sans", fontWeight: 'bold', margin: 0 }}>About {room.placeName}</h3>
                  <Badge bg="light" text="dark" className="border fs-6 p-2 shadow-sm">{room.category}</Badge>
              </div>
              <p className="text-secondary" style={{ lineHeight: '1.9', fontSize: '1.1rem' }}>
                {room.about}
              </p>
              
              {room.amenities && room.amenities.length > 0 && (
                <div className="mt-5 pt-4 border-top">
                  <h4 style={{ fontFamily: "Alan Sans", fontWeight: 'bold', marginBottom: '20px' }}>Amenities</h4>
                  <div className="d-flex flex-wrap gap-3 text-secondary">
                    {room.amenities.map((amenity, index) => (
                      <span key={index} className="px-3 py-2 bg-light border rounded">
                        <i className="fa-solid fa-check text-success me-2"></i> {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Images */}
            {room.galleryImages && room.galleryImages.length > 0 && (
              <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <h3 className="mb-4" style={{ fontFamily: "Alan Sans", fontWeight: 'bold' }}>Gallery</h3>
                <Row className="g-3">
                  {room.galleryImages.map((imgUrl, idx) => (
                    <Col xs={6} md={4} key={idx}>
                      <Image src={imgUrl} fluid rounded className="shadow-sm" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>

          {/* Quick Info Sidebar */}
          <Col lg={4}>
            <div className="bg-white p-4 p-md-5 rounded shadow-sm sticky-top" style={{ top: '100px', borderTop: '5px solid yellowgreen' }}>
              <div className="text-center mb-4 pb-4 border-bottom">
                 <h2 className="fw-bold m-0" style={{ fontSize: '3rem' }}>${room.price}</h2>
                 <p className="text-muted m-0 fw-bold">per night</p>
              </div>
              
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 fs-4" style={{ color: "yellowgreen" }}>🛏️</div>
                <div>
                  <strong className="d-block mb-1">Bed Type</strong>
                  <span className="text-secondary">{room.bedType || 'Standard'}</span>
                </div>
              </div>
              
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 fs-4" style={{ color: "black" }}>📐</div>
                <div>
                  <strong className="d-block mb-1">Room Size</strong>
                  <span className="text-secondary">{room.roomSize || 'Not specified'}</span>
                </div>
              </div>

              <div className="pt-2 mt-4">
                <Button variant="dark" className="w-100 rounded-pill py-3 fw-bold shadow mb-3" style={{ backgroundColor: 'black', color: 'yellowgreen' }}>
                  Reserve Now
                </Button>
                <Button variant="outline-dark" className="w-100 rounded-pill py-3 fw-bold shadow-sm" onClick={() => navigate(-1)}>
                  Back to List
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RoomDetails;
