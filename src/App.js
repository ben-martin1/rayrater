import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// components
import Menu from './components/Navbar';

// pages
import BurgerPage from './pages/burger';
import HomePage from './pages/home';
import RequestPage from './pages/request';
import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
    <header>
      <Menu/>
    </header>
      <main>
          <Routes>
            <Route path="/about" element={<BurgerPage/>}/>
            <Route path="/" element={<HomePage />}/>
            <Route path="/request" element={<RequestPage />}/>
          </Routes>
      </main>
      <footer>
        <p>&copy; 2024 Ben Martin</p>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
