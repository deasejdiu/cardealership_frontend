import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const cars = [
    { id: 1, name: 'Tesla Model S', img: '/images/tesla-model-s.jpg' },
    { id: 2, name: 'Nissan Leaf', img: '/images/nissan-leaf.jpg' },
    { id: 3, name: 'Audi A5', img: '/images/audia5.jpg' },
  ];

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Navbar>
        <NavLink to="/BookCarsPage">Book Cars</NavLink>
        <NavLink to="/DashboardPage">Dashboard</NavLink>
        <NavLink to="/LoginPage">Login</NavLink>
        <NavLink to="Sales">Sales</NavLink>
        <NavLink to="/RentPage">Rent</NavLink>
        <NavLink to="/SignUpPage">Sign Up</NavLink>
        <NavLink to="/BuyCars">Buy Cars</NavLink>
      </Navbar>
      <HomeContainer>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Search for cars..."
            value={search}
            onChange={handleSearch}
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchBar>
        <ContentWrapper>
          <CarouselWrapper>
            <Slider {...settings}>
              {cars.map((car) => (
                <CarouselSlide key={car.id}>
                  <img src={car.img} alt={car.name} />
                  <h3>{car.name}</h3>
                </CarouselSlide>
              ))}
            </Slider>
          </CarouselWrapper>
          <FeaturedCars>
            <h2>Featured Cars</h2>
            <CarList>
              {filteredCars.map((car) => (
                <CarItem key={car.id}>
                  <img src={car.img} alt={car.name} />
                  <h3>{car.name}</h3>
                  <Link to={`/car/${car.id}`}>View Details</Link>
                </CarItem>
              ))}
            </CarList>
          </FeaturedCars>
          <ContactSection>
            <h2>Contact Us</h2>
            <ContactForm>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message"></textarea>
              <ContactButton type="submit">Send Message</ContactButton>
            </ContactForm>
          </ContactSection>
        </ContentWrapper>
        <Footer>
          <FooterContent>
            <FooterColumn>
              <h3>Contact Info</h3>
              <p>123 Main Street, City, Country</p>
              <p>Phone: +123 456 7890</p>
              <p>Email: info@example.com</p>
            </FooterColumn>
            <FooterColumn>
              <h3>Follow Us</h3>
              <SocialIcons>
                <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </SocialIconLink>
                <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </SocialIconLink>
                <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </SocialIconLink>
              </SocialIcons>
            </FooterColumn>
            <FooterColumn>
              <Trademark>
                &copy; 2024 Car Dealership. All rights reserved.
              </Trademark>
            </FooterColumn>
          </FooterContent>
        </Footer>
      </HomeContainer>
    </div>
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

const HomeContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const SearchBar = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: black;
  color: white;
  border: 1px solid black;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  outline: none;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CarouselWrapper = styled.div`
  margin-bottom: 40px;
`;

const CarouselSlide = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  h3 {
    text-align: center;
    margin-top: 10px;
  }
`;

const FeaturedCars = styled.section`
  h2 {
    margin-bottom: 20px;
  }
`;

const CarList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const CarItem = styled.div`
  flex: 1 1 calc(33.333% - 20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
  h3 {
    margin: 10px 0;
  }
  a {
    display: block;
    margin-top: 10px;
    text-decoration: none;
    color: #3498db;
    font-weight: bold;
  }
`;

const ContactSection = styled.section`
  text-align: center;
  margin-top: 40px;
  h2 {
    margin-bottom: 20px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;

  input,
  textarea,
  button {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }

  textarea {
    height: 100px;
    resize: vertical;
  }
`;

const ContactButton = styled.button`
  background-color: black;
  color: white;
  border: 1px solid black;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
`;

const Footer = styled.footer`
  background-color: #f1f1f1;
  padding: 20px 0;
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const FooterColumn = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const SocialIconLink = styled.a`
  color: #333;
  font-size: 24px;
  &:hover {
    color: #4285f4;
  }
`;

const Trademark = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
`;

export default HomePage;