import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const ViewMessage = () => {

    const { id: contactId } = useParams()
    const navigate = useNavigate()

    const userInfo = localStorage.getItem('userInfo');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      const fetchContact = async () => {
        try {
          const response = await axios.get(`/api/contacts/get/${contactId}`);
          setContact(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setMessage(response.data.message);
          setLoading(false);
        } catch (error) {
          setError('data not found');
          setLoading(false);
        }
      };
  
      fetchContact();
    }, [contactId]);
  
    
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
                <DropdownItem to="/contact">Contact</DropdownItem>
                <DropdownItem>Log out</DropdownItem>
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
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                disabled
              />
            </div>
            <div className="form-group pt-4">
              <label htmlFor="email">Email</label>
              <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
              <div
                className="form-control"
                id="email"
                style={{textDecoration: 'underline', color: 'blueviolet', cursor: 'pointer'}}
              >{email}</div>
              </a>
            </div>
            <div className="form-group pt-4">
              <label htmlFor="price">Message</label>
              <textarea
                className="form-control"
                id="price"
                placeholder="message"
                value={message}
                disabled
            ></textarea>
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

export default ViewMessage
