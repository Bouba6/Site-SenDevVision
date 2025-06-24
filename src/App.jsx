import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import Home from './pages/Home'
import ServicesPage from './pages/Services'
import ContactPage from './pages/Contact'
import GalleryPage from './pages/Gallery'
import BackgroundSound from './components/BackgroundSound'

function App() {
  return (
    <BrowserRouter>
      <BackgroundSound />
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="accueil" element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="Galerie" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
