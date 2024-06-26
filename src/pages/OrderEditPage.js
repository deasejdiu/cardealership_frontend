import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const OrderEditPage = () => {

    const { id: orderId } = useParams()
    const navigate = useNavigate()

    const userInfo = localStorage.getItem('userInfo');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [clientName, setClientName] = useState('');
    const [chosenCar, setChosenCar] = useState('');
    const [price, setPrice] = useState(0.00);
    const [delivered, setDelivered] = useState(false);
  
    useEffect(() => {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(`/api/orders/get/${orderId}`);
          setOrder(response.data);
          setClientName(response.data.clientName);
          setChosenCar(response.data.chosenCar);
          setPrice(response.data.price);
          setDelivered(response.data.delivered);
          setLoading(false);
        } catch (error) {
          setError('User not found');
          setLoading(false);
        }
      };
  
      fetchOrder();
    }, [orderId]);
  
    const handleUpdateOrder = async (event) => {
      event.preventDefault();
      try {
        const updatedOrder = {
          delivered: delivered,
        };
        const response = await axios.put(`/api/orders/edit/${orderId}`, updatedOrder);
        console.log('order updated successfully:', response.data);
        navigate('/all/orders')
      } catch (error) {
        console.error('Update failed:', error.response ? error.response.data : error.message);
      }
    };
  
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };

   return (
    <>
      <Navbar>
        <NavLink to="/BookCarsPage">Book Cars</NavLink>
        {userInfo ? null : <NavLink to="/LoginPage">Login</NavLink>}
        <NavLink to="/Sales">Sales</NavLink>
        <NavLink to="/RentPage">Rent</NavLink>
        {userInfo ? null : <NavLink to="/SignUpPage">Sign Up</NavLink>}
        <NavLink to="/BuyCars">Buy Cars</NavLink>
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
              </DropdownMenu>
            )}
          </Dropdown>
        )}
      </Navbar>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="container mt-4 px-5">
          <form onSubmit={handleUpdateOrder}>
            <div className="form-group">
              <label htmlFor="name">Clients Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={clientName}
                disabled
              />
            </div>
            <div className="form-group pt-4">
              <label htmlFor="email">Chosen Car</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="car"
                value={chosenCar}
                disabled
              />
            </div>
            <div className="form-group pt-4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="price"
                value={price}
                disabled
              />
            </div>
            <div className="form-check pt-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="delivered"
                checked={delivered}
                onChange={() => setDelivered(prevDelivered => !prevDelivered)}
              />
              <label className="form-check-label" htmlFor="delivered">
                Delivered
              </label>
            </div>
            <div className="pt-4">
              <button type="submit" className="btn btn-primary px-5">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

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

export default OrderEditPage