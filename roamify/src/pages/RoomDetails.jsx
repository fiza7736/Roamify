import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { BOOKINGS_STORAGE_KEY, getAdminRooms, getRoomBookings, ROOMS_STORAGE_KEY, saveRoomBookings } from '../data/adminContent';
import { Container, Row, Col, Image, Badge, Button, Form, Alert } from 'react-bootstrap';
import useAdminCollection from '../hooks/useAdminCollection';

const createInitialReservation = () => ({
  fullName: '',
  email: '',
  phone: '',
  guests: 1,
  checkIn: '',
  checkOut: '',
  specialRequest: ''
});

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [room, setRoom] = useState(null);
  const [rooms] = useAdminCollection(getAdminRooms, ROOMS_STORAGE_KEY);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservation, setReservation] = useState(createInitialReservation);
  const [reservationError, setReservationError] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState('');
  const reservationFormRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const found = rooms.find(r => r.id === id);
    setRoom(found);
  }, [rooms, id]);

  useEffect(() => {
    if (searchParams.get('reserve') === 'true') {
      setShowReservationForm(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (showReservationForm) {
      requestAnimationFrame(() => {
        reservationFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [showReservationForm]);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const totalNights = useMemo(() => {
    if (!reservation.checkIn || !reservation.checkOut) {
      return 0;
    }

    const checkInDate = new Date(reservation.checkIn);
    const checkOutDate = new Date(reservation.checkOut);
    const diffInMs = checkOutDate - checkInDate;
    const nights = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;
  }, [reservation.checkIn, reservation.checkOut]);

  const totalPrice = useMemo(() => {
    const nightlyPrice = Number(room?.price || 0);
    return totalNights * nightlyPrice;
  }, [room?.price, totalNights]);

  const handleReservationChange = (event) => {
    const { name, value } = event.target;

    setReservation((prev) => ({
      ...prev,
      [name]: name === 'guests' ? Number(value) : value
    }));
    setReservationError('');
  };

  const handleOpenReservation = () => {
    setShowReservationForm(true);
    setSearchParams({ reserve: 'true' });
    setReservationSuccess('');
  };

  const handleReservationSubmit = (event) => {
    event.preventDefault();

    if (!reservation.fullName || !reservation.email || !reservation.phone || !reservation.checkIn || !reservation.checkOut) {
      setReservationError('Please fill in all reservation details before confirming.');
      return;
    }

    if (totalNights <= 0) {
      setReservationError('Check-out date must be after the check-in date.');
      return;
    }

    const nextBooking = {
      id: `booking-${Date.now()}`,
      roomId: room.id,
      roomName: room.placeName,
      location: room.location,
      pricePerNight: Number(room.price),
      ...reservation,
      totalNights,
      totalPrice,
      bookedAt: new Date().toISOString()
    };

    const existingBookings = getRoomBookings();
    saveRoomBookings([nextBooking, ...existingBookings]);

    setReservationSuccess(`Thank you for booking ${room.placeName} with Roamify! Your reservation is confirmed, and we can't wait to host you.`);
    setReservationError('');
    setReservation(createInitialReservation());
    setSearchParams({});
  };

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
                <Button
                  variant="dark"
                  className="w-100 rounded-pill py-3 fw-bold shadow mb-3"
                  style={{ backgroundColor: 'black', color: 'yellowgreen' }}
                  onClick={handleOpenReservation}
                >
                  Reserve Now
                </Button>
                <Button variant="outline-dark" className="w-100 rounded-pill py-3 fw-bold shadow-sm" onClick={() => navigate(-1)}>
                  Back to List
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {showReservationForm && (
          <Row className="mt-4">
            <Col lg={8}>
              <div ref={reservationFormRef} className="bg-white p-4 p-md-5 rounded shadow-sm">
                <h3 style={{ fontFamily: "Alan Sans", fontWeight: 'bold' }} className="mb-4">Reserve {room.placeName}</h3>

                {reservationSuccess && (
                  <Alert
                    variant="success"
                    className="rounded-4 border-0 shadow-sm"
                    style={{ backgroundColor: 'yellowgreen', color: 'black' }}
                  >
                    <Alert.Heading className="fw-bold mb-2" style={{ fontFamily: 'Alan Sans' }}>
                      Booking Confirmed
                    </Alert.Heading>
                    <p className="mb-1">{reservationSuccess}</p>
                    <p className="mb-0" style={{ color: 'black' }}>
                      We hope your stay is comfortable, relaxing, and full of great memories.
                    </p>
                  </Alert>
                )}

                {reservationError && (
                  <Alert variant="danger" className="rounded-4">{reservationError}</Alert>
                )}

                <Form onSubmit={handleReservationSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={reservation.fullName}
                          onChange={handleReservationChange}
                          placeholder="Enter your full name"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={reservation.email}
                          onChange={handleReservationChange}
                          placeholder="Enter your email"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={reservation.phone}
                          onChange={handleReservationChange}
                          placeholder="Enter your phone number"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Guests</Form.Label>
                        <Form.Select name="guests" value={reservation.guests} onChange={handleReservationChange}>
                          {[1, 2, 3, 4, 5, 6].map((guestCount) => (
                            <option key={guestCount} value={guestCount}>{guestCount} Guest{guestCount > 1 ? 's' : ''}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Check In</Form.Label>
                        <Form.Control
                          type="date"
                          name="checkIn"
                          min={today}
                          value={reservation.checkIn}
                          onChange={handleReservationChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Check Out</Form.Label>
                        <Form.Control
                          type="date"
                          name="checkOut"
                          min={reservation.checkIn || today}
                          value={reservation.checkOut}
                          onChange={handleReservationChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label className="fw-bold">Special Request</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="specialRequest"
                          value={reservation.specialRequest}
                          onChange={handleReservationChange}
                          placeholder="Any preferences or extra requests?"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="mt-4 p-4 rounded" style={{ backgroundColor: '#f7f9ef', border: '1px solid rgba(154, 205, 50, 0.35)' }}>
                    <div className="d-flex flex-wrap justify-content-between gap-3">
                      <div>
                        <div className="text-muted">Stay Summary</div>
                        <strong>{totalNights || 0} night{totalNights === 1 ? '' : 's'}</strong>
                      </div>
                      <div>
                        <div className="text-muted">Rate</div>
                        <strong>${room.price} / night</strong>
                      </div>
                      <div>
                        <div className="text-muted">Total</div>
                        <strong>${totalPrice || 0}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-3 mt-4">
                    <Button type="submit" variant="dark" className="px-4 py-2 fw-bold rounded-pill" style={{ backgroundColor: 'black', color: 'yellowgreen' }}>
                      Confirm Reservation
                    </Button>
                    <Button
                      type="button"
                      variant="outline-dark"
                      className="px-4 py-2 fw-bold rounded-pill"
                      onClick={() => {
                        setShowReservationForm(false);
                        setReservationError('');
                        setReservationSuccess('');
                        setSearchParams({});
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default RoomDetails;
