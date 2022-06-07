import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import Landing from './components/landing/Landing';
import Footer from './components/footer/Footer';
import Nav from './components/navbar/Navbar';

function App() {
    return (
        <div className="app">
            <Nav />
            <Landing />
            <Footer />
        </div>
    )
}
export default App;