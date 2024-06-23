import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const ContactListPage = () => {

    const navigate = useNavigate()

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userInfo = localStorage.getItem('userInfo');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/contacts/all');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching contacts');
        setLoading(false);
      }
    };

    fetchUsers();
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
                <DropdownItem to="/contact">Contact</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        )}
      </Navbar>
    
    <div className="container mt-4">
        
      <h2>Users List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-bordered">
          <thead className='text-center'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td style={{textDecoration: 'underline', color: 'blue'}}>
                  <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
                    {user.email}
                  </a>
                </td>
                <td><button type='btn' onClick={() => navigate(`/${user._id}/message`)} className='btn btn-sm btn-primary'>View Message</button></td>
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

export default ContactListPage;