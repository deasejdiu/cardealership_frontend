import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const UserEditPage = () => {

    const { id: userId } = useParams()
    const navigate = useNavigate()

    const userInfo = localStorage.getItem('userInfo');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/api/users/get/${userId}`);
          setUser(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setIsAdmin(response.data.isAdmin);
          setLoading(false);
        } catch (error) {
          setError('User not found');
          setLoading(false);
        }
      };
  
      fetchUser();
    }, [userId]);
  
    const handleUpdateUser = async (event) => {
      event.preventDefault();
      try {
        const updatedUser = {
          name: name,
          email: email,
          isAdmin: isAdmin,
        };
        const response = await axios.put(`/api/users/update/${userId}`, updatedUser);
        console.log('User updated successfully:', response.data);
        navigate('/users-list')
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

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="container mt-4 px-5">
          <form onSubmit={handleUpdateUser}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group pt-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-check pt-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="isAdmin"
                checked={isAdmin}
                onChange={() => setIsAdmin(prevAdmin => !prevAdmin)}
              />
              <label className="form-check-label" htmlFor="isAdmin">
                Is Admin
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

export default UserEditPage