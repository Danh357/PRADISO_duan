import './App.css';
import './Admin.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { AuthProvider } from './AuthContext ';
import PrivateRoute from './jsx/PrivateRoute';


// Import Layout
import Layout from './jsx/Layout';
import Layout_admin from './jsx/Layout_admin';


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
import Unauthorized from './jsx/notauth';
import NotFound from './jsx/notfoud';
import ScrollManager from './jsx/ScrollManager';
import Payment from './jsx/PAYMENT';
import Thanks from './jsx/Thank';
import AdminVoucherCreator from './jsx/AdminVoucherCreator';
import VoucherChecker from './jsx/VoucherChecker';
// admin
import Home_admin from './admin/Home_ad';
import Header_admin from './admin/Header_admin';
import ThemHomestay from './admin/ThemHomestay';
import SuaHomestay from './admin/SuaHomestay';

import LoaiHomestay from './admin/LoaiHomestay';
import ThemLoai from './admin/themLoai';
import SuaLoai from './admin/SuaLoai';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';






function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter basename="/">
        <AuthProvider> {/* Bao bọc ứng dụng với AuthProvider */}
          <ScrollManager/>
      <div className="App">
        {/* Định nghĩa Routes */}
        <Routes>
          {/* Các trang hợp lệ sẽ sử dụng Layout với Header và Footer */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/phong" element={<Layout><Phong /></Layout>} />
          <Route path="/dichvu" element={<Layout><Dichvu /></Layout>} />
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
          {/* <Route path="/test" element={<Layout><ImageGallery /></Layout>} /> */}
          <Route path="/thich" element={<Layout><Thich /></Layout>} />
          <Route path="/homestay/:id" element={<Layout><ChiTiet /></Layout>} />
          <Route path="/thanhtoan" element={<Layout><Thanhtoan /></Layout>} />
          <Route path="/Payment" element={<Layout><Payment /></Layout>} />
          <Route path="/thanks" element={<Layout><Thanks /></Layout>} />
          {/* <Route path="/adminvc" element={<Layout><AdminVoucherCreator /></Layout>} />
          <Route path="/adminvc" element={<Layout><VoucherChecker  /></Layout>} /> */}
{/* User */}
          
{/* ADMIN */}
          <Route path="/admin" element={<PrivateRoute requiredRole="admin">
                                    <Layout_admin><Home_admin /></Layout_admin>
                                </PrivateRoute>} />
          {/* <Route path="/admin_homestay" element={ <Layout_admin> <Home_admin /></Layout_admin>} />
          <Route path="/admin_add_homestay" element={ <Layout_admin> <ThemHomestay /></Layout_admin>} />
          <Route path="/admin_update_homestay/:id" element={ <Layout_admin> <SuaHomestay/></Layout_admin>} />
          <Route path='/admin_loaihomestay/'  element={<Layout_admin> <LoaiHomestay/></Layout_admin>} />
          <Route path='/admin_add_loai/'  element={<Layout_admin> <ThemLoai/>  </Layout_admin>} />
          <Route path='/admin_update_loai/:id/'  element={<Layout_admin> <SuaLoai/> </Layout_admin>} /> */}
{/* NHANVIEN */}



















          {/* <Route path='/admin_add_loai/' exact element={<ThemLoai />} />
          <Route path='/admin_update_loai/:id' exact element={<SuaLoai />} /> */}









          {/* Trang NotFound không có Header và Footer */}
          <Route path="/unauthorized" element={<Unauthorized /> } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Routes>
          
        </Routes>
      </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
