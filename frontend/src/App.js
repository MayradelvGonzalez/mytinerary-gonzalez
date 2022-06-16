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
// import Carrousel from './components/carrousel/Carrousel';
import axios from 'axios';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import ScrollToTop from 'react-scroll-to-top';
import Details from './components/details/Details';

function App() {
  
    const [dataApi, setDataApi] = useState()
    useEffect(() => {
        axios.get("./data.json")
        .then(response => setDataApi(response.data))
    
},[])
console.log(dataApi)

    return (
        <div className="app">
            <Nav />
            <Routes>
                 <Route path='/' element={<Landing dataApi={dataApi} />} />
                 <Route path='/cities' element={<SearchPage />} />
                 <Route path='/*' element={<Error />} />
                  <Route path='parametro/cities/city/:id' element={<Details />} /> 
            </Routes>
        
            <Footer />
            <ScrollToTop 
            // style={{backgroundColor:"green"}}
            smooth
            component={<ArrowUpwardTwoToneIcon fontSize = 'large'/>}
            />
        </div>
    )
}


export default App

