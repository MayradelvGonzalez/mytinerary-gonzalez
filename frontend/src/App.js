import React from 'react';
import  { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/landing/Home';
import Footer from './components/footer/Footer';
import Nav from './components/navbar/Navbar';
import Error from './components/error/Error';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import ScrollToTop from 'react-scroll-to-top';
import Details from './components/details/Details';
import Cities from './components/city/City';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import citiesActions from '../src/redux/actions/citiesActions'
import { useDispatch } from 'react-redux';
import Itinerary from '../src/components/itinerary/Itinerary';

function App()  {



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(citiesActions.getCities()) 
       },[])
      
    return (
      <div className="app">
        <Nav />
           <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cities' element={<Cities/>} />
                <Route path='/*' element={<Error />} />
                <Route path='/cities/city/:id' element={<Details />} /> 
                <Route path='/signin' element={<SignIn />} /> 
                <Route path='/signup' element = {<SignUp />} />
                <Route path='/itinerary' element = {<Itinerary />} />
            </Routes>
        <Footer />
            <ScrollToTop 
            style={{backgroundColor:"#25475e", color:"white"}}
            smooth
            component={<ArrowUpwardTwoToneIcon />}/>
          
      </div>
    )  
}

export default App
