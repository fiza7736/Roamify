import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DESTINATIONS_STORAGE_KEY, getAdminDestinations } from '../data/adminContent';
import { Container, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import useAdminCollection from '../hooks/useAdminCollection';

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [destinations] = useAdminCollection(getAdminDestinations, DESTINATIONS_STORAGE_KEY);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const found = destinations.find(dest => dest.id === id);
    setDestination(found);
  }, [destinations, id]);

  if (!destination) {
    return (
      <Container className="text-center mt-5" style={{ minHeight: '60vh', paddingTop: '100px' }}>
        <h2 style={{ fontFamily: "Luckiest Guy", color: 'black' }}>Destination Not Found</h2>
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
          src={destination.coverImage} 
          alt={destination.placeName} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', color: 'white'
        }}>
          <h1 style={{ fontFamily: "Luckiest Guy", fontSize: 'clamp(3rem, 8vw, 6rem)', textShadow: '2px 4px 6px rgba(0,0,0,0.5)', textAlign: 'center', padding: '0 20px' }}>
            {destination.placeName}
          </h1>
          <h4 style={{ fontFamily: "Macondo", fontSize: 'clamp(1.2rem, 3vw, 2rem)', marginTop: '10px', textAlign: 'center', padding: '0 20px' }}>
            {destination.location} {destination.locationDetail ? `(${destination.locationDetail})` : ''}
          </h4>
        </div>
      </div>

      <Container className="mt-5">
        <Row className="g-4">
          {/* Main Description */}
          <Col lg={8}>
            <div className="bg-white p-4 p-md-5 rounded shadow-sm mb-4">
              <h3 style={{ fontFamily: "Alan Sans", fontWeight: 'bold' }}>About {destination.placeName}</h3>
              <p className="mt-4 text-secondary" style={{ lineHeight: '1.9', fontSize: '1.1rem' }}>
                {destination.about}
              </p>
              
              {destination.whyVisit && destination.whyVisit.length > 0 && (
                <div className="mt-5">
                  <h4 style={{ fontFamily: "Alan Sans", fontWeight: 'bold' }}>Why Visit?</h4>
                  <ul className="mt-4 text-secondary" style={{ lineHeight: '1.9', fontSize: '1.05rem', paddingLeft: '20px' }}>
                    {destination.whyVisit.map((reason, index) => (
                      <li key={index} className="mb-2">{reason}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Gallery Images */}
            {destination.galleryImages && destination.galleryImages.length > 0 && (
              <div className="bg-white p-4 p-md-5 rounded shadow-sm">
                <h3 className="mb-4" style={{ fontFamily: "Alan Sans", fontWeight: 'bold' }}>Gallery</h3>
                <Row className="g-3">
                  {destination.galleryImages.map((imgUrl, idx) => (
                    <Col xs={6} md={4} key={idx}>
                      <Image src={imgUrl} fluid rounded className="shadow" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>

          {/* Quick Info Sidebar */}
          <Col lg={4}>
            <div className="bg-white p-4 p-md-5 rounded shadow-sm sticky-top" style={{ top: '100px', borderTop: '5px solid yellowgreen' }}>
              <h4 className="mb-4" style={{ fontFamily: "Alan Sans", fontWeight: 'bold' }}>Trip Details</h4>
              
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 fs-4" style={{ color: "yellowgreen" }}>🗓️</div>
                <div>
                  <strong className="d-block mb-1">Best Time to Visit</strong>
                  <span className="text-secondary">{destination.bestTimeToVisit || 'Year-round'}</span>
                </div>
              </div>
              
              <div className="mb-4 d-flex align-items-start">
                <div className="me-3 fs-4" style={{ color: "black" }}>🎟️</div>
                <div>
                  <strong className="d-block mb-1">Entry Fee</strong>
                  <span className="text-secondary">{destination.entryFee || 'Free or variable'}</span>
                </div>
              </div>

              {destination.thingsToDo && destination.thingsToDo.length > 0 && (
                <div className="mb-4 border-top pt-4">
                  <strong className="d-block mb-3">Top Activities</strong>
                  <div className="d-flex flex-wrap gap-2 text-secondary">
                    {destination.thingsToDo.map((thing, i) => (
                      <Badge bg="light" text="dark" className="p-2 border fw-normal shadow-sm" key={i}>
                        {thing}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-top pt-4 mt-2">
                <Button variant="dark" className="w-100 rounded-pill py-3 fw-bold shadow" style={{ backgroundColor: 'black', color: 'yellowgreen' }} onClick={() => navigate(-1)}>
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

export default DestinationDetails;
