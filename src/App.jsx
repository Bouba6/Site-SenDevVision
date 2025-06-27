import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import Home from './pages/Home'
import ServicesPage from './pages/Services'
import ContactPage from './pages/Contact'
import AboutPage from './pages/About'
import GalleryPage from './pages/Gallery'
import BackgroundSound from './components/BackgroundSound'
import ServiceDetailPage from './components/Page-sevice/serviceDetail'

function App() {
  return (
      <Routes>

        {/* <Route path="/services/:serviceId" element={<ServiceDetailPage />} /> */}
        <Route path="/service/:serviceId" element={<ServiceDetailPage />} />


        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="accueil" element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="galerie" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="apropos" element={<AboutPage />} />
        </Route>
      </Routes>
  )

}

export default App
