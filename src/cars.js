import React from 'react';
import './App.css';

function cars() {
    return (
        <div>
            <header>
                <h1>Car Rental Service</h1>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/cars">Cars</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <section className="hero">
                <h2>Welcome to our Car Rental Service</h2>
                <p>Explore our wide range of vehicles for rent. From economy cars to luxury vehicles, we have it all!</p>
                <a href="#" className="btn">Browse Cars</a>
            </section>

            <section className="featured-cars">
                <h2>Featured Cars</h2>
                <div className="car">
                    <img src="car1.jpg" alt="Car 1" />
                    <h3>Toyota Camry</h3>
                    <p>Starting at $50/day</p>
                </div>
                <div className="car">
                    <img src="car2.jpg" alt="Car 2" />
                    <h3>BMW 5 Series</h3>
                    <p>Starting at $100/day</p>
                </div>
            </section>

            <footer>
                <p>&copy; 2024 Car Rental Service. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default cars;