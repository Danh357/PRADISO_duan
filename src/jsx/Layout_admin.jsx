// Layout.js
import React from 'react';
import Header_admin from '../admin/Header_admin.jsx'




const Layout_admin = ({ children }) => {
  return (
    <div>
      <Header_admin />
      {children} {/* Các trang hợp lệ sẽ được render tại đây */}

    </div>
  );
};

export default Layout_admin;
