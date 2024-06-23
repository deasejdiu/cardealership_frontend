import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetails = () => {
  const { id: carId } = useParams();
  const navigate = useNavigate();

  const [cars, setCars] = useState({
    name: "",
    image: "",
    description: "",
    price: 0.00,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const submitHandler = async (event) => {
    event.preventDefault();
    if(!userInfo) { 
      navigate('/LoginPage')
    } else {

    
    try {
      const response = await axios.post('/api/orders/add', {
        clientName: userInfo?.name,
        clientId: userInfo?._id,
        chosenCar: cars?.name,
        price: cars?.price,
      },);
      console.log('Order added successfully:', response.data);
      navigate('/my-deals');
    } catch (error) {
      console.error('Add failed:', error.response ? error.response.data : error.message);
    }}
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/api/cars/get/${carId}`);
        setCars({
          name: response.data.name,
          description: response.data.description,
          image: response.data.image,
          price: response.data.price
        });
        setLoading(false);
      } catch (error) {
        setError('Car not found');
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="row">
              <div className="col-md-6">
                <div className="images p-3">
                  <div className="text-center p-4">
                    <img id="main-image" src={cars?.image} alt='img' width="250" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product p-4">
                  <div className="mt-4 mb-3">
                    <span className="text-uppercase text-muted brand">Car Dealership</span>
                    <h5 className="text-uppercase">{cars?.name}</h5>
                    <div className="price d-flex flex-row align-items-center">
                      <span className="act-price">{cars?.price} €</span>
                    </div>
                  </div>
                  <p className="about">{cars?.description}</p>
                  <div className="cart mt-4 align-items-center">
                    <button
                      className="btn btn-success text-uppercase mr-2 px-4"
                      onClick={submitHandler}
                    >
                      Make a deal
                    </button>
                    <i className="fa fa-heart text-muted"></i>
                    <i className="fa fa-share-alt text-muted"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;