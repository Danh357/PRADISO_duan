import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation(); // Lấy đường dẫn hiện tại
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
    const storedUser = JSON.parse(localStorage.getItem('auth')); // Lấy thông tin từ localStorage

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập khi component mount
        if (!storedUser) {
            setIsLoggedIn(false);
        }
    }, [storedUser]);

    console.log(storedUser);

    // Điều hướng theo vai trò
    if (!storedUser) {
        return <Navigate to="/dk_dn" replace />; // Chưa đăng nhập
    }

    const { role } = storedUser;

    if (role === 0) {
        // Admin: Luôn vào "/admin"
        if (location.pathname !== "/admin") {
            return <Navigate to="/admin" replace />;
        }
    } else if (role === 1) {
        // Nhân viên: Luôn vào "/nhanvien"
        if (location.pathname !== "/nhanvien") {
            return <Navigate to="/nhanvien" replace />;
        }
    } else if (role === 2) {
        // Người dùng: Xử lý trường hợp truy cập trái phép
        if (location.pathname === "/admin") {
            return <Navigate to="/unauthorized" replace />; // Chuyển hướng đến trang không đủ quyền
        }
        // Người dùng: Luôn vào "/"
        if (location.pathname !== "/") {
            return <Navigate to="/" replace />;
        }
    } else {
        // Người dùng không hợp lệ: Luôn vào "/notfound"
        if (location.pathname !== "/notfound") {
            return <Navigate to="/notfound" replace />;
        }
    }

    return children; // Trả về nội dung nếu tất cả điều kiện đều hợp lệ
};

export default PrivateRoute;
