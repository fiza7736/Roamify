export const DESTINATIONS_STORAGE_KEY = 'roamify_admin_destinations'

export const emptyDestinationForm = {
  pageName: 'Destinations',
  category: 'Mountains',
  placeName: '',
  location: '',
  coverImage: '',
  galleryImages: '',
  shortTagline: '',
  bestTimeToVisit: '',
  entryFee: '',
  locationDetail: '',
  whyVisit: '',
  thingsToDo: '',
  about: ''
}

export const defaultDestinations = [
  {
    id: 'moraine-lake',
    pageName: 'Destinations',
    category: 'Mountains',
    placeName: 'Moraine Lake',
    location: 'Alberta, Canada',
    coverImage: 'https://images.unsplash.com/photo-1561134643-668f9057cce4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9yYWluZSUyMGxha2V8ZW58MHx8MHx8fDA%3D',
    galleryImages: [
      'https://destinationlesstravel.com/wp-content/uploads/2023/06/Daniel-and-Bailey-pose-for-a-photo-the-the-rockpile-at-Moraine-Lake.jpg.webp',
      'https://banffeveryday.com/wp-content/uploads/2023/11/Moraine-Lake-sunrise.png',
      'https://travelwiththesmile.com/wp-content/uploads/2023/05/Biking-to-Moraine-Lake-27.jpg',
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/16/4f/04/cd.jpg'
    ],
    shortTagline: 'Turquoise waters surrounded by dramatic peaks',
    bestTimeToVisit: 'June - September',
    entryFee: 'Free (Parking limited)',
    locationDetail: 'Banff National Park',
    whyVisit: [
      'Crystal-clear turquoise lake',
      'Stunning mountain views',
      'One of the best sunrise viewpoints in Banff',
      'Canoeing available during summer',
      'Easy and scenic walking trails'
    ],
    thingsToDo: ['Canoeing', 'Hiking', 'Photography', 'Lakeside walk'],
    about:
      'Moraine Lake is a breathtaking glacier-fed lake tucked deep within Banff National Park, known for its unreal turquoise waters and peaceful alpine setting. Visitors come for sunrise, scenic walks, and unforgettable mountain views.'
  }
]

const canUseStorage = () => typeof window !== 'undefined'

const emitAdminContentChange = (storageKey) => {
  if (!canUseStorage()) {
    return
  }

  window.dispatchEvent(new CustomEvent('roamify-admin-content-change', {
    detail: { storageKey }
  }))
}

const createStorageReader = (storageKey, defaultValue) => () => {
  if (!canUseStorage()) {
    return defaultValue
  }

  const storedValue = window.localStorage.getItem(storageKey)

  if (storedValue === null) {
    window.localStorage.setItem(storageKey, JSON.stringify(defaultValue))
    return defaultValue
  }

  try {
    const parsedValue = JSON.parse(storedValue)
    return Array.isArray(parsedValue) ? parsedValue : defaultValue
  } catch {
    window.localStorage.setItem(storageKey, JSON.stringify(defaultValue))
    return defaultValue
  }
}

export const getAdminDestinations = createStorageReader(DESTINATIONS_STORAGE_KEY, defaultDestinations)

export const saveAdminDestinations = (destinations) => {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(destinations))
  emitAdminContentChange(DESTINATIONS_STORAGE_KEY)
}

