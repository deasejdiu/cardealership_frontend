import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CarsListPage = () => {

    const navigate = useNavigate()
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userInfo = localStorage.getItem('userInfo');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure')) {
        try {
            await axios.delete(`/api/cars/delete/${carId}`);
            setCars(cars.filter((car) => car._id !== carId));
        } catch (error) {
            console.error('Error deleting car:', error.response ? error.response.data : error.message);
        }
    }
    };


  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars/all');
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching cars');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  return (
    <>
         <Navbar>
        {userInfo ? null : <NavLink to="/LoginPage">Login</NavLink>}
        {userInfo ? null : <NavLink to="/SignUpPage">Sign Up</NavLink>}
        {userInfo ? <NavLink to="/my-deals">My orders</NavLink> : null}
        {userInfo && (
          <Dropdown>
            <DropdownToggle onClick={toggleDropdown}>
              Admin panel
            </DropdownToggle>
            {dropdownVisible && (
              <DropdownMenu>
                <DropdownItem to="/users-list">Users list</DropdownItem>
                <DropdownItem to="/cars-list">Cars list</DropdownItem>
                <DropdownItem to="/all/orders">Orders</DropdownItem>
                <DropdownItem to="/contact">Contact</DropdownItem>
                <DropdownItem>Log out</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        )}
      </Navbar>
      <>
      <div className="container mt-4">
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', paddingBottom: `10px`}}>
            <h2>Cars List</h2>
            <button onClick={() => navigate('/add-car')} type='btn' className='btn btn-primary px-5'>Add a new car</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="table table-bordered">
            <thead className='text-center'>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {cars?.map((car) => (
                <tr key={car._id}>
                  <td>{car._id}</td>
                  <td>{car.name}</td>
                  <td>{car.description}</td>
                  <td style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img style={{width: '34px'}} src={car.image} alt='img' /></td>
                  <td><button type='btn' onClick={() => navigate(`/${car._id}/edit/car`)} className='btn btn-sm btn-primary'>Edit car</button></td>
                  <td><button type='button' onClick={() => handleDeleteCar(car._id)}  className='btn btn-sm btn-danger'>Delete car</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </>
    </>
  )
}

const Navbar = styled.nav`
  background-color: #333;
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 10px;
  margin: 0 5px;
  font-size: 16px;
  &:hover {
    background-color: #555;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.div`
  color: #fff;
  text-decoration: none;
  padding: 10px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const DropdownMenu = styled.div`
  display: block;
  position: absolute;
  background-color: #333;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownItem = styled(Link)`
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #575757;
  }
`;

export default CarsListPage