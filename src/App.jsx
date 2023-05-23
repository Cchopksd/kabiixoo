import React from 'react';
import { BrowserRouter , Route, Routes, useLocation  } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* หากต้องการไม่ให้ Navbar แสดงในหน้าไหนให้นำ tag Route ใส่ไว้ข้างนอก tag Route ใหญ่ */}
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index  element={<Home />}/>
            <Route path="article" element={<ArticlePage />}/>
            <Route path="about" element={<About />}/>
            <Route path="signin" element={<SignIn />}/>
            <Route path="signup" element={<SignUp />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;