import { Route, Routes } from 'react-router-dom'
import './App.css'
import Destination from './pages/Destination'
import Service from './pages/Service'
import Rooms from './pages/Rooms'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Header from './components/Header'
import Contact from './pages/Contact'
import Favourites from './pages/Favourites'
import Admin from './pages/Admin'
import DestinationDetails from './pages/DestinationDetails'
import RoomDetails from './pages/RoomDetails'



function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/destination'} element={<Destination />} />
        <Route path={'/destination/:id'} element={<DestinationDetails />} />
        <Route path={'/service'} element={<Service />} />
        <Route path={'/rooms'} element={<Rooms />} />
        <Route path={'/rooms/:id'} element={<RoomDetails />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Login insideRegister={true} />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/contact'} element={<Contact/>} />
        <Route path={'/favourites'} element={<Favourites/>} />
        <Route path={'/admin'} element={<Admin/>} />

        

      </Routes>
      <Footer />
    </>
  )
}

export default App
