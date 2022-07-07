import React from 'react';
import  { useEffect } from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
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
import { useDispatch,useSelector } from 'react-redux';
import Itinerary from '../src/components/itinerary/Itinerary';
import usersActions from './redux/actions/usersActions';

function App()  {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(citiesActions.getCities()) 
       },[])
      
       useEffect(() => {
        if(localStorage.getItem('token')!== null) {
            const token = localStorage.getItem("token")
            //console.log(token)
            dispatch(usersActions.verifyToken(token))
        }
    },[])
    const Navigate = useNavigate(); 
    const user = useSelector(store =>store.usersReducer.user);
    return (
      <div className="app">
        <Nav />
           <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cities' element={<Cities/>} />
                <Route path='/*' element={<Error />} />
                <Route path='/cities/city/:id' element={<Details />} /> 
                {/* <Route path='/signin' element={<SignIn />} /> 
                <Route path='/signup' element = {<SignUp />} /> */}
                <Route path='/itinerary' element = {<Itinerary />} />
             
                <Route path="/signup" element={ localStorage.getItem('token')? (<Navigate replace to="/"/>): <SignUp/>} />
                <Route path="/signin" element={localStorage.getItem('token')? (<Navigate replace to="/"/>): <SignIn/>} />
               {!user &&  <Route path='/signin' element= {<SignIn />} /> } 
               {!user &&  <Route path='/signup' element= {<SignUp />} /> } 
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
