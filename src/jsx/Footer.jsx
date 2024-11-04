import React from "react"
function footer() {
    return(
       <div>
         {/* // <!-- form email --> */}
                <div className="email_newletter" data-aos="fade-up" data-aos-duration="1000" >
                    <div className="min_warp2">
                        <div className="row_email">
                            <div className="col-lg-6 col-12">
                                <div className="newsletter_title">
                                    <div className="heading-title">
                                        <p className="title3">Hãy kết nối cùng Paradiso</p>
                                        <h3 className="title4">Đăng ký nhận bản tin của chúng tôi để nhận tin tức, ưu đãi và khuyến mãi.</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <form acceptCharset="UTF-8" action="#" className="contact_form" method="post">
                                    <input name="form_type" type="hidden" value="customer"/>
                                    <input name="utf8" type="hidden" value="✓"/>
                                    <div className="form-group input-group">
                                        <input type="hidden" id="new_tags" name="#" value="Đăng kí nhận tin"/>     
                                        <input required="" type="email" name="#" className="form-control newsletter-input" id="newsletter-email" pattern="^(.)+@[A-Za-z0-9]([A-Za-z0-9.\-]*[A-Za-z0-9])?\.[A-Za-z]{1,13}$" placeholder="Nhập email của bạn" aria-label="Email Address"/>
                                        <div className="input_btn">
                                            <button type="submit" className="cta-submitform newsletter-btn">Đăng ký 
                                                <span className="icon-btn"><i className="fa fa-send-o"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="check-form">
                                        <input type="checkbox" id="new_check" required=""/>
                                        <span>Đã đọc &amp; Đồng ý <a href="#"> & Chính sách bảo mật</a></span>
                                    </div>
                                    <input id="eb66e25e0d524d97a7478759b2b7d91e" name="g-recaptcha-response" type="hidden"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
{/* <!-- form email -->
<!-- footer-intagram --> */}
                <div className="footer-instagram" data-aos="fade-zoom-in" data-aos-easing="ease-in-out"data-aos-delay="400" data-aos-offset="0">
                    <div className="min_warp2">
                        <div className="row_col">
                            <div className="box_intagram">
                                <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_1.jpg?v=2537" alt="Instgram 1"/>
                            </div>   
                            <div className="box_intagram">
                                <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_2.jpg?v=2537" alt="Instgram 2"/>
                            </div>            
                            <div className="box_intagram">
                                <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_3.jpg?v=2537" alt="Instgram 3"/>
                            </div>           
                            <div className="box_intagram">
                                <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_4.jpg?v=2537" alt="Instgram 4"/>
                            </div>           
                        </div>
                        <div className="btn-more text-center">
                            <a href="#"><button className="ocean-button" id="oceanButton"><i className="fa-brands fa-instagram"></i> Theo dõi trên Instagram</button></a>
                        </div>
                    </div>
                </div>
{/* <!-- footer-intagram --> */}
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
export default footer