import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIN from  "./components/SignIN"
import MainPage from './components/MainPage';

function App() {
  
 
  return (
    <>
    <Router>
     <Routes>
        <Route path='/' Component={SignIN}/>
        <Route path='/main' Component={MainPage}/>
     </Routes>

    </Router>
     
    </>
  )
}

export default App
