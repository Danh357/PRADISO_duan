import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Infor_User_Qldh() {
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

  return (
    <div className="main">
      <div className="danh">123</div>
      <div className="body_profile min_warp2">
        <div className="main_tk">
          <div className="thongtin">
            <div className="box_user">
              <div className="main_title">Xin Chào <span className="primary">{user.name}</span></div>
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
            <div className="box_tieude">
              <h1>Đơn Hàng Của Bạn</h1>
            </div>
            <table className="table_cart">
              <thead>
                <tr>
                  <th>Thứ Tự</th>
                  <th>Thông Tin Sản Phẩm</th>
                  <th>Số Lượng</th>
                  <th>Tổng Tiền</th>
                  <th>Trạng Thái</th>
                  <th>Công Cụ</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- Replace with static data or leave empty --> */}
                <tr>
                  <td>1</td>
                  <td style={{ textAlign: 'left' }}>
                    Đơn Hàng <strong>ID</strong> - Ngày tháng<br />
                    <strong>Hình Thức Thanh Toán:</strong> Tiền Mặt
                  </td>
                  <td>Số Lượng</td>
                  <td className="price_tk">Tổng Tiền đ</td>
                  <td>Chờ</td>
                  <td><a href="print_donhang/ID.htm" target="_blank"><img src="imgs/admin/in.png" className="icon_btn" /></a></td>
                </tr>
                {/* <!-- Repeat rows as needed --> */}
              </tbody>
            </table>
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
              <div onClick={handleLogout} className="tab_item logout_user">
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

export default Infor_User_Qldh;
