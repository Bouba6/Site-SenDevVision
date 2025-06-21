import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import Home from './pages/Home'
import ServicesPage from './pages/Services'
import GalleryPage from './pages/Gallery'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="accueil" element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="Galerie" element={<GalleryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
