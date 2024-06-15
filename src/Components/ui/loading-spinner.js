import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Example using Font Awesome icons

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <FaSpinner className="spin" /> {/* Using Font Awesome spinner icon */}
    </div>
  );
};

export default LoadingSpinner;