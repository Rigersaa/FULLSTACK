import React, { useState, useEffect } from 'react';
import AnimalCard from './AnimalCard';
import SearchBar from './SearchBar';
import '../styles/AnimalGallery.css';
import AnimalDetailModal from './AnimalDetailModal';

interface Animal {
  id: number;
  name: string;
  origin?: string;
  species?: string;
  image: string;
  description?: string; // Add more fields if needed
}

interface AnimalGalleryProps {
  selectedAnimal: string | null;
}

const AnimalGallery: React.FC<AnimalGalleryProps> = ({ selectedAnimal }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [selectedAnimalDetail, setSelectedAnimalDetail] = useState<Animal | null>(null);

  useEffect(() => {
    fetchData(selectedAnimal);
  }, [selectedAnimal]);

  const fetchData = async (animalType: string | null) => {
    try {
      if (animalType) {
        const response = await fetch(`https://freetestapi.com/api/v1/${animalType}`);
        const data = await response.json();
        setAnimals(data);
        setFilteredAnimals(data);
      }
    } catch (error) {
      console.error(`Error fetching ${animalType}:`, error);
    }
  };

  const handleSearchResults = (results: Animal[]) => {
    setFilteredAnimals(results);
  };

  const handleCardClick = (animal: Animal) => {
    setSelectedAnimalDetail(animal);
  };

  const handleCloseModal = () => {
    setSelectedAnimalDetail(null);
  };

  return (
    <div className="animal-gallery">
      {selectedAnimal && (
        <>
          <h2 className="gallery-title">{selectedAnimal.toUpperCase()}</h2>
          <SearchBar animals={animals} onResults={handleSearchResults} />
          <div className="cards-container">
            {filteredAnimals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} onClick={() => handleCardClick(animal)} />
            ))}
          </div>
          {selectedAnimalDetail && <AnimalDetailModal animal={selectedAnimalDetail} onClose={handleCloseModal} />}
        </>
      )}
    </div>
  );
};

export default AnimalGallery;
