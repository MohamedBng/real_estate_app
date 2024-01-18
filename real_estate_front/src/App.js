import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertiesIndex from './pages/PropertiesIndex';
import PropertiesPage from './pages/PropertiesPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Copyright from './components/Copyright';
import './App.css';

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
