import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BOOKINGS_STORAGE_KEY,
  createDestinationPayload,
  createFormDataFromDestination,
  emptyDestinationForm,
  getAdminDestinations,
  saveAdminDestinations,
  getAdminRooms,
  getRoomBookings,
  saveAdminRooms,
  saveRoomBookings,
  emptyRoomForm,
  createRoomPayload,
  createFormDataFromRoom
} from '../data/adminContent'
import useAdminCollection from '../hooks/useAdminCollection'

const recentActivities = [
  { title: 'Luxury room approval', description: 'Maldives Pearl Villa was reviewed and published.', time: '10 min ago' },
  { title: 'Seasonal pricing update', description: 'Kerala backwater packages were updated for summer.', time: '45 min ago' },
  { title: 'New user milestone', description: 'Roamify crossed 5,000 registered travelers.', time: '2 hrs ago' }
]

const quickActions = [
  'Review new room listings',
  'Publish destination offers',
  'Respond to pending customer issues',
  'Track signups and bookings'
]

function Admin() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  
  // Toggles the editor
  const [activeTab, setActiveTab] = useState('destinations')

  // DESTINATION STATES
  const [destinations, setDestinations] = useState([])
  const [destFormData, setDestFormData] = useState(emptyDestinationForm)
  const [destEditingId, setDestEditingId] = useState(null)
  const [destCoverName, setDestCoverName] = useState('')
  const [destGalleryNames, setDestGalleryNames] = useState([])

  // ROOM STATES
  const [rooms, setRooms] = useState([])
  const [roomFormData, setRoomFormData] = useState(emptyRoomForm)
  const [roomEditingId, setRoomEditingId] = useState(null)
  const [roomCoverName, setRoomCoverName] = useState('')
  const [roomGalleryNames, setRoomGalleryNames] = useState([])
  const [bookings] = useAdminCollection(getRoomBookings, BOOKINGS_STORAGE_KEY)

  useEffect(() => {
    const storedUser = sessionStorage.getItem('existingUser')
    if (!storedUser) {
      navigate('/login')
      return
    }
    const parsedUser = JSON.parse(storedUser)
    if (parsedUser?.userType !== 'admin') {
      navigate('/login')
      return
    }

    setCurrentUser(parsedUser)
    setDestinations(getAdminDestinations())
    setRooms(getAdminRooms())
  }, [navigate])

  const welcomeName = useMemo(() => currentUser?.name || 'Admin', [currentUser])
  const dashboardCards = useMemo(
    () => [
      { label: 'Active Bookings', value: String(bookings.length).padStart(2, '0'), detail: bookings.length ? 'New guest requests received' : 'No room bookings yet' },
      { label: 'Listed Rooms', value: String(rooms.length).padStart(2, '0'), detail: 'Rooms currently available' },
      { label: 'Destinations', value: String(destinations.length).padStart(2, '0'), detail: 'Travel spots in collection' },
      { label: 'Support Tickets', value: '07', detail: '2 urgent reviews' }
    ],
    [bookings.length, destinations.length, rooms.length]
  )

  if (!currentUser) return null

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error(`Failed to read ${file.name}`))
      reader.readAsDataURL(file)
    })

  // ---- DESTINATIONS HANDLERS ----
  const handleDestChange = (e) => {
    const { name, value } = e.target
    setDestFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleDestCover = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fileDataUrl = await readFileAsDataUrl(file)
    setDestFormData((prev) => ({ ...prev, coverImage: fileDataUrl }))
    setDestCoverName(file.name)
  }
  const handleDestGallery = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const imageUrls = await Promise.all(files.map(readFileAsDataUrl))
    setDestFormData((prev) => ({
      ...prev,
      galleryImages: [...imageUrls, prev.galleryImages].filter(Boolean).join('\n')
    }))
    setDestGalleryNames(files.map((file) => file.name))
  }
  const handleAddDestination = (e) => {
    e.preventDefault()
    if (!destFormData.placeName || !destFormData.location) {
      alert('Fill main destination details.')
      return
    }
    const payload = createDestinationPayload(destFormData, destEditingId)
    const nextList = destEditingId
      ? destinations.map((d) => (d.id === destEditingId ? payload : d))
      : [payload, ...destinations]
    setDestinations(nextList)
    saveAdminDestinations(nextList)
    setDestFormData(emptyDestinationForm)
    setDestCoverName('')
    setDestGalleryNames([])
    setDestEditingId(null)
  }
  const handleEditDest = (dest) => {
    setDestEditingId(dest.id)
    setDestFormData(createFormDataFromDestination(dest))
    setDestCoverName('')
    setDestGalleryNames([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleDeleteDest = (id) => {
    const nextList = destinations.filter((d) => d.id !== id)
    setDestinations(nextList)
    saveAdminDestinations(nextList)
  }

  // ---- ROOMS HANDLERS ----
  const handleRoomChange = (e) => {
    const { name, value } = e.target
    setRoomFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleRoomCover = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fileDataUrl = await readFileAsDataUrl(file)
    setRoomFormData((prev) => ({ ...prev, coverImage: fileDataUrl }))
    setRoomCoverName(file.name)
  }
  const handleRoomGallery = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const imageUrls = await Promise.all(files.map(readFileAsDataUrl))
    setRoomFormData((prev) => ({
      ...prev,
      galleryImages: [...imageUrls, prev.galleryImages].filter(Boolean).join('\n')
    }))
    setRoomGalleryNames(files.map((file) => file.name))
  }
  const handleAddRoom = (e) => {
    e.preventDefault()
    if (!roomFormData.placeName || !roomFormData.location) {
      alert('Fill main room details.')
      return
    }
    const payload = createRoomPayload(roomFormData, roomEditingId)
    const nextList = roomEditingId
      ? rooms.map((r) => (r.id === roomEditingId ? payload : r))
      : [payload, ...rooms]
    setRooms(nextList)
    saveAdminRooms(nextList)
    setRoomFormData(emptyRoomForm)
    setRoomCoverName('')
    setRoomGalleryNames([])
    setRoomEditingId(null)
  }
  const handleEditRoom = (r) => {
    setRoomEditingId(r.id)
    setRoomFormData(createFormDataFromRoom(r))
    setRoomCoverName('')
    setRoomGalleryNames([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleDeleteRoom = (id) => {
    const nextList = rooms.filter((r) => r.id !== id)
    setRooms(nextList)
    saveAdminRooms(nextList)
  }

  const handleDeleteBooking = (id) => {
    const nextBookings = bookings.filter((booking) => booking.id !== id)
    saveRoomBookings(nextBookings)
  }

  const formatBookingDate = (value) => {
    if (!value) return 'Not provided'

    return new Date(value).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div>
          <p className="admin-kicker">Roamify Control Room</p>
          <h1>Welcome back, {welcomeName}</h1>
          <p className="admin-subtitle">
            Manage stays, watch platform activity, and keep traveler experiences smooth from one place.
          </p>
        </div>
        <div className="admin-badge-panel">
          <span>Role</span>
          <strong>{currentUser.userType}</strong>
          <small>{currentUser.email}</small>
        </div>
      </section>

      <section className="admin-grid">
        {dashboardCards.map((card) => (
          <article key={card.label} className="admin-card">
            <p>{card.label}</p>
            <h2>{card.value}</h2>
            <span>{card.detail}</span>
          </article>
        ))}
      </section>

      {/* Editor Toggles */}
      <div className="d-flex justify-content-center my-4 gap-3">
         <button 
           onClick={() => setActiveTab('destinations')}
           style={{ backgroundColor: activeTab === 'destinations' ? "yellowgreen" : "#fff", color: activeTab === 'destinations' ? "black" : "#666", padding: "10px 20px", borderRadius: "8px", border: activeTab === 'destinations' ? "2px solid black" : "1px solid #ccc", fontWeight: "bold" }}
         >
           Manage Destinations
         </button>
         <button 
           onClick={() => setActiveTab('rooms')}
           style={{ backgroundColor: activeTab === 'rooms' ? "yellowgreen" : "#fff", color: activeTab === 'rooms' ? "black" : "#666", padding: "10px 20px", borderRadius: "8px", border: activeTab === 'rooms' ? "2px solid black" : "1px solid #ccc", fontWeight: "bold" }}
         >
           Manage Rooms
         </button>
         <button
           onClick={() => setActiveTab('bookings')}
           style={{ backgroundColor: activeTab === 'bookings' ? "yellowgreen" : "#fff", color: activeTab === 'bookings' ? "black" : "#666", padding: "10px 20px", borderRadius: "8px", border: activeTab === 'bookings' ? "2px solid black" : "1px solid #ccc", fontWeight: "bold" }}
         >
           View Bookings
         </button>
      </div>

      {/* Toggled Content */}
      {activeTab === 'destinations' && (
        <section className="admin-content-manager">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h3>{destEditingId ? 'Edit Destination' : 'Add Destination'}</h3>
              <span>Destination Editor</span>
            </div>
            <form className="admin-form-grid" onSubmit={handleAddDestination}>
              <select name="category" value={destFormData.category} onChange={handleDestChange} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <option value="Mountains">Mountains</option>
                <option value="Beaches">Beaches</option>
                <option value="Waterfalls">Waterfalls</option>
                <option value="Lakes">Lakes</option>
              </select>
              <input name="placeName" value={destFormData.placeName} onChange={handleDestChange} placeholder="Place name" />
              <input name="location" value={destFormData.location} onChange={handleDestChange} placeholder="Location" />
              <input name="locationDetail" value={destFormData.locationDetail} onChange={handleDestChange} placeholder="Location detail for modal" />
              <input name="coverImage" value={destFormData.coverImage} onChange={handleDestChange} placeholder="Cover image URL" />
              <div className="admin-file-field">
                <label className="admin-file-label">Or upload cover</label>
                <input type="file" accept="image/*" onChange={handleDestCover} />
              </div>
              <textarea name="galleryImages" value={destFormData.galleryImages} onChange={handleDestChange} placeholder="Gallery image URLs, one per line" rows="3" />
              <div className="admin-file-field">
                <label className="admin-file-label">Or upload gallery images</label>
                <input type="file" accept="image/*" multiple onChange={handleDestGallery} />
                {!!destGalleryNames.length && <small>{destGalleryNames.join(', ')}</small>}
              </div>
              <input name="shortTagline" value={destFormData.shortTagline} onChange={handleDestChange} placeholder="Short tagline" />
              <input name="bestTimeToVisit" value={destFormData.bestTimeToVisit} onChange={handleDestChange} placeholder="Best time to visit" />
              <input name="entryFee" value={destFormData.entryFee} onChange={handleDestChange} placeholder="Entry fee" />
              <textarea name="whyVisit" value={destFormData.whyVisit} onChange={handleDestChange} placeholder="Why visit? One point per line" rows="3" />
              <textarea name="thingsToDo" value={destFormData.thingsToDo} onChange={handleDestChange} placeholder="Things to do. One item per line" rows="3" />
              <textarea className="admin-form-wide" name="about" value={destFormData.about} onChange={handleDestChange} placeholder="Detailed description" rows="3" />
              <div className="admin-form-actions">
                <button className="admin-save-btn" type="submit">Save Destination</button>
              </div>
            </form>
          </div>

          <div className="admin-panel">
             <div className="admin-panel-head">
              <h3>Stored Destinations</h3>
            </div>
            <div className="admin-saved-list">
              {destinations.map((d) => (
                <article key={d.id} className="admin-saved-card">
                  <img src={d.coverImage} alt={d.placeName} />
                  <div>
                    <p>{d.category}</p>
                    <strong>{d.placeName}</strong>
                    <div className="admin-saved-actions mt-2">
                      <button type="button" className="admin-inline-btn" onClick={() => handleEditDest(d)}>Edit</button>
                      <button type="button" className="admin-inline-btn admin-inline-btn-danger" onClick={() => handleDeleteDest(d.id)}>Delete</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'rooms' && (
        <section className="admin-content-manager">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h3>{roomEditingId ? 'Edit Room' : 'Add Room'}</h3>
              <span>Room Editor</span>
            </div>
            <form className="admin-form-grid" onSubmit={handleAddRoom}>
              <select name="category" value={roomFormData.category} onChange={handleRoomChange} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Premium Rooms">Premium Rooms</option>
                <option value="Luxury Room">Luxury Room</option>
                <option value="Supreme Deluxe">Supreme Deluxe</option>
                <option value="Villas">Villas</option>
                <option value="Resorts">Resorts</option>
              </select>
              <input name="placeName" value={roomFormData.placeName} onChange={handleRoomChange} placeholder="Hotel/Room Name" />
              <input name="location" value={roomFormData.location} onChange={handleRoomChange} placeholder="Location" />
              <input name="price" value={roomFormData.price} onChange={handleRoomChange} placeholder="Price per night ($)" />
              <input name="roomSize" value={roomFormData.roomSize} onChange={handleRoomChange} placeholder="Room size (e.g., 60 sqm)" />
              <input name="bedType" value={roomFormData.bedType} onChange={handleRoomChange} placeholder="Bed type (e.g., King Bed)" />
              <textarea name="amenities" value={roomFormData.amenities} onChange={handleRoomChange} placeholder="Amenities list (WiFi, Spa, etc), one per line" rows="3" />
              <input name="coverImage" value={roomFormData.coverImage} onChange={handleRoomChange} placeholder="Cover image URL" />
              <div className="admin-file-field">
                <label className="admin-file-label">Or upload cover</label>
                <input type="file" accept="image/*" onChange={handleRoomCover} />
              </div>
              <textarea name="galleryImages" value={roomFormData.galleryImages} onChange={handleRoomChange} placeholder="Gallery image URLs, one per line" rows="3" />
              <div className="admin-file-field">
                <label className="admin-file-label">Or upload gallery images</label>
                <input type="file" accept="image/*" multiple onChange={handleRoomGallery} />
                {!!roomGalleryNames.length && <small>{roomGalleryNames.join(', ')}</small>}
              </div>
              <input name="shortTagline" value={roomFormData.shortTagline} onChange={handleRoomChange} placeholder="Short tagline" />
              <textarea className="admin-form-wide" name="about" value={roomFormData.about} onChange={handleRoomChange} placeholder="Detailed description" rows="3" />
              <div className="admin-form-actions">
                <button className="admin-save-btn" type="submit">Save Room</button>
              </div>
            </form>
          </div>

          <div className="admin-panel">
             <div className="admin-panel-head">
              <h3>Stored Rooms</h3>
            </div>
            <div className="admin-saved-list">
              {rooms.map((r) => (
                <article key={r.id} className="admin-saved-card">
                  <img src={r.coverImage} alt={r.placeName} />
                  <div>
                    <p>{r.category} | ${r.price}</p>
                    <strong>{r.placeName}</strong>
                    <div className="admin-saved-actions mt-2">
                      <button type="button" className="admin-inline-btn" onClick={() => handleEditRoom(r)}>Edit</button>
                      <button type="button" className="admin-inline-btn admin-inline-btn-danger" onClick={() => handleDeleteRoom(r.id)}>Delete</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'bookings' && (
        <section className="admin-content-manager">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h3>Room Booking Messages</h3>
              <span>{bookings.length} reservation{bookings.length === 1 ? '' : 's'} received</span>
            </div>

            {bookings.length ? (
              <div className="admin-saved-list">
                {bookings.map((booking) => (
                  <article key={booking.id} className="admin-saved-card" style={{ alignItems: 'flex-start' }}>
                    <div style={{ width: '100%' }}>
                      <p style={{ marginBottom: '6px' }}>{booking.roomName} | {booking.location}</p>
                      <strong>{booking.fullName}</strong>
                      <div className="mt-2 text-secondary" style={{ lineHeight: 1.8 }}>
                        <div><strong>Email:</strong> {booking.email}</div>
                        <div><strong>Phone:</strong> {booking.phone}</div>
                        <div><strong>Guests:</strong> {booking.guests}</div>
                        <div><strong>Stay:</strong> {formatBookingDate(booking.checkIn)} to {formatBookingDate(booking.checkOut)}</div>
                        <div><strong>Nights:</strong> {booking.totalNights}</div>
                        <div><strong>Total Price:</strong> ${booking.totalPrice}</div>
                        <div><strong>Booked On:</strong> {formatBookingDate(booking.bookedAt)}</div>
                        <div><strong>Message:</strong> {booking.specialRequest || 'No special request from the user.'}</div>
                      </div>
                      <div className="admin-saved-actions mt-3">
                        <button type="button" className="admin-inline-btn admin-inline-btn-danger" onClick={() => handleDeleteBooking(booking.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-secondary" style={{ padding: '12px 0' }}>
                No user booking messages yet. Once a traveler reserves a room, the details will appear here.
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  )
}

export default Admin
