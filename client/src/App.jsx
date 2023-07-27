import React from 'react';
import { BrowserRouter , Route, Routes, useLocation  } from 'react-router-dom';
import MemberRoute from './MemberRoute';
import './App.css'
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploaderBusiness';
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
import ConfirmBusiness from './pages/ConfirmBusiness';
import CreateService from './pages/CreateService';
import ProviderHome from './pages/ProviderHome'
import EditService from './pages/EditService'

function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
          {/* MemberRoute คือ component ที่ใช้ตรวจสอบและ redirect หน้า เมื่อไม่ได้เข้าสู่ระบบ */}
            <Route index  element={<Home />}/>
            {/* บทความ */}
            <Route path="/article" element={<Article />}/>
            <Route path="/article-1" element={<ArticleOne />}/>
            <Route path="/article-2" element={<ArticleTwo />}/>
            <Route path="/article-3" element={<ArticleThree />}/>

            {/* ทั่วไป */}
            <Route path="/about" element={<About />}/>
            <Route path="/term-of-service" element={<TermOfService />}/>

            {/* ผู้ใช้งานระบบ */}
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path='/edit-profile/:slug' element={<MemberRoute Component={EditProfile}/>}/> 

            {/* ผู้ใช้งานที่เป็นสมาชิก */}
            <Route path="/review" element={<Review />}/>
            <Route path="/report-provider" element={<ReportProvider />}/>
            <Route path='/create-service' element={<MemberRoute Component={CreateService}/>}/>

            {/* ผู้ให้บริการ */}
            <Route path='/provider-home/:userId' element={<ProviderHome/>}/>
            <Route path="/confirm-business/:slug" element={<ConfirmBusiness/>} />
            <Route path='/edit-service/:slug' element={<EditService/>}/>

            {/* ผู้ดูแลระบบ */}
            <Route path="/administrator-homepage" element={<AdministratorHomepage />}/>
            <Route path="/administrator-homepage/account" element={<ManageAccount/>} />
            <Route path="/store" element={<VerifyStore/>} />
            <Route path="/reporting" element={<ReportingService/>} />
        </Routes>
    </div>
  );
}

export default App;