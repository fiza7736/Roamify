import React from 'react'
import { Card } from 'react-bootstrap'


function DesignCard() {
    return (
        <div className='design-card-grid'>
            <Card className='design-card design-card-wide'>
                <Card.Img variant="top" src="https://www.travelandleisure.com/thmb/YhlLO01i9ZVBivhoa61fRc6eTxg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/torres-del-paine-national-park-chile-MOSTBEAUTIFUL0921-4dfe4d2e67aa4f28ace7cf7cd21f4c8c.jpg" className='design-card-image shadow' />
            </Card>

            <Card className='design-card design-card-tall'>
                <Card.Img variant="top" src="https://cdna.artstation.com/p/assets/images/images/001/091/028/large/genesis-raz-von-edler-the-most-beautiful-view-by-razielmb-c.jpg?1439852038" className='design-card-image shadow' />
            </Card>

            <Card className='design-card design-card-tall'>
                <Card.Img variant="top" src="https://i.pinimg.com/564x/ee/cf/21/eecf216dcbab04f86da69b01836661b7.jpg" className='design-card-image shadow' />
            </Card>

            <Card className='design-card design-card-small'>
                <Card.Img variant="top" src="https://images.unsplash.com/photo-1748164521179-ae3b61c6dd90?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8" className='design-card-image shadow' />
            </Card>

            <Card className='design-card design-card-small'>
                <Card.Img variant="top" src="https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?cs=srgb&dl=pexels-mohamedelaminemsiouri-2245436.jpg&fm=jpg" className='design-card-image shadow' />
            </Card>

            <Card className='design-card design-card-wide'>
                <Card.Img variant="top" src="https://wallpapers.com/images/hd/maldives-resort-boardwalk-uhd-itotcypokg29d0o7.jpg" className='design-card-image shadow' />
            </Card>
        </div>
    )
}

export default DesignCard
