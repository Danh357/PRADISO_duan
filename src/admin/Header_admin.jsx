import React from "react";
import { Link } from "react-router-dom";
function Header_admin() {
    return(
        <div className="admin_warp">
            <div className="container_admin_para">
        {/* <!-- Sidebar --> */}
                <div className="sidebar_admin_para">
                    <div className="logo_admin_para">
                        <Link to={'/admin/home'}><h2>Paradiso</h2></Link>
                    </div>
                    <div className="navigation_admin_para">
                        <ul>
                            <li>
                                <a href="#" className="menu-toggle_admin_para">Quản lý Homestay <span className="badge_admin_para">3</span></a>
                                <ul className="sub-menu_admin_para">
                                    <li><a href="#">Danh sách Homestay</a></li>
                                    <li><a href="#">Thêm Homestay</a></li>
                                </ul>
                            </li>
                            <li><Link to={'/admin_homestay'}>Danh sách Homestay</Link></li>
                            <li><Link to={'/admin_add_homestay'}>Thêm Homestay</Link></li>
                            <li><a href="#">Quản lý loại Homestay</a></li>
                            <li><Link to={'/admin_loaihomestay'}>Danh sách loại Homestay</Link></li>
                            <li><Link to={'/admin_add_loai'}>Thêm loại Homestay</Link></li>
                            <li><a href="#">Quản lý User <span className="badge_admin_para">8</span></a></li>
                            <li><a href="#">Quản lý đơn hàng</a></li>
                        </ul>
                    </div>
                </div>

                {/* <!-- Main Content --> */}
                <div className="main-content_admin_para">
                    <contens>
                        <div className="header-left_admin_para">
                            <button className="menu-toggle_admin_para">☰</button>
                            <input type="text" placeholder="Search..."/>
                        </div>
                        <div className="header-right_admin_para">
                            <span>English</span>
                            <div className="notifications_admin_para">
                                <span>🔔</span>
                                <span className="badge_admin_para">4</span>
                            </div>
                        </div>
                    </contens>
                    <div class="content_admin_para">
                        {/* <!-- Main content here --> */}
                        <h1>Welcome to Velonic Admin</h1>
                    </div>
                   
                </div>

            </div>
    </div>
    )
}
export default Header_admin;