import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Routes from './Routes';

function App({store}) {
  return (
    <BrowserRouter>
          <Routes/>
    </BrowserRouter>
  );
}

export default App;
