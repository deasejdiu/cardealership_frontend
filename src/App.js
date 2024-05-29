import React, { useState } from 'react';
import './App.css';
import CarCard from './CarCard';

const App = () => {
  const [cars, setCars] = useState([
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      price: 24000,
      image: 'https://example.com/toyota-camry.jpg'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      price: 22000,
      image: 'https://example.com/honda-civic.jpg'
    },
    {
      id: 3,
      make: 'Ford',
      model: 'Mustang',
      year: 2021,
      price: 35000,
      image: 'https://example.com/ford-mustang.jpg'
    }
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Car Dealership</h1>
      </header>
      <div className="car-list">
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default App;

