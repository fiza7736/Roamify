import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { DESTINATIONS_STORAGE_KEY, getAdminDestinations } from '../data/adminContent';
import { getFavorites, toggleFavorite } from '../data/favoritesManager';
import useAdminCollection from '../hooks/useAdminCollection';











function Destination() {
  const [show, setShow] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations] = useAdminCollection(getAdminDestinations, DESTINATIONS_STORAGE_KEY);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const handleToggleFav = (e, id) => {
    e.preventDefault();
    if (id) {
      setFavorites([...toggleFavorite(id)]);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (destination) => {
    setSelectedDestination(destination)
    setShow(true)
  };


  return (
    <div>
      <h1 style={{ fontFamily: "Luckiest Guy", color: "black", fontSize: "50px" }} className='text-center mt-5'>DESTINATIONS</h1>

      <div className='destination-grid'>
        {destinations.map((destination) => (
          <Card key={destination.id} className='destination-card shadow-sm'>
            <Card.Img variant="top" src={destination.coverImage} className='destination-card-image' />
            <Card.Body className='destination-card-body'>
              <div className='destination-card-meta'>
                <span className='destination-chip'>{destination.pageName}</span>
                <span className='destination-location'>{destination.location}</span>
              </div>
              <Card.Title style={{ fontFamily: "Alan Sans" }} className='destination-card-title fw-bold'>{destination.placeName}</Card.Title>
              <p className='destination-card-text'>{destination.shortTagline || destination.about}</p>

              <div className='d-flex justify-content-between align-items-center mt-3'>
                <Button style={{ backgroundColor: "yellowgreen", color: "black" }} onClick={() => handleShow(destination)} variant="" className='fw-bold shadow rounded'>Details</Button>
                <button onClick={(e) => handleToggleFav(e, destination.id)} style={{ fontSize: "20px" }} className='btn border-0 p-0'>
                    <i className={favorites.includes(destination.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: "red" }}></i>
                </button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>


      <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Alan Sans" }} className='fw-bold'>{selectedDestination?.placeName?.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "yellowgreen" }}>
          {selectedDestination && <div className='row'>

            <div className='col-lg-6'>
              {(selectedDestination.galleryImages.length ? selectedDestination.galleryImages : [selectedDestination.coverImage]).map((image) => (
                <div key={image} className='destination-modal-image-wrap'>
                  <img src={image} alt={selectedDestination.placeName} className='destination-modal-image shadow' />
                </div>
              ))}
            </div>


            <div className='col-lg-6'>
              <h4 style={{ fontSize: "30px" }} className='mt-2 fw-bold text-center'>{selectedDestination.placeName} , {selectedDestination.location}</h4>
              <p style={{ fontSize: "11px" }} className='text-center'>"{selectedDestination.shortTagline}"</p>

              <ul className='mt-5'>
                <li className='mt-1'><span className='fw-bold'>Location:</span> {selectedDestination.locationDetail || selectedDestination.location}</li>
                <li className='mt-1'><span className='fw-bold'>Best Time to Visit:</span> {selectedDestination.bestTimeToVisit || 'Available year round'}</li>
                <li className='mt-1'><span className='fw-bold'>Entry Fee: </span>{selectedDestination.entryFee || 'Check local access rules'}</li>
              </ul>

              <h5 className='mt-5 fw-bold'>Why Visit {selectedDestination.placeName}?</h5>
              <ul style={{ fontSize: "15px" }}>
                {selectedDestination.whyVisit.map((item) => (
                  <li key={item} className='mt-1'>{item}</li>
                ))}
              </ul>

              <h5 className='fw-bold mt-4'>Things To Do</h5>
              <ul style={{ fontSize: "15px" }}>
                {selectedDestination.thingsToDo.map((item) => (
                  <li key={item} className='mt-1'>{item}</li>
                ))}
              </ul>

              <h5 className='fw-bold mt-4'>About {selectedDestination.placeName}</h5>
              <p style={{ fontSize: "14px", textAlign: "justify" }} className='mt-3'>{selectedDestination.about}</p>
              <h1 className="fadein-text" style={{ fontFamily: "Moon Dance", marginTop: "50px" }}>
                “Go visit and feel the magic!!!”
              </h1>




            </div>
          </div>
          }



        </Modal.Body>
        <Modal.Footer>
          <Button 
            style={{ backgroundColor: "yellowgreen", color: "black" }} 
            variant="" 
            className='fw-bold shadow-sm'
            onClick={(e) => handleToggleFav(e, selectedDestination?.id)}
          >
            {favorites.includes(selectedDestination?.id) ? 'Remove From Wishlist' : 'Add To Wishlist'}
          </Button>
          <Button style={{ backgroundColor: "black", color: "yellowgreen" }} variant="" className='shadow-sm' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  )
}

export default Destination
