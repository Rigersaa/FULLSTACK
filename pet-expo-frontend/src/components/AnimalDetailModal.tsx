import React from 'react';
import '../styles/AnimalDetailModal.css';

interface Animal {
  id: number;
  name: string;
  origin?: string;
  species?: string;
  image: string;
  description?: string; // Add more fields if needed
}

interface AnimalDetailModalProps {
  animal: Animal;
  onClose: () => void;
}

const AnimalDetailModal: React.FC<AnimalDetailModalProps> = ({ animal, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <img src={animal.image} alt={animal.name} />
        <h2>{animal.name}</h2>
        {animal.origin && <p>Origin: {animal.origin}</p>}
        {animal.species && <p>Species: {animal.species}</p>}
        {animal.description && <p>Description: {animal.description}</p>}
      </div>
    </div>
  );
};

export default AnimalDetailModal;
