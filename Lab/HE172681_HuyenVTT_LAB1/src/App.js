import React from 'react';
import './App.css';
import NavbarComponent from './components/NavbarComponent';
import CarouselComponent from './components/CarouselComponent';
import CardComponent from './components/CardComponent';
import BookingComponent from './components/Booking';


function App() {

    return (
        <div style={{ backgroundColor: 'black' }}>
            <NavbarComponent />
            <CarouselComponent />
            <CardComponent />
            <BookingComponent />
        </div>

    )
}

export default App;