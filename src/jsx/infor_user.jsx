import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Infor_User() {
  const [user, setUser] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem('auth'));
  const navigate = useNavigate();
  // Hàm đăng xuất
  const handleLogout = () => {
    // Xóa thông tin người dùng khi đăng xuất
    localStorage.removeItem('auth');
    setUser(null); // Đặt lại state user về null

    // Điều hướng người dùng về trang đăng nhập hoặc trang chủ
    navigate('/'); 
    window.location.reload(); // Điều hướng về trang chủ (hoặc trang đăng nhập '/login')
  };
 // Kiểm tra xem có dữ liệu người dùng trong localStorage hay không
  useEffect(() => {
  // console.log(storedUser);
  if (storedUser) {
    // Nếu có thông tin người dùng trong localStorage, set state user
    setUser(storedUser);

    // Gửi yêu cầu tới server để lấy thêm dữ liệu người dùng nếu cần
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${storedUser.id_user}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Cập nhật thông tin người dùng từ server
        } else {
          console.error('Lỗi khi lấy thông tin người dùng từ server');
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi kết nối tới server:', error);
      }
    };
    fetchUserData(); // Gọi hàm lấy dữ liệu người dùng từ server
  }
}, []);

  if (!user) {
    // Nếu không có người dùng, có thể hiển thị trang đăng nhập hoặc thông báo khác
    return <div>Chưa đăng nhập. Vui lòng đăng nhập lại.</div>;
  }

  return (
    <div className="main">
      <div className="danh">123</div>
      <div className="body_profile min_warp2">
        <div className="main_tk">
          <div className="thongtin">
            <div className="box_user">
              <div className="main_title">Xin Chào <span className="primary">{user.ten_user}</span></div>
            </div>
            <div className="box_link">
              <Link to={'/infor_user'} className="tab_item active">
                <i className="fa-light fa-circle-info"></i>
                Thông Tin Tài Khoản
              </Link>
              <Link to={'/ud_infor'} className="tab_item">
                <i className="fa-light fa-user"></i>
                Chỉnh Sửa Tài Khoản
              </Link>
              <Link to={'/quen_mk'} className="tab_item">
                <i className="fa-light fa-lock"></i>
                Đổi Mật Khẩu
              </Link>
              <Link to={'/ql_dhang'} className="tab_item">
                <i className="fa-light fa-clipboard-list"></i>
                Quản Lí Đơn Hàng
              </Link>
            </div>
            <div className="box_content">
              <div className="box_tieude">
                <h1>Thông Tin Tài Khoản</h1>
                {/* <a className="to_capnhat" href="thong-tin-tai-khoan.htm">Cập Nhật Thông Tin</a> */}
              </div>
              <div className="content_tt">
                <div className="left">
                  <p>Họ và Tên</p>
                  <p>Điện Thoại</p>
                  <p>Email</p>
                  <p>Địa Chỉ</p>
                  <p>Ngày Sinh</p>
                  <p>Giới Tính</p>
                </div>
                <div className="right">
                <p>{user.ten_user}</p>
                <p> {user.sdt_user}</p>
                <p>{user.email_user}</p>
                <p>{user.address}</p>
                <p>{new Date(user.dob).toLocaleDateString('vi-VN')}</p>
                <p>{user.gender === '1' ? 'Nam' : user.gender === '2' ? 'Nữ' : 'chưa cập nhật'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="tab">
            <h1 className="tab_title">Tài Khoản</h1>
            <div className="tab_list">
              <Link to={'/infor_user'} className="link active">
                <i className="fa-light fa-circle-info"></i>
                Thông Tin Tài Khoản
              </Link>
              <Link to={'/ud_infor'} className="link">
                <i className="fa-light fa-user"></i>
                Chỉnh Sửa Tài Khoản
              </Link>
              <Link to={'/quen_mk'} className="link">
                <i className="fa-light fa-lock"></i>
                Đổi Mật Khẩu
              </Link>
              <Link to={'/ql_dhang'} className="link">
                <i className="fa-light fa-clipboard-list"></i>
                Quản Lí Đơn Hàng
              </Link>
              <div onClick={handleLogout}  className="tab_item logout_user">
                <i className="fa-sharp fa-regular fa-period"></i>
                Đăng Xuất
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Infor_User;
