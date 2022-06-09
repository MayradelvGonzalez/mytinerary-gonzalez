import React from 'react';
import  { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import Landing from './components/landing/Landing';
import SearchPage from './components/searchPage/SearchPage';
import Footer from './components/footer/Footer';
import Nav from './components/navbar/Navbar';
import Error from './components/error/Error'
import Carrousel from './components/carrousel/Carrousel';
import axios from 'axios';
import "swiper/css/bundle";

function App() {
    
const [dataApi, setDataApi] = useState()

useEffect(() => {
    axios.get("./data.json")
    .then(response => setDataApi(response.data))
      },[])  

    return (
        <div className="app">
            <Nav />
           
            <Routes>
                 <Route path='/' element={<Landing /> } />
                 <Route path='./cities' element={<SearchPage />} />
                 <Route path='/*' element={<Error />} />
            </Routes>
            <Carrousel />
            <Footer />
        </div>
    )
}


export default App

