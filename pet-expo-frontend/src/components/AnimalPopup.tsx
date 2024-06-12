import React from 'react';
import '../styles/styles.css';

interface AnimalPopupProps {
  animal: {
    name: string;
    origin: string;
    image: string;
    type: string;
  };
  onClose: () => void;
}

const AnimalPopup: React.FC<AnimalPopupProps> = ({ animal, onClose }) => (
  <div className="animal-popup">
    <div>
      <img src={animal.image} alt={animal.name} />
      <h2>{animal.name}</h2>
      <p>Origin: {animal.origin}</p>
      <p>Type: {animal.type}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default AnimalPopup;
