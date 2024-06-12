import React, { useState, useRef } from 'react';
import AnimalGallery from '../components/AnimalGallery';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import AnimalMenu from '../components/AnimalMenu';
import '../styles/Homepage.css';
import petImage from '../assets/pet.jpg';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const animalGalleryRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
    // Implement your search functionality here
  };

  const scrollToAnimalGallery = () => {
    if (animalGalleryRef.current) {
      animalGalleryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Welcome to our Pet Paradise</h1>
          <nav>
          <Link to="/admin" className="nav-link">Admin</Link>
            <AnimalMenu onSelectType={(type) => {
              setSelectedAnimal(type);
              scrollToAnimalGallery();
            }} />
            
            {/* <div className="search-container">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <button className="search-button" onClick={handleSearch}>Search</button>
            </div> */}
          </nav>
        </div>
      </header>
      <div className="content">
        <div className="image-section">
          <img src={petImage} alt="Pets" className="content-image" />
          <div className="image-overlay">
            <div className="overlay-text">
              Të kujdesemi për kafshët është pasioni ynë.
            </div>
          </div>
        </div>
        <div className="about-contact-section">
          <AboutUs />
          <ContactUs />
        </div>
        <div ref={animalGalleryRef} className="animal-gallery-section">
          <AnimalGallery selectedAnimal={selectedAnimal} />
        </div>
        <div className="blog-section">
          <h2>Latest Blog Posts</h2>
          <div className="blogs">
            <div className="blog-post">
              <h3>Blog Post 1</h3>
              <p>Summary of blog post 1...</p>
            </div>
            <div className="blog-post">
              <h3>Blog Post 2</h3>
              <p>Summary of blog post 2...</p>
            </div>
            <div className="blog-post">
              <h3>Blog Post 3</h3>
              <p>Summary of blog post 3...</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 Pet Paradise. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
