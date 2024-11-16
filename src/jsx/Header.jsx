import React, { useState, useEffect, useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
function Header() {
    const [active, setActive] = useState(false);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    // uuuser
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Tham chiếu đến dropdown
    const [favoriteCount, setFavoriteCount] = useState(0);//yeu thich
    const [user, setUser] = useState(null); // Thông tin người dùng
    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập khi component mount
        const storedUser = JSON.parse(localStorage.getItem('auth'));
        if (storedUser) {
        setIsLoggedIn(true);
        setUser(storedUser);  // Lưu thông tin người dùng vào state
        }
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
      
    const handleLogout = () => {
        // Xóa thông tin người dùng khi đăng xuất
        localStorage.removeItem('auth');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
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

    //yeuthich
    const updateFavoriteCount = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavoriteCount(favorites.length);
    };
      useEffect(() => {
      // Cập nhật số lượng yêu thích khi component được render lần đầu
      updateFavoriteCount();
  
      // Lắng nghe sự kiện "storage" để cập nhật khi localStorage thay đổi từ nơi khác
      window.addEventListener('storage', updateFavoriteCount);
  
      // Xóa lắng nghe sự kiện khi component bị unmount
      return () => window.removeEventListener('storage', updateFavoriteCount);
    }, [JSON.parse(localStorage.getItem('favorites')).length]);

     // reload trang
     const handleLogoClick = () => {
        window.location.reload();
    };

    return(
        <header>
        <div className="bg_menu" data-aos="fade" data-aos-easing="linear" data-aos-duration="700">
            <div className="min_warp">
                <div className="wap_menu">
                    <div className="logo">
                        <Link to="/">
                            <img  onClick={handleLogoClick} src="/image/Logo.png" alt="Logo PARADICO"/>
                        </Link>
                    </div>
                    {/* <!-- logo --> */}
                  <div className="wap_menu2">
                    <div className="wap_menu3">
                    <nav className="navbar">
                        <ul className="list_menu">
                            <li>
                            <NavLink exact to="/" activeClassName="active">
                                Trang chủ
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to="/phong" activeClassName="active">
                                Phòng
                            </NavLink>
                            </li>
                            <li className="has-submenu">
                            <NavLink to="/dichvu" activeClassName="active">
                                Dịch vụ tại Paradiso
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 128 128">
                                <g><path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z"></path></g>
                                </svg>
                            </NavLink>
                            <ul className="menuList-submain">
                                <li>
                                <NavLink to="/dichvu/nhahang" activeClassName="active">
                                    Nhà hàng
                                </NavLink>
                                </li>
                                <li>
                                <NavLink to="/dichvu/tiecsukien" activeClassName="active">
                                    Tiệc &amp; Sự kiện
                                </NavLink>
                                </li>
                                <li>
                                <NavLink to="/dichvu/spa" activeClassName="active">
                                    Spa &amp; Massage
                                </NavLink>
                                </li>
                            </ul>
                            </li>
                            <li>
                            <NavLink to="/cndulich" activeClassName="active">
                                Cẩm nang du lịch
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to="/gioithieu" activeClassName="active">
                                Giới thiệu
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to="/lienhe" activeClassName="active">
                                Liên hệ
                            </NavLink>
                            </li>
                        </ul>
                    </nav>
                        <div className="wap_login_contact">
                            {isLoggedIn ? (
                                <div className="user-display"  ref={dropdownRef}>
                                <Link to={'/thich'}>
                                    <span className="num_cart" ><i height class="fa-light fa-heart"></i>
                                    <p className="num_click_c" id="card_num">{favoriteCount}</p>
                                    </span>
                                </Link>
                                    <span id="menuButton" onClick={toggleDropdown} className="user-name">{user.ten_user}</span>
                                   <img
                                        id="menuButton"
                                        onClick={toggleDropdown}
                                        src={user.image || '../../image/user_md.png'}
                                        alt="User"
                                        className="user-image"
                                    />
                                    {showDropdown && (
                                        <div id="dropdown" className="dropdown_user_logout" >
                                            <Link to="/infor_user">
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
                                    <div className="header_hotline">
                                      <Link to={'/dk_dn'}><span>Đăng Nhập</span></Link>
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
                                <Link to="/">
                                    <img src="/image/Logo.png" alt="Logo PARADICO"/>
                                </Link>
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
