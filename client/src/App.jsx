import React from 'react';
import { BrowserRouter , Route, Routes, useLocation  } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Review from './pages/Review';
import Article from './pages/Article';
import ArticleOne from './pages/ArticleOne'
import ArticleTwo from './pages/ArticleTwo'
import ArticleThree from './pages/ArticleThree'
import EditProfile from './pages/EditProfile';
import TermOfService from './pages/TermOfService';
import ReportProvider from './pages/ReportProvider';
import AdministratorHomepage from './pages/admin/AdministratorHomepage';
import ManageAccount from './components/AdminComponents/MangeAccount';
import VerifyStore from './components/AdminComponents/VerifyStore';
import ReportingService from './components/AdminComponents/ReportingService';
import ConfirmBusiness from './pages/ConfirmBusiness'

function App() {
  return (
    <div>
      {/* หากต้องการไม่ให้ Navbar แสดงในหน้าไหนให้นำ tag Route ใส่ไว้ข้างนอก tag Route ใหญ่ */}
        <Navbar/>
        <Routes>
          {/* <Route path="/" element={<Navbar/>}> */}
            <Route index  element={<Home />}/>
            <Route path="/article" element={<Article />}/>
            <Route path="/article-1" element={<ArticleOne />}/>
            <Route path="/article-2" element={<ArticleTwo />}/>
            <Route path="/article-3" element={<ArticleThree />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/review" element={<Review />}/>
            <Route path="/report-provider" element={<ReportProvider />}/>
            <Route path="/term-of-service" element={<TermOfService />}/>
            <Route path="/administrator-homepage" element={<AdministratorHomepage />}/>
            <Route path="/administrator-homepage/account" element={<ManageAccount/>} />
            <Route path="/store" element={<VerifyStore/>} />
            <Route path="/reporting" element={<ReportingService/>} />
            <Route path="/confirm-business" element={<ConfirmBusiness/>} />
          {/* </Route> */}
        </Routes>
    </div>
  );
}

export default App;