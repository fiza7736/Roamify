import React from 'react'
import Card from 'react-bootstrap/Card';
import { DESTINATIONS_STORAGE_KEY, getHomepageDestinations } from '../data/adminContent';
import { Link } from 'react-router-dom';
import useAdminCollection from '../hooks/useAdminCollection';


function Placecard() {
  const [destinations] = useAdminCollection(
    getHomepageDestinations,
    DESTINATIONS_STORAGE_KEY
  )

  return (
    <>

      <div className='destination-grid mt-5'>
        {destinations.map((destination) => (
          <Link to={`/destination/${destination.id}`} key={destination.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='destination-card shadow-sm h-100'>
              <Card.Img variant="top" src={destination.coverImage} className='destination-card-image' />
              <Card.Body className='destination-card-body'>
                <div className='destination-card-meta'>
                  <span className='destination-chip'>{destination.pageName}</span>
                  <span className='destination-location'>{destination.location}</span>
                </div>
                <Card.Title style={{ fontFamily: "Alan Sans" }} className='destination-card-title'>{destination.placeName}</Card.Title>
                <Card.Text className='destination-card-text'>
                  {destination.shortTagline || destination.about}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>

    </>
  )
}

export default Placecard
