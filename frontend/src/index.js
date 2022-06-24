import React from 'react';
// import store from './redux/store';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore as createStore} from '@reduxjs/toolkit';
import mainReducer from './redux/reducers/mainReducer'

const reduxStore = createStore({reducer:mainReducer})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {reduxStore}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
)


