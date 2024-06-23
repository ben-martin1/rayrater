import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// components
import Menu from './components/Navbar';

// pages
import AboutPage from './pages/about';
import HomePage from './pages/home';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <header>
        <Menu/>
      </header>
        <main>
            <Routes>
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/" element={<HomePage />}/>
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
