import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Ud_Infor_User() {

  const [user, setUser] = useState(null);
  const [message] = useState("");
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('auth'));
  // console.log(user);
  // console.log(storedUser);
  
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

  //update info
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Kiểm tra thông tin người dùng trong localStorage
  
    // Nếu không có thông tin người dùng trong localStorage, dừng lại
    if (!storedUser) {
      alert("Không tìm thấy thông tin người dùng.");
      return;
    }
  
    const id_user = storedUser.id_user; // Lấy id_user từ localStorage
    // Cập nhật thông tin người dùng từ state nếu có, nếu không thì từ localStorage
    const updatedUser = {
      id_user: user?.id_user || storedUser?.id_user || '',
      ten_user: user?.ten_user || storedUser?.ten_user || '',
      sdt_user: user?.sdt_user || storedUser?.sdt_user || '',
      email_user: user?.email_user || storedUser?.email_user || '',
      address: user?.address || storedUser?.address || '',
      gender: user?.gender || storedUser?.gender || '',
      dob: user?.dob || storedUser?.dob || '',
    };
  
    try {
      const response = await fetch(`http://localhost:3000/user/${id_user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Cập nhật thông tin thành công');
        // Cập nhật lại thông tin người dùng trong ứng dụng (state hoặc localStorage)
        localStorage.setItem('auth', JSON.stringify(updatedUser)); // Cập nhật lại localStorage nếu cần
      } else {
        alert(data.thongbao || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi cập nhật:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  // Xử lý thay đổi giá trị trong các trường input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
            <form method="post" className="edit_user" onSubmit={handleSubmit}>
              <div className="left">
                <div className="field">
                  <label htmlFor="ten">Tên</label>
                  <input
                    type="text"
                    name="ten_user"
                    id="ten"
                    placeholder="Tên"
                    value={user.ten_user || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="dt">Điện Thoại</label>
                  <input
                    type="text"
                    name="sdt_user"
                    id="dt"
                    placeholder="Điện Thoại"
                    value={user.sdt_user || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="dc">Địa Chỉ</label>
                  <input
                    type="text"
                    name="address"
                    id="dc"
                    placeholder="Địa Chỉ"
                    value={user.address || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="right">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email_user"
                    id="email"
                    placeholder="Email"
                    value={user.email_user || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field date_field">
                  <label htmlFor="ngaysinh">Ngày Sinh</label>
                  <input
                    type="date"
                    name="dob"
                    id="ngaysinh"
                    placeholder="Ngày Sinh"
                    value={user.dob || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field radio_field">
                  <p className="title_gioitinh">Giới Tính</p>
                  <div className="wrap_sex">
                    <label htmlFor="nam">Nam</label>
                    <input
                      type="radio"
                      name="gender"
                      id="nam"
                      value="1"
                      checked={user.gender === "1"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="nu">Nữ</label>
                    <input
                      type="radio"
                      name="gender"
                      id="nu"
                      value="2"
                      checked={user.gender === "2"}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <button
                    className="btn_edituser btn btn-primary btn-style btn-login"
                    type="submit"
                    name="edituser"
                    id="edituser"
                  >
                    Lưu Thông Tin
                  </button>
                </div>
              </div>
            </form>
            {message && <p>{message}</p>}
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

export default Ud_Infor_User;
