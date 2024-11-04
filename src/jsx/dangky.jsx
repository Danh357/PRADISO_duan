import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';


function Registration() {
    const [email_user, setEmail] = useState('');
    const [pass_user, setPassword] = useState('');
    const [sdt_user, setDienThoai] = useState('');
    const [ten_user, setName] = useState('');
    const navigate = useNavigate();

    const handleRegistration = () => {
        if (email_user === '' || pass_user === '' || sdt_user === '' || ten_user === '') {
            alert('Vui lòng nhập đủ thông tin đăng ký');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_user)) {
            alert('Vui lòng nhập đúng định dạng email');
            return;
        }

        let url = 'http://localhost:3000/Register';
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email_user, pass_user,sdt_user , ten_user }),
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    alert('Lỗi đăng ký: ' + data.error);
                } else {
                    alert('Đăng ký thành công');
                    navigate('/login');
                }
            })
    };

    return (
        <div className="form">
            <div className="registration-form">
                <form>
                    <h1>Đăng ký</h1>
                    <div className="input-group">
                     <label htmlFor="username">Họ và Tên</label>
                        <input
                            type="text"
                            placeholder="Nhập Họ và Tên"
                            value={ten_user}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            placeholder="Nhập Email"
                            value={email_user}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Mật Khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập Mật Khẩu"
                            value={pass_user}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Số Điện Thoại </label>
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            value={sdt_user}
                            onChange={(e) => setDienThoai(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={handleRegistration}>
                        Đăng ký
                    </button>
                    <div className="login-link">
                        <p>Bạn đã có tài khoản? <a href="/login">Đăng Nhập</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;