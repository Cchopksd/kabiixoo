import React from 'react';
import { BrowserRouter , Route, Routes, useLocation  } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Review from './pages/Review';
import Article from './pages/Article';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index  element={<Home />}/>
            <Route path="article" element={<Article />}/>
            <Route path="about" element={<About />}/>
            <Route path="signin" element={<SignIn />}/>
            <Route path="signup" element={<SignUp />}/>
            <Route path="review" element={<Review />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;