import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import HomePage from './pages/HomePage';
import AdminPage from  './pages/AdminPage';
import AnimalCard from './components/AnimalCard';
import AnimalGallery from './components/AnimalGallery';

const App: React.FC = () => {
  return (
    <Router> {/* Wrap Routes with BrowserRouter */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/components/AnimalGallery" element={<AnimalGallery selectedAnimal={null}/>} />
        <Route path="/components/AnimalCard" element={<AnimalCard animal={{
          id: '',
          name: '',
          origin: '',
          image: ''
        }} onClick={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
      </Routes>
    </Router>
  );
};

export default App;
