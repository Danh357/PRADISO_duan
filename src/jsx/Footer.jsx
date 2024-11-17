import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Footer() {
    return(
       <div>
     
        <footer>
        <div className="footer_container">
            <div className="bg_footer">
                <div className="min_warp2">
                    <div className="row" data-aos="fade-up" data-aos-duration="3000">
                        <div className="col1_ft">
                            <h2><a href="">Maple Inn</a></h2>
                            <p>Được thành lập vào năm 1998, Maple Inn tọa lạc trên những ngọn đồi của Lâm Đồng, đưa bạn đắm chìm vào sự kỳ diệu của dãy núi Langbiang của Đà Lạt trên nền trời trong xanh. Chào mừng đến với Maple Inn</p>
                            <ul className="footer_icon">
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>		
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>											
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>											
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>											
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-youtube"></i></a></li>											
                            </ul>
                        </div>
                        <div className="col2_ft">
                            <h4 className="tittle_ft">Về Maple Inn</h4>
                            <ul className="nav_link">
                                <li className="item_ft"><a className="a_nav_link" href="">Tìm kiếm</a></li>
                                <li className="item_ft"><a href="#">Giới thiệu</a></li>	
                                <li className="item_ft"><a href="#">Chính sách đổi trả</a></li>	
                                <li className="item_ft"><a href="#">Chính sách bảo mật</a></li>		
                                <li className="item_ft"><a href="#">Điều khoản dịch vụ</a></li>		
                                <li className="item_ft"><a href="#">Liên hệ</a></li>											
                            </ul>
                        </div>
                        <div className="col2_ft">
                            <h4 className="tittle_ft">Liên kết</h4>
                            <ul className="nav_link">
                                <li className="item_ft"><a href="#">Nhà hàng</a></li>	
                                <li className="item_ft"><a href="#">Tiệc & Sự kiện</a></li>	
                                <li className="item_ft"><a href="#">Spa & Massaget</a></li>		                                							
                            </ul>
                        </div>
                        <div className="col3_ft">
                            <h4 className="tittle_ft">Liên hệ</h4>
                            <ul className="nav_link">
                                <li className="contact_ft"><i className="fa-sharp fa-solid fa-location-dot"></i><a href="">  1234 Nguyễn Thị Minh Khai, phường 4, quận 9, Đà Lạt, Lâm Đồng</a></li>	
                                <li className="contact_ft"><i className="fa-solid fa-phone"></i><a href="">  0777092128</a></li>	
                                <li className="contact_ft"><i className="fa-solid fa-envelope"></i><a href="">  0777092128</a></li>	
                                <div className="btn_map ">
                                   <a href="#"><span>Xem đường đi</span></a>
                                </div>                             							
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
{/* <!-- end footer --> */}
        <div className="end_footer">
            <div className="footer_copyright">
                <div className="min_warp2">
                   <div className="row_ft">
                    <div className="col50">
                        <p className="p_ft" >Copyright © 2024 <a href="#"> Maple Inn</a>. 
                            <a rel="nofollow noopener" target="_blank" href="">Powered by Haravan</a>
                        </p>
                    </div>
                    <div className="col50">
                        <ul className="copyright_link">
                            <li className="item">
                                <a href="#" title="Tìm kiếm">Tìm kiếm</a>
                            </li>                                
                            <li className="item">
                                <a href="#" title="Giới thiệu">Giới thiệu</a>
                            </li>                             
                            <li className="item">
                                <a href="#" title="Chính sách đổi trả">Chính sách đổi trả</a>
                            </li>                                
                            <li className="item">
                                <a href="#" title="Chính sách bảo mật">Chính sách bảo mật</a>
                            </li>                                                      
                            <li className="item">
                                <a href="#" title="Liên hệ">Liên hệ</a>
                            </li>                                    
                        </ul>
                    </div>

                   </div>
                </div>
            </div>
        </div>
{/* <!-- end footer --> */}
    </footer>
</div>
    )
    
}
export default Footer