export const createDestinationPayload = (formData, existingId) => ({
  id: existingId || `${formData.placeName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
  pageName: formData.pageName.trim(),
  category: formData.category || 'Mountains',
  placeName: formData.placeName.trim(),
  location: formData.location.trim(),
  coverImage: formData.coverImage.trim(),
  galleryImages: formData.galleryImages
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean),
  shortTagline: formData.shortTagline.trim(),
  bestTimeToVisit: formData.bestTimeToVisit.trim(),
  entryFee: formData.entryFee.trim(),
  locationDetail: formData.locationDetail.trim(),
  whyVisit: formData.whyVisit
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean),
  thingsToDo: formData.thingsToDo
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean),
  about: formData.about.trim()
})

export const createFormDataFromDestination = (destination) => ({
  pageName: destination.pageName || 'Destinations',
  category: destination.category || 'Mountains',
  placeName: destination.placeName || '',
  location: destination.location || '',
  coverImage: destination.coverImage || '',
  galleryImages: (destination.galleryImages || []).join('\n'),
  shortTagline: destination.shortTagline || '',
  bestTimeToVisit: destination.bestTimeToVisit || '',
  entryFee: destination.entryFee || '',
  locationDetail: destination.locationDetail || '',
  whyVisit: (destination.whyVisit || []).join('\n'),
  thingsToDo: (destination.thingsToDo || []).join('\n'),
  about: destination.about || ''
})

export const getHomepageDestinations = () => getAdminDestinations().slice(0, 4)

export const ROOMS_STORAGE_KEY = 'roamify_admin_rooms';

export const emptyRoomForm = {
  placeName: '',
  location: '',
  category: 'Deluxe Room', 
  coverImage: '',
  galleryImages: '',
  price: '',
  roomSize: '',
  bedType: '',
  amenities: '',
  shortTagline: '',
  about: ''
};

export const defaultRooms = [
  {
    id: 'room-1',
    placeName: 'Capella Bangkok',
    location: 'Yan Nawa, Bangkok, Thailand',
    category: 'Premium Rooms',
    coverImage: 'https://www.cathaypacific.com/content/dam/focal-point/cx/inspiration/2020/09/Capella-BKK_Capella-Bangkok-Riverfront-Premier-II.renditionimage.1700.850.jpg',
    galleryImages: [
      'https://www.cathaypacific.com/content/dam/focal-point/cx/inspiration/2020/09/Capella-BKK_Capella-Bangkok-Riverfront-Premier-II.renditionimage.1700.850.jpg'
    ],
    price: '250',
    roomSize: '61 sqm',
    bedType: 'King Bed',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'River View'],
    shortTagline: 'Supreme comfort with river views.',
    about: 'One of the best rated hotels offering incredible luxury and peaceful accommodation.'
  },
  {
    id: 'room-2',
    placeName: 'Ocean Villa',
    location: 'Maldives',
    category: 'Villas',
    coverImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/682577723.jpg?k=80b629fea45fb139aa15e28b87c34681019c46de001464fc27f0409dbe0ca6b5&o=',
    galleryImages: [],
    price: '900',
    roomSize: '120 sqm',
    bedType: 'King Bed',
    amenities: ['Free WiFi', 'Private Pool', 'Ocean Front', 'Butler Service'],
    shortTagline: 'Independent home-style stay with luxury amenities.',
    about: 'Wake up to the gentle sound of the ocean in this sprawling remote villa designed for ultimate relaxation.'
  }
];

export const getAdminRooms = createStorageReader(ROOMS_STORAGE_KEY, defaultRooms);

export const saveAdminRooms = (rooms) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(rooms));
    emitAdminContentChange(ROOMS_STORAGE_KEY)
  }
};

export const createRoomPayload = (formData, existingId) => ({
  id: existingId || `room-${Date.now()}`,
  placeName: formData.placeName.trim(),
  location: formData.location.trim(),
  category: formData.category || 'Deluxe Room',
  coverImage: formData.coverImage.trim(),
  galleryImages: formData.galleryImages
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean),
  price: formData.price.trim(),
  roomSize: formData.roomSize.trim(),
  bedType: formData.bedType.trim(),
  amenities: formData.amenities
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean),
  shortTagline: formData.shortTagline.trim(),
  about: formData.about.trim()
});

export const createFormDataFromRoom = (room) => ({
  placeName: room.placeName || '',
  location: room.location || '',
  category: room.category || 'Deluxe Room',
  coverImage: room.coverImage || '',
  galleryImages: (room.galleryImages || []).join('\n'),
  price: room.price || '',
  roomSize: room.roomSize || '',
  bedType: room.bedType || '',
  amenities: (room.amenities || []).join('\n'),
  shortTagline: room.shortTagline || '',
  about: room.about || ''
});

export const subscribeToAdminContent = (storageKey, callback) => {
  if (!canUseStorage()) {
    return () => {}
  }

  const handleStorage = (event) => {
    if (!event.key || event.key === storageKey) {
      callback()
    }
  }

  const handleCustomChange = (event) => {
    if (event.detail?.storageKey === storageKey) {
      callback()
    }
  }

  window.addEventListener('storage', handleStorage)
  window.addEventListener('roamify-admin-content-change', handleCustomChange)

  return () => {
    window.removeEventListener('storage', handleStorage)
    window.removeEventListener('roamify-admin-content-change', handleCustomChange)
  }
}
