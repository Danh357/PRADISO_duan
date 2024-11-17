import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';

// Import Layout
import Layout from './jsx/Layout';

// Import các trang

import Home from './jsx/Home';
import ChiTiet from './jsx/ChiTiet';
import Thich from './jsx/yeuthich';
import Thanhtoan from './jsx/thanhtoan';
import CamNang from './jsx/Camnang';
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
import NotFound from './jsx/notfoud';
import ScrollManager from './jsx/ScrollManager';

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter basename="/">
         <ScrollManager/>
      <div className="App">
        {/* Định nghĩa Routes */}
        <Routes>
          {/* Các trang hợp lệ sẽ sử dụng Layout với Header và Footer */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/phong" element={<Layout><Phong /></Layout>} />
          <Route path="/dichvu" element={<Layout><Dichvu /></Layout>} />
          <Route path="/thanhtoan" element={<Layout><Thanhtoan /></Layout>} />
          <Route path="/cndulich" element={<Layout><CamNang /></Layout>} />
          <Route path="/lienhe" element={<Layout><Lienhe /></Layout>} />
          <Route path="/gioithieu" element={<Layout><Gioithieu /></Layout>} />
          <Route path="/infor_user" element={<Layout> <Infor_User /></Layout>} />
          <Route path="/ud_infor" element={<Layout> <Ud_Infor_User /></Layout>} />
          <Route path="/quen_mk" element={<Layout> <Infor_User_Qmk /></Layout>} />
          <Route path="/ql_dhang" element={<Layout><Infor_User_Qldh /></Layout>} />
          <Route path="/quen_pass" element={<Layout><ResetPasswordForm /></Layout>} />
          <Route path="/dk_dn" element={<Layout><DK_DN /></Layout>} />
          <Route path="/danhgia" element={<Layout><DanhGia /></Layout>} />
          <Route path="/test" element={<Layout><ImageGallery /></Layout>} />
          <Route path="/thich" element={<Layout><Thich /></Layout>} />
          <Route path="/homestay/:id" element={<Layout><ChiTiet /></Layout>} />

          {/* Trang NotFound không có Header và Footer */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
