import React from 'react';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
  const { id } = useParams();
  // Fetch car details from an API or state
  const car = { id: 1, name: 'Tesla Model S', img: 'tesla-model-s.jpg', description: 'A very nice electric car.' };

  return (
    <div>
      <img src={car.img} alt={car.name} />
      <h1>{car.name}</h1>
      <p>{car.description}</p>
    </div>
  );
};

export default CarDetails;