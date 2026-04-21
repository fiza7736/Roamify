import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {
  DESTINATIONS_STORAGE_KEY,
  ROOMS_STORAGE_KEY,
  getAdminDestinations,
  getAdminRooms
} from '../data/adminContent';
import { getFavorites, toggleFavorite } from '../data/favoritesManager';
import useAdminCollection from '../hooks/useAdminCollection';

function Service() {
  const [openDestination, setOpenDestination] = useState(false)
  const [openStay, setOpenStay] = useState(false)
  
  const [destinations] = useAdminCollection(getAdminDestinations, DESTINATIONS_STORAGE_KEY)
  const [rooms] = useAdminCollection(getAdminRooms, ROOMS_STORAGE_KEY)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0);
    setFavorites(getFavorites())
  }, [])

  const handleToggleFav = (e, id) => {
    e.preventDefault();
    setFavorites([...toggleFavorite(id)]);
  };

  const STAY_CATEGORIES = ['Deluxe Room', 'Premium Rooms', 'Luxury Room', 'Supreme Deluxe', 'Villas', 'Resorts'];

  const getFilteredItems = () => {
    if (selectedCategory === 'All') return { type: 'destinations', items: destinations };
    
    if (STAY_CATEGORIES.includes(selectedCategory)) {
      return { 
        type: 'rooms', 
        items: rooms.filter(room => room.category === selectedCategory) 
      };
    }
    
    return { 
      type: 'destinations', 
      items: destinations.filter(dest => dest.category === selectedCategory) 
    };
  };

  const { type: currentType, items: filteredItems } = getFilteredItems();

  return (
    <>
      <div className='row m-0'>
        <div className="col-lg-3 p-5 mt-5">

          <button style={{ color: "black" }} className='btn fw-bold w-100 text-start d-flex justify-content-between align-items-center'
            onClick={() => setOpenDestination(!openDestination)}
            aria-controls="destination"
            aria-expanded={openDestination}
          >
            Destinations <span>{openDestination ? '▼' : '▶'}</span>
          </button>
          <Collapse in={openDestination}>
            <div id="destination" className='ms-4 mt-2'>
              <button className={`btn w-100 text-start ${selectedCategory === 'Mountains' ? 'fw-bold text-success' : ''}`} onClick={() => setSelectedCategory('Mountains')}> Mountains</button>
              <button className={`btn w-100 text-start ${selectedCategory === 'Beaches' ? 'fw-bold text-success' : ''}`} onClick={() => setSelectedCategory('Beaches')}> Beaches</button>
              <button className={`btn w-100 text-start ${selectedCategory === 'Waterfalls' ? 'fw-bold text-success' : ''}`} onClick={() => setSelectedCategory('Waterfalls')}> Waterfalls</button>
              <button className={`btn w-100 text-start ${selectedCategory === 'Lakes' ? 'fw-bold text-success' : ''}`} onClick={() => setSelectedCategory('Lakes')}> Lakes</button>
              <button className={`btn w-100 text-start mt-2 border-top rounded-0 pt-2 ${selectedCategory === 'All' ? 'fw-bold text-success' : ''}`} onClick={() => setSelectedCategory('All')}> Show All</button>
            </div>
          </Collapse><br />

          <button style={{ color: "black" }} className='btn fw-bold w-100 text-start d-flex justify-content-between align-items-center'
            onClick={() => setOpenStay(!openStay)}
            aria-controls="stay"
            aria-expanded={openStay}
          >
            Where to stay <span>{openStay ? '▼' : '▶'}</span>
          </button>
          <Collapse in={openStay}>
            <div id="stay" className='ms-4 mt-2'>
              {STAY_CATEGORIES.map(cat => (
                <button key={cat} className={`btn w-100 text-start ${selectedCategory === cat ? 'fw-bold text-success' : ''}`} onClick={() => setSelectedCategory(cat)}> {cat}</button>
              ))}
            </div>
          </Collapse>
        </div>


        <div className="col-lg-9 p-5 mt-md-0 mt-n5">
          <div className='d-flex justify-content-between align-items-center'>
            <h1 className='fw-bold' style={{ fontFamily: "Luckiest Guy", letterSpacing: '2px' }}>
              {selectedCategory === 'All' ? 'All Destinations' : selectedCategory}
            </h1>
            <button style={{ fontSize: "35px" }} className='btn border-0'>
              <Link to={'/favourites'}> <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
              </Link>
            </button>
          </div>
          <hr />

          <div className='d-flex flex-wrap gap-4 mt-4'>

            {filteredItems.map(item => (
              <Card key={item.id} style={{ width: '18rem' }} className='shadow-sm h-100 border-0'>
                <Card.Img variant="top" src={item.coverImage} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body className='d-flex flex-column'>
                  <Card.Title style={{ fontFamily: "Alan Sans" }} className='fw-bold'>{item.placeName}</Card.Title>
                  <p className="text-secondary mb-2"><i className="fa-solid fa-location-dot me-1"></i> {item.location}</p>
                  
                  {currentType === 'rooms' && (
                    <div className="mb-3">
                       <span style={{ color: "goldenrod", margin: 0 }}>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                       </span>
                       <span className="text-dark fw-bold ms-2 d-block fs-5 mt-1">${item.price} <span className="fs-6 fw-normal text-muted">/ night</span></span>
                    </div>
                  )}

                  <div className='d-flex justify-content-between align-items-center mt-auto pt-3 border-top'>
                    {currentType === 'destinations' ? (
                      <Link to={`/destination/${item.id}`}>
                        <Button style={{ backgroundColor: "yellowgreen", color: "black", border: 'none' }} className='fw-bold shadow-sm rounded px-4'>Details</Button>
                      </Link>
                    ) : (
                      <Link to={`/rooms/${item.id}`}>
                        <Button style={{ backgroundColor: "black", color: "yellowgreen", border: 'none' }} className='fw-bold shadow-sm rounded px-4'>Book Now</Button>
                      </Link>
                    )}
                    <button onClick={(e) => handleToggleFav(e, item.id)} style={{ fontSize: "20px" }} className='btn border-0 py-0'>
                        <i className={favorites.includes(item.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: "red", transition: '0.2s' }}></i>
                    </button>
                  </div>
                </Card.Body>
              </Card>
            ))}

            {filteredItems.length === 0 && (
              <div className="mt-5 w-100 text-center py-5 bg-light rounded border">
                <div className="fs-1 mb-3">🔍</div>
                <h4 className="text-secondary" style={{ fontFamily: "Alan Sans" }}>No {currentType} found in this category.</h4>
                <p className="text-muted">You can add new "{selectedCategory}" items via the Admin console!</p>
              </div>
            )}

          </div>

        </div>

      </div>

    </>
  )
}

export default Service
