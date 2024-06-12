import React from 'react';
import '../styles/AnimalCard.css';

interface Animal {
  id: number;
  name: string;
  origin?: string;
  species?: string;
  image: string;
}

interface AnimalCardProps {
  animal: Animal;
  onClick: () => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onClick }) => {
  return (
    <div className="animal-card" onClick={onClick}>
      <img src={animal.image} alt={animal.name} />
      <div className="info">
        <h3>{animal.name}</h3>
        {animal.origin && <p>Origin: {animal.origin}</p>}
      </div>
    </div>
  );
};

export default AnimalCard;
