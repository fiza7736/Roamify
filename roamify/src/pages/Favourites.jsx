import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { DESTINATIONS_STORAGE_KEY, getAdminDestinations } from '../data/adminContent';
import { getFavorites, toggleFavorite } from '../data/favoritesManager';
import useAdminCollection from '../hooks/useAdminCollection';

function Favourites() {
  const [destinations] = useAdminCollection(getAdminDestinations, DESTINATIONS_STORAGE_KEY);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFavorites(getFavorites());
  }, []);

  const handleToggleFav = (e, id) => {
    e.preventDefault();
    setFavorites([...toggleFavorite(id)]);
  };

  const favoriteDestinations = destinations.filter(dest => favorites.includes(dest.id));

  return (
    <div className='container min-vh-100 py-5 mt-5'>
      <div className='d-flex align-items-center mb-5 border-bottom pb-4'>
        <h1 style={{ fontFamily: "Luckiest Guy", color: "black", fontSize: "clamp(30px, 5vw, 50px)", margin: 0 }}>
          My <span style={{color:'yellowgreen'}}>Wishlist</span>
        </h1>
        <div className="ms-3 fs-3 text-danger">
          <i className="fa-solid fa-heart"></i>
        </div>
      </div>

      {favoriteDestinations.length === 0 ? (
        <div className="text-center py-5 my-5 bg-light rounded shadow-sm border">
          <h2 style={{ fontFamily: "Alan Sans" }} className="text-secondary mb-3">Your wishlist is empty!</h2>
          <p className="text-muted mb-4">Start exploring the world and save your favorite places here.</p>
          <Link to="/service">
            <Button variant="dark" className="rounded-pill px-5 py-3 fw-bold" style={{ backgroundColor: "black", color: "yellowgreen" }}>
              Explore Destinations
            </Button>
          </Link>
        </div>
      ) : (
        <div className='d-flex flex-wrap gap-4'>
          {favoriteDestinations.map(dest => (
            <Card key={dest.id} style={{ width: '18rem' }} className='shadow-sm h-100 border-0'>
              <Card.Img variant="top" src={dest.coverImage} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body className='d-flex flex-column'>
                <div className='d-flex justify-content-between mb-2'>
                  <span className="badge text-dark bg-light border">{dest.pageName}</span>
                </div>
                <Card.Title style={{ fontFamily: "Alan Sans", fontSize: "1.2rem" }} className='fw-bold mb-1'>{dest.placeName}</Card.Title>
                <p className="text-secondary small mb-3"><i className="fa-solid fa-location-dot me-1"></i> {dest.location}</p>
                <div className='d-flex justify-content-between align-items-center mt-auto pt-3 border-top'>
                  <Link to={`/destination/${dest.id}`}>
                    <Button style={{ backgroundColor: "yellowgreen", color: "black", border: 'none' }} className='fw-bold shadow-sm rounded px-4'>Details</Button>
                  </Link>
                  <button onClick={(e) => handleToggleFav(e, dest.id)} style={{ fontSize: "20px" }} className='btn border-0 py-0' title="Remove from wishlist">
                    <i className="fa-solid fa-heart" style={{ color: "red", transition: '0.2s' }}></i>
                  </button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favourites
