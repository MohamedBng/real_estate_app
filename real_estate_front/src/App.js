import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertiesIndex from './pages/PropertiesIndex';
import PropertiesPage from './pages/PropertiesPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import Leaflet from 'leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';

Leaflet.Icon.Default.imagePath =
'../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertiesIndex />} />
        <Route path="/properties/:propertyId" element={<PropertiesPage />} />
      </Routes>
      <div id="footer-root">
        <Footer />
      </div>
      <Copyright />
    </BrowserRouter>
  );
}

export default App;
