import React, { useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
function Header() {
    const [active, setActive] = useState(false);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);

    // uuuser
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ name: '', image: '' }); // State cho thông tin người dùng

    const handleLogin = () => {
        // Giả lập quá trình đăng nhập thành công
        const fakeUser = { name: "phượng    ", image: "https://via.placeholder.com/40" };
        setUser(fakeUser);
        setIsLoggedIn(true); // Đặt trạng thái đăng nhập thành true
    };
    const handleLogout = () => {
        // Đặt lại trạng thái đăng nhập và thông tin người dùng
        setUser({ name: '', image: '' });
        setIsLoggedIn(false);
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
  
    // Toggle dropdown khi nhấp vào nút
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
    // Đóng dropdown nếu người dùng nhấp bên ngoài
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    return(
        <header>
        <div className="bg_menu" data-aos="fade" data-aos-easing="linear" data-aos-duration="700">
            <div className="min_warp">
                <div className="wap_menu">
                    <div className="logo">
                        <Link to="/">
                            <img src="/image/Logo.png" alt="Logo PARADICO"/>
                        </Link>
                    </div>
                    {/* <!-- logo --> */}
                  <div className="wap_menu2">
                    <div className="wap_menu3">
                        <nav className="navbar">
                            <ul className="list_menu">
                                <li className="">
                                    <Link to="/" title="Trang chủ"> 
                                        Trang chủ
                                    </Link>
                                </li>
                                <li className="">
                                    <Link to="/phong" title=""> 
                                        Phòng
                                    </Link>
                                </li>
                                <li className="has-submenu active ">
                                    <Link to="/dichvu" title="Dịch vụ tại Paradiso">
                                        Dịch vụ tại Paradiso
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" x="0" y="0" viewBox="0 0 128 128"><g><path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z"></path></g></svg>
                                    </Link>
                                    <ul className="menuList-submain">
                                        <li className="active">
                                            <a href="./Dich_Vu.html" title="Nhà hàng"> 
                                                Nhà hàng
                                            </a>
                                        </li>
                                        <li className="">
                                            <a href="./Tiec_sk.html" title="Tiệc &amp; Sự kiện"> 
                                                Tiệc &amp; Sự kiện
                                            </a>
                                        </li>
                                        <li className="">
                                            <a href="./Spa_ms.html" title="Spa &amp; Massage"> 
                                                Spa &amp; Massage
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="">
                                    <Link to="/cndulich" title=""> 
                                    Cẩm nang du lịch
                                    </Link>
                                </li>
                                <li className="">
                                    <Link to="/gioithieu" title=""> 
                                    Giới thiệu
                                    </Link>
                                </li>
                                <li className="">
                                    <Link to="/lienhe" title=""> 
                                    Liên hệ
                                    </Link>
                                </li>
                            </ul>  
                        </nav>
                        <div className="wap_login_contact">
                            {isLoggedIn ? (
                                <div className="user-display"  ref={dropdownRef}>
                                <Link to={'/'}>
                                    <span className="num_cart" href="./cart.html"> <svg width="20" height="20" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg"><path d="M8.37408 0.0465755C8.67279 0.120485 8.89683 0.247189 9.12442 0.472435C9.4907 0.834944 9.60093 1.15874 9.60093 1.89079V2.33777L9.87831 2.43983C11.5497 3.05223 12.8263 4.40723 13.3028 6.08603C13.47 6.66323 13.4806 6.81809 13.5126 8.47929C13.5446 10.2109 13.5624 10.4326 13.7651 11.2597C13.9856 12.1501 14.3874 13.0546 14.9102 13.836C15.1378 14.1773 15.344 14.4378 15.8739 15.0431C16.0872 15.2895 16.009 15.6872 15.7174 15.835C15.5823 15.9019 15.5147 15.9054 13.093 15.9054H10.6038L10.5824 16.0251C10.49 16.5143 10.0561 17.1478 9.56537 17.5068C9.34845 17.6652 8.95728 17.8517 8.67635 17.9327C8.38831 18.0136 7.68776 18.0242 7.39616 17.9502C6.50002 17.7285 5.7568 17.0528 5.48654 16.2187L5.38696 15.9054H2.90481C0.490226 15.9054 0.419104 15.9019 0.283973 15.835C0.191514 15.7893 0.116836 15.7154 0.0706072 15.6239C-0.0645256 15.3634 -0.0111828 15.1769 0.280416 14.8672C1.18722 13.9063 1.90911 12.5795 2.23627 11.2597C2.43896 10.4432 2.4603 10.2144 2.48875 8.47929C2.52075 6.81457 2.53142 6.66675 2.69856 6.08251C3.17152 4.41075 4.50861 2.99943 6.15864 2.42224L6.40045 2.33777V1.89079C6.40045 1.16226 6.51069 0.834944 6.88052 0.468916C7.27881 0.0712128 7.83711 -0.0871639 8.37408 0.0465755ZM7.75177 1.12354C7.5384 1.23265 7.46728 1.39806 7.46728 1.79929V2.1266H8.00069H8.53411V1.79225C8.53055 1.39806 8.47721 1.26432 8.26384 1.13762C8.09315 1.03555 7.93668 1.03204 7.75177 1.12354ZM7.3606 3.21764C6.84852 3.29507 6.53203 3.39362 6.06262 3.61887C4.80732 4.22774 3.95742 5.30822 3.64448 6.68435C3.59469 6.89903 3.57691 7.25098 3.55558 8.54968C3.53068 9.88708 3.51646 10.225 3.45601 10.6086C3.22842 12.0375 2.74834 13.2799 1.98023 14.4167C1.84154 14.6243 1.71708 14.8073 1.71352 14.8214C1.70641 14.839 4.53706 14.8496 8.00069 14.8496C11.4643 14.8496 14.295 14.839 14.2879 14.8214C14.2808 14.8073 14.1598 14.6243 14.0212 14.4167C13.2566 13.2834 12.7694 12.0234 12.5454 10.6121C12.4849 10.2285 12.4707 9.88357 12.4458 8.54968C12.4245 7.25098 12.4067 6.89903 12.3569 6.68435C12.1578 5.80447 11.7595 5.08297 11.1336 4.46354C10.7389 4.0764 10.3762 3.82299 9.8712 3.58367C9.09241 3.21764 8.20695 3.08742 7.3606 3.21764ZM6.50713 15.9265C6.50713 16.0145 6.76673 16.3982 6.91609 16.5319C7.5384 17.095 8.44876 17.1021 9.07108 16.5495C9.23821 16.3982 9.43024 16.1307 9.47647 15.9829L9.49781 15.9054H8.00425C7.17924 15.9054 6.50713 15.916 6.50713 15.9265Z"></path><path d="M13.5626 1.8943C13.6764 1.97173 14.1102 2.4363 14.3485 2.7425C15.2411 3.88986 15.8314 5.3786 15.963 6.82511C16.0199 7.43751 16.0127 7.64868 15.931 7.81057C15.8492 7.96895 15.6465 8.09213 15.4687 8.09213C15.1557 8.09213 14.9352 7.83169 14.9352 7.46214C14.9352 7.14891 14.8712 6.56819 14.7894 6.17401C14.5654 5.07593 13.9787 3.90393 13.2425 3.08389C12.7874 2.5806 12.766 2.54541 12.766 2.34128C12.766 2.14067 12.8407 1.99989 13.0007 1.8943C13.1394 1.8028 13.4239 1.80631 13.5626 1.8943Z"></path><path d="M3.00065 1.8943C3.16067 1.99989 3.23535 2.14067 3.23535 2.3448C3.23535 2.54541 3.22824 2.55597 2.74461 3.10149C2.01206 3.92505 1.43241 5.08648 1.21194 6.17401C1.13014 6.56819 1.06614 7.14891 1.06614 7.46214C1.06614 7.83169 0.845657 8.09213 0.532721 8.09213C0.354917 8.09213 0.152219 7.96895 0.0704293 7.81057C-0.0113609 7.6522 -0.0184731 7.43399 0.0348682 6.84271C0.173556 5.36452 0.781648 3.84058 1.6849 2.70731C1.96583 2.35536 2.3001 1.99285 2.42456 1.90486C2.57392 1.8028 2.85129 1.79928 3.00065 1.8943Z"></path></svg>
                                    <p className="num_click_c" id="card_num">0</p>
                                    </span>
                                </Link>
                                    <span id="menuButton" onClick={toggleDropdown} className="user-name">{user.name}</span>
                                    <img id="menuButton" onClick={toggleDropdown} src={user.image} alt="User" className="user-image" />
                                    {showDropdown && (
                                        <div id="dropdown" className="dropdown_user_logout" >
                                            <Link to="/profile">
                                               <div className="bg_btn_login_out">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"></path>
                                                    </svg>
                                                    <span>
                                                        Hồ sơ cá nhân
                                                    </span>
                                               </div>
                                            </Link>
                                            <Link to="/" onClick={handleLogout}>
                                            <div className="bg_btn_login_out">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"></path>
                                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                                                </svg>
                                                <span>
                                                    Đăng xuất
                                                </span>
                                            </div>
                                            </Link>
                                        </div>
                                )}  
                                </div>
                            ) : (
                                <>
                                    <div className="header_hotline" onClick={handleLogin}>
                                        <span>Đăng Nhập</span>
                                    </div>
                                    <div className="contact_menu">
                                        <a href="#">
                                            <button className="ocean-button" id="oceanButton">Liên hệ ngay</button>
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                  </div>
                    {/* <!-- nav -->
                    <!-- navmobile -->npmnpm s
                    <!-- hiển thị thanh slidebar mobile bằng input checked --> */}
                    <label  htmlFor="click_open_close" className="menu_icon" id="menu-icon"><i className="fa-light fa-bars"></i></label>
                    <input hidden type="checkbox" name="" className="nav_input" id="click_open_close"/>
                    <label  htmlFor="click_open_close" className="box_overlay"></label>
                        {/* <!-- slidebar mobile --> */}
                        <div className="sidebar_mobile">
                            <label  htmlFor="click_open_close" className="x_sdide_bar"><i className="fa-sharp fa-regular fa-x"></i></label>
                            <div className="logo_mb">
                                <a href="#">
                                    <img src="/image/Logo.png" alt="Logo PARADICO"/>
                                </a>
                            </div>
                            <div className="dkdn_mb">
                                <p className="t_dkdn_mb">Đăng nhập để hưởng những đặc quyền dành riêng cho thành viên.</p>
                                <a href="#">Đăng nhập &amp; Đăng ký</a>
                            </div>
                            <div className="wap_menu_mobile"> 
                                <ul className="menu_mobile">
                                    <li><a href="./index.html" className="active" >Trang chủ</a></li>
                                    <li className="has-submenu">
                                        <a href="#" className={"submenu-toggle" + (active ? ' active' : '')} >Về Paradico <span onClick={() => setActive(!active)}><i className="fa-light fa-chevron-down"></i></span></a>
                                        <ul className={"submenu_mobile" + (active ? ' active' : '')}>
                                            <li><a href="XXXX">blabla</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="XXXX">Phòng</a></li>
                                    <li className="has-submenu">
                                        <a href="#" className={"submenu-toggle" + (active1 ? ' active' : '')} >Dịch vụ tại Paradico <span onClick={() => setActive1(!active1)}><i className="fa-light fa-chevron-down"></i></span></a>
                                        <ul className={"submenu_mobile" + (active1 ? ' active' : '')}>
                                            <li><a href="./dvkd_map.html">Đơn vị kinh doanh Map</a></li>
                                            <li><a href="./dvkd_navi.html">Đơn vị kinh doanh Navigation</a></li>
                                            <li><a href="./dvkd_tracking.html">Đơn vị kinh doanh Tracking</a></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <a href="#" className={"submenu-toggle" + (active2 ? ' active' : '')} >Cẩm nang du lịch <span onClick={() => setActive2(!active2)}><i className="fa-light fa-chevron-down"></i></span></a>
                                        <ul className={"submenu_mobile" + (active2 ? ' active' : '')}>
                                            <li><a href="./dvkd_map.html">Đơn vị kinh doanh Map</a></li>
                                            <li><a href="./dvkd_navi.html">Đơn vị kinh doanh Navigation</a></li>
                                            <li><a href="./dvkd_tracking.html">Đơn vị kinh doanh Tracking</a></li>
                                        </ul>
                                    </li>
                                    <li className="has-submenu">
                                        <a href="#" className={"submenu-toggle" + (active3 ? ' active' : '')} >Giới thiệu <span onClick={() => setActive3(!active3)}><i className="fa-light fa-chevron-down"></i></span></a>
                                        <ul className={"submenu_mobile" + (active3 ? ' active' : '')}>
                                            <li><a href="./dvkd_map.html">Đơn vị kinh doanh Map</a></li>
                                            <li><a href="./dvkd_navi.html">Đơn vị kinh doanh Navigation</a></li>
                                            <li><a href="./dvkd_tracking.html">Đơn vị kinh doanh Tracking</a></li>
                                        </ul>
                                    </li>

                                    <li><a href="./Lien_he.html">Liên hệ</a></li>
                                </ul>
                                <ul className="list_social_rwd">
                                    <li>
                                        <a href="#">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa-brands fa-x-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa-brands fa-square-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa-brands fa-youtube"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- slidebar mobile -->
                    <!-- navmobile --> */}
                </div>
            </div>
        </div>
       </header>
    )
}
export default Header;
