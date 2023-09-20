import {React, useContext} from 'react';
import { BrowserRouter , Route, Routes, useLocation  } from 'react-router-dom';
import MemberRoute from './MemberRoute';
import './App.css'
import Navbar from './components/Navbar';
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
import ManageAccount from './components/AdminComponents/ManageAccount';
import VerifyStore from './components/AdminComponents/VerifyStore';
import ReportingService from './components/AdminComponents/ReportingService';
import ConfirmBusiness from './pages/ConfirmBusiness';
import CreateService from './pages/CreateService';
import ProviderHome from './pages/ProviderHome'
import EditService from './pages/EditService'
import ProviderServiceProfile from './pages/ProviderServiceProfile';
import Chat from './pages/Chat';
import ForgotPassword from './pages/ForgotPassword';
import ForgotChangePassword from './pages/ForgotChangePassword';
import EditPassword from './pages/EditPassword';
import { AnimatePresence } from 'framer-motion';
import UserContext from './contexts/UserProvider';
import SingleReport from './components/AdminComponents/SingleReport';
import SingleVerify from './components/AdminComponents/SingleVerify';
import UpdateAccount from './components/AdminComponents/UpdateAccount';

function App() {
  const location = useLocation();
  // const isAdminPage = location.pathname.includes('/administrator-homepage');
  const { account, setAccount } = useContext(UserContext);

  return (
    <div>
        {<Navbar />}
        <AnimatePresence>
          {/* <Router> */}
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
              <Route path='/provider-profile/:slug' element={<ProviderServiceProfile/>}/>
              <Route path='/forgot-password' element={<ForgotPassword/>}/>
              <Route path='/forgot-change-password/:id/:token' element={<ForgotChangePassword/>}/>
              <Route path='/edit-password/:slug' element={<EditPassword/>}/>

              {/* ผู้ใช้งานที่เป็นสมาชิก */}
              <Route path="/review/:slug" element={<MemberRoute Component={Review} />}/>
              <Route path="/report-provider/:slug" element={<MemberRoute Component={ReportProvider} />}/>
              <Route path='/create-service' element={<MemberRoute Component={CreateService}/>}/>
              <Route path='/chats/:userId' element={<MemberRoute Component={Chat}/>}/>

              {/* ผู้ให้บริการ */}
              <Route path='/provider-home/:userId' element={<MemberRoute Component={ProviderHome}/>}/>
              <Route path="/confirm-business/:slug" element={<MemberRoute Component={ConfirmBusiness}/>} />
              <Route path='/edit-service/:slug' element={<MemberRoute Component={EditService}/>}/>

              {/* ผู้ดูแลระบบ */}
              <Route exeat path="/administrator-homepage" element={<AdministratorHomepage />}/>
              <Route exeat path="/account" element={<ManageAccount/>} />
              <Route exeat path="/store" element={<VerifyStore/>} />
              <Route exeat path="/reporting" element={<ReportingService/>} />
              
              <Route exeat path='/reporting/slug/:slug' element={<SingleReport/>}/>
              <Route exeat path='/store/id/:_id' element={<SingleVerify/>}/>

              <Route exeat path='/account/edit/:mem_slug' element={<UpdateAccount/>} />
          </Routes>
          {/* </Router> */}
        </AnimatePresence>
    </div>
  );
}

export default App;