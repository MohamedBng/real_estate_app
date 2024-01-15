import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero'
import FeatureSection from './components/FeatureSection';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <FeatureSection />
    </div>
  );
}

export default App;
