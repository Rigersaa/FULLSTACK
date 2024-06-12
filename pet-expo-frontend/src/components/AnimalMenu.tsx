import React from 'react';
import '../styles/AnimalMenu.css'

interface AnimalMenuProps {
  onSelectType: (type: string | null) => void;
}

const AnimalMenu: React.FC<AnimalMenuProps> = ({ onSelectType }) => {
  const handleAnimalTypeSelect = (type: string) => {
    onSelectType(type);
  };

  return (
    <ul className="animal-menu">
      <li onClick={() => handleAnimalTypeSelect('dogs')}>Dogs</li>
      <li onClick={() => handleAnimalTypeSelect('cats')}>Cats</li>
      <li onClick={() => handleAnimalTypeSelect('birds')}>Birds</li>
    </ul>
  );
};

export default AnimalMenu;
