import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const CarEditPage = () => {

    const { id: carId } = useParams()

    const [cars, setCars] = useState({
        name: "",
        image: "/images/sample.jpg",
        description: "",
        price: 0.00,
      });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userInfo = localStorage.getItem('userInfo');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const imgRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);


  const [imageFile, setImageFile] = useState(null);

 

  const navigate = useNavigate();


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



  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", cars.name);
    formData.append("description", cars.description);
    formData.append("price", cars.price);
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", cars.image);
    }
    
    try {
      const response = await axios.put(`/api/cars/edit/${carId}`, formData);
      console.log('car updated successfully:', response.data);
      navigate('/cars-list')
    } catch (error) {
      console.error('edit failed:', error.response ? error.response.data : error.message);
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  const handleImgClick = () => {
    imgRef.current.click();
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
      <>
      <div className="container mt-4 px-5">
          <form onSubmit={submitHandler}>
          <div style={{ cursor: "pointer" }} onClick={handleImgClick}>
          <div className="d-flex justify-content-center w-100">
            <img
            src={previewImage || cars.image}
            alt="img"
            width={350}
            />

<div className='form-group' controlId="image">
                          <input 
                            onChange={handleFileChange}
                            type="file"
                            ref={imgRef}
                            style={{ display: "none" }}
                          />
                          <input
                            type="text"
                            placeholder="Enter image url"
                            value={cars.image}
                            onChange={(e) =>
                              setCars({
                                ...cars,
                                image: e.target.value,
                              })
                            }
                            style={{ display: "none" }}
                          />
                        </div>
        </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Cars Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={cars.name}
                onChange={(e) =>
                    setCars({
                    ...cars,
                    name: e.target.value,
                    })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
                <textarea value={cars.description}
                onChange={(e) =>
                    setCars({
                    ...cars,
                    description: e.target.value,
                    })
                } className='form-control' id='description' placeholder='description' />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="0.00"
                value={cars.price}
                onChange={(e) =>
                    setCars({
                    ...cars,
                    price: e.target.value,
                    })
                }
              />
            </div>
            
            
            <div className="pt-4">
              <button type="submit" className="btn btn-primary px-5">
                Submit
              </button>
            </div>
          </form>
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

export default CarEditPage