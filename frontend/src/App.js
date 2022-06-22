import React from 'react';
import  { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/landing/Home';
import Footer from './components/footer/Footer';
import Nav from './components/navbar/Navbar';
import Error from './components/error/Error';
import axios from 'axios';
import ArrowUpwardTwoToneIcon from '@mui/icons-material/ArrowUpwardTwoTone';
import ScrollToTop from 'react-scroll-to-top';
import Details from './components/details/Details';
import Cities from './components/city/City';
import SingIn from './components/singin/SingIn';
import LogOut from './components/logout/LogOut';
import { connect } from 'react-redux'
import cityActions from '../src/redux/actions/cityActions'

function App(props)  {
  
    // const [dataApi, setDataApi] = useState()

    useEffect(() => {
        props.getCities();
       
        // axios.get(`http://localhost:4000/api/cities`)
        // .then(res => setDataApi(res.data.response.cities))
       },[])

       console.log(props.cities)

    return (
        <div className="app">
            <Nav />
             <Routes>
                 <Route path='/' element={<Home />} />
                 <Route path='/cities' element={<Cities/>} />
                 <Route path='/*' element={<Error />} />
                 <Route path='/cities/city/:id' element={<Details />} /> 
                 <Route path='/singin' element={<SingIn />} />
                 <Route path='/logout' element = {<LogOut />} />

             </Routes>

            <Footer />
            <ScrollToTop 
            style={{backgroundColor:"#25475e", color:"white"}}
            smooth
            component={<ArrowUpwardTwoToneIcon />}/>
        </div>
    )
   

}
// const mapDispatchToProps = {
//     getCities : cityActions.getCities
// };
// const mapStateToProps = (state) => {
//     return
//     {
//     cities: state.cityReducer.cities,
//     auxiliar: state.cityReducer.auxiliar
//     }
// }

// export default connect(mapDispatchToProps, mapStateToProps)(App)
export default App