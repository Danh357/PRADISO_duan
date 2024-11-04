import './App.css';
import React from 'react';
import Header from './jsx/Header';
import Footer from './jsx/Footer';
import Home from './jsx/Home';
import ChiTiet from './jsx/ChiTiet';
import Thanhtoan from './jsx/thanhtoan';
import ScrollManager from './jsx/ScrollManager';

import { BrowserRouter, Routes, Route} from "react-router-dom";
import 'aos/dist/aos.css'; // Import CSS của AOS
import { useEffect } from 'react';
import Aos from 'aos';
import Thich from './jsx/yeuthich';
import Phong from './jsx/phong';

function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000, // Thời gian của hiệu ứng
      // once: true, // Chỉ chạy hiệu ứng một lần
    });
  }, []);
  return (
    <BrowserRouter basename ="/">
       <ScrollManager /> {/* Thêm ScrollManager ở đây */}
    <div className="App">
     <Header/>
     <Routes>
          <Route path="/" excact element={<Home />} />
          <Route path="/phong" excact element={<Phong />} />
          <Route path="/thich/:id" excact element={<Thich />} />
          {/* <Route path="/chitiet" excact element={<ChiTiet />} /> */}
          <Route path="/thanhtoan" excact element={<Thanhtoan />} />
          {/* <Route path="/homestay" excact element={<Phong />} /> */}
          <Route path="/homestay/:id" element={<ChiTiet />} />
          {/* <Route path="/room/:id" element={<ChiTiet />} /> */}
          <Route path="/thanhtoan" element={<Thanhtoan />} />
      </Routes>
     <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
