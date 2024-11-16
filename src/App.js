import './App.css';
import React from 'react';
import Header from './jsx/Header';
import Footer from './jsx/Footer';
import Home from './jsx/Home';
import ChiTiet from './jsx/ChiTiet';
import Thanhtoan from './jsx/thanhtoan';
import ScrollManager from './jsx/ScrollManager';
import CamNang from './jsx/Camnang';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'aos/dist/aos.css'; // Import CSS của AOS
import { useEffect } from 'react';
import Aos from 'aos';
import Thich from './jsx/yeuthich';
import Phong from './jsx/phong';
import Lienhe from './jsx/Lienhe';
import Gioithieu from './jsx/Gioithieu';
import ImageGallery from './jsx/ztest_post';
import Ud_Infor_User from './jsx/ud_info_user';
import Infor_User from './jsx/infor_user';
import Infor_User_Qmk from './jsx/infor_qmk';
import Infor_User_Qldh from './jsx/infor_qldh';
import Dichvu from './jsx/DichVu';
import ResetPasswordForm from './jsx/Quenmk';
import DK_DN from './jsx/dk_dn';
import DanhGia from './jsx/danhgia';
// import ChiTiet2 from './jsx/chitiet2';


function App() {
  useEffect(() => {
      Aos.init({
        duration: 1000, // Thời gian của hiệu ứng
        once: true, // Chỉ chạy hiệu ứng một lần
      })
    }, [])
  return (
    <BrowserRouter basename ="/">
       <ScrollManager /> {/* Thêm ScrollManager ở đây */}
    <div className="App">
     <Header/>
     <Routes>
          <Route path="/" excact element={<Home />} />
          <Route path="/phong" excact element={<Phong />} />
          <Route path="/dichvu" element={<Dichvu />} />
          <Route path="/thanhtoan" element={<Thanhtoan />} />
          <Route path="/cndulich" element={<CamNang />} />
          <Route path="/lienhe" element={<Lienhe />} />
          <Route path="/gioithieu" element={<Gioithieu />} />
          <Route path="/infor_user" element={<Infor_User />} />
          <Route path="/ud_infor" element={<Ud_Infor_User />} />
          <Route path="/quen_mk" element={<Infor_User_Qmk />} />
          <Route path="/ql_dhang" element={<Infor_User_Qldh />} />
          <Route path="/quen_pass" element={<ResetPasswordForm />} />
          <Route path="/dk_dn" element={<DK_DN />} />
          
          <Route path="/danhgia" element={<DanhGia />} />
          {/* <Route path="/chitiet2" element={<ChiTiet2 />} /> */}


          <Route path="/test" element={<ImageGallery />} />
          <Route path="/thich" excact element={<Thich />} />
          <Route path="/homestay/:id" element={<ChiTiet />} />
          {/* <Route path="/chitiet" excact element={<ChiTiet />} /> */}
          {/* <Route path="/homestay" excact element={<Phong />} /> */}
          {/* <Route path="/room/:id" element={<ChiTiet />} /> */}
      </Routes>
     <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
