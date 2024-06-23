import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const OrdersPage = () => {

    const navigate = useNavigate()

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userInfo = localStorage.getItem('userInfo');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure')) {
        try {
            await axios.delete(`/api/orders/delete/${orderId}`);
            setOrders(orders.filter((order) => order._id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error.response ? error.response.data : error.message);
        }
    }
    };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/all');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  

  return (
    <>
    <Navbar>
        <NavLink to="/BookCarsPage">Book Cars</NavLink>
        {userInfo ? null : <NavLink to="/LoginPage">Login</NavLink>}
        <NavLink to="/Sales">Sales</NavLink>
        <NavLink to="/RentPage">Rent</NavLink>
        {userInfo ? null : <NavLink to="/SignUpPage">Sign Up</NavLink>}
        <NavLink to="/BuyCars">Buy Cars</NavLink>
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
              </DropdownMenu>
            )}
          </Dropdown>
        )}
      </Navbar>
    
    <div className="container mt-4">
        
      <h2>Orders List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-bordered">
          <thead className='text-center'>
            <tr>
              <th>Order ID</th>
              <th>Clients Name</th>
              <th>Chosen Car</th>
              <th>Price</th>
              <th>Delivered</th>
              <th>Created At</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.clientName}</td>
                <td>{order.chosenCar}</td>
                <td>{order.price}</td>
                <td>{order.delivered ? '✔️' : '❌'}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td><button type='btn' onClick={() => navigate(`/${order._id}/order/edit`)} className='btn btn-sm btn-primary'>Edit order</button></td>
                <td><button type='button' onClick={() => handleDeleteOrder(order._id)} className='btn btn-sm btn-danger'>Delete order</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
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

export default OrdersPage;