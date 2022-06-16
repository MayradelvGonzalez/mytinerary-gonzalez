import React from 'react';
import  { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
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
        axios.get(`http://localhost:4000/api/cities`)
        .then(res => setDataApi(res.data.response.cities))
       },[])
  
console.log(dataApi)

    return (
        <div className="app">
            <Nav />
            <Routes>
                 <Route path='/' element={<Landing dataApi={dataApi} />} />
                 <Route path='/cities' element={<SearchPage cardFilter={dataApi}/>} />
                 <Route path='*' element={<Error />} />
                  <Route path='/cities/city/:id' element={<Details />} /> 
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

