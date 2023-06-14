import React from 'react';
import { BrowserRouter , Route, Routes, useLocation  } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Review from './pages/Review';
import Article from './pages/Article';
import EditProfile from './pages/EditProfile';
import TermOfService from './pages/TermOfService';
import ReportProvider from './pages/ReportProvider';
import ConfirmBusiness from './pages/ConfirmBusiness';
import ProviderHome from './pages/ProviderHome';
import CreateService from './pages/CreateService';
import EditService from './pages/EditService';
import ProviderServiceProfile from './pages/ProviderServiceProfile';

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* หากต้องการไม่ให้ Navbar แสดงในหน้าไหนให้นำ tag Route ใส่ไว้ข้างนอก tag Route ใหญ่ */}
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index  element={<ProviderServiceProfile/>}/>
            <Route path="article" element={<Article />}/>
            <Route path="about" element={<About />}/>
            <Route path="signin" element={<SignIn />}/>
            <Route path="signup" element={<SignUp />}/>
            <Route path="review" element={<Review />}/>
            <Route path="report-provider" element={<ReportProvider />}/>
            <Route path="term-of-service" element={<TermOfService />}/>
            <Route path='confirm-business' element={<ConfirmBusiness/>}/>
            <Route path='create-service' element={<CreateService/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;