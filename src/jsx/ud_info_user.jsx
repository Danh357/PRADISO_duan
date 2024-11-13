import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Ud_Infor_User() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    // Kiểm tra xem có dữ liệu người dùng trong localStorage hay không
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('auth'));
      if (storedUser) {
        setUser(storedUser); // Lưu thông tin người dùng vào state
      }
    }, []);
  
    // Hàm đăng xuất
    const handleLogout = () => {
      // Xóa thông tin người dùng khi đăng xuất
      localStorage.removeItem('auth');
      setUser(null); // Đặt lại state user về null
  
      // Điều hướng người dùng về trang đăng nhập hoặc trang chủ
      navigate('/'); 
      window.location.reload(); // Điều hướng về trang chủ (hoặc trang đăng nhập '/login')
    };
  
    if (!user) {
      // Nếu không có người dùng, có thể hiển thị trang đăng nhập hoặc thông báo khác
      return <div>Chưa đăng nhập. Vui lòng đăng nhập lại.</div>;
    }
    return(
        <div className="main">
            <div className="danh">123</div>
            <div class="body_profile min_warp2">
                <div class="main_tk">
                    <div class="thongtin">
                        <div class="box_user">
                        <div className="main_title">Xin Chào <span className="primary">{user.name}</span></div>
                        </div>
                        <div class="box_link">
                            <Link to={'/infor_user'} class="tab_item active">
                                <i class="fa-light fa-circle-info"></i>
                                Thông Tin Tài Khoản
                            </Link>
                            <Link to={'/ud_infor'} class="tab_item">
                                <i class="fa-light fa-user"></i>
                                Chỉnh Sửa Tài Khoản
                            </Link>
                            <Link to={'/quen_mk'} class="tab_item">
                                <i class="fa-light fa-lock"></i>
                                Đổi Mật Khẩu
                            </Link>
                            <Link to={'/ql_dhang'} class="tab_item">
                                <i class="fa-light fa-clipboard-list"></i>
                                Quản Lí Đơn Hàng
                            </Link>
                        </div>
                        <form method="post" class="edit_user">
                            <div class="left">
                                <div class="field">
                                    <label for="ten">Tên</label>
                                    <input type="text" name="ten" id="ten" placeholder="Tên" value="Tên Người Dùng"/>
                                </div>
                                <div class="field">
                                    <label for="dt">Điện Thoại</label>
                                    <input type="text" name="dt" id="dt" placeholder="Điện Thoại" value="Số Điện Thoại"/>
                                </div>
                                <div class="field">
                                    <label for="dc">Địa Chỉ</label>
                                    <input type="text" name="dc" id="dc" placeholder="Địa Chỉ" value="Địa Chỉ"/>
                                </div>
                            </div>
                            <div class="right">
                                <div class="field">
                                    <label for="email">Email</label>
                                    <input type="text" name="email" id="email" placeholder="Email" value="Địa Chỉ Email"/>
                                </div>
                                <div class="field date_field">
                                    <label for="ngaysinh">Ngày Sinh</label>
                                    <input type="date" name="ngaysinh" id="ngaysinh" placeholder="Ngày Sinh" value="Ngày Sinh"/>
                                </div>
                                <div class="field radio_field">
                                    <p class="title_gioitinh">Giới Tính</p>
                                    <div class="wrap_sex">
                                        <label for="nam">Nam</label>
                                        <input type="radio" name="gioitinh" id="nam" value="1"/>
                                        <label for="nu">Nữ</label>
                                        <input type="radio" name="gioitinh" id="nu" value="2"/>
                                    </div>
                                </div>
                                <div class="field">
                                    <label for="edituser"></label>
                                    <button class="btn_edituser btn btn-primary btn-style btn-login" type="submit" name="edituser" id="edituser">Lưu Thông Tin</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="tab">
                        <h1 class="tab_title">Tài Khoản</h1>
                        <div class="tab_list">
                            <Link to={'/infor_user'} class="link active">
                                <i class="fa-light fa-circle-info"></i>
                                Thông Tin Tài Khoản
                            </Link>
                            <Link to={'/ud_infor'} class="link">
                                <i class="fa-light fa-user"></i>
                                Chỉnh Sửa Tài Khoản
                            </Link>
                            <Link to={'/quen_mk'} class="link">
                                <i class="fa-light fa-lock"></i>
                                Đổi Mật Khẩu
                            </Link>
                            <Link to={'/ql_dhang'} class="link">
                                <i class="fa-light fa-clipboard-list"></i>
                                Quản Lí Đơn Hàng
                            </Link>
                            <div onClick={handleLogout} class="tab_item logout_user">
                                <i class="fa-sharp fa-regular fa-period"></i>
                                Đăng Xuất
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
    
}
export default Ud_Infor_User;