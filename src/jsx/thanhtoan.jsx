import React, { useState } from "react";
// import "./thanhtoan.css";

function Thanhtoan() {
  const [arrivalDate, setArrivalDate] = useState('2024-01-01');
  const [returnDate, setReturnDate] = useState('2024-01-02');

  return (
    <div className="section">
      {/* container */}
      <div className="container">
        {/* row */}
        <div className="roww">
          <div className="col-md-7">
            {/* Billing Details */}
            <div className="billing-details">
              <div className="section-title">
                <h3 className="title">Thông tin người đặt</h3>
              </div>

              <div className="form-group">
                <input
                  className="input"
                  type="text"
                  name="last-name"
                  placeholder="Họ và tên"
                />
              </div>
              <div className="form-group">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  className="input"
                  type="tel"
                  name="tel"
                  placeholder="SDT"
                />
              </div>
            </div>
            {/* /Billing Details */}

            {/* Order notes */}
            <div className="order-notes">
              <textarea className="input" placeholder="Ghi chú"></textarea>
            </div>
            {/* /Order notes */}
          </div>

          {/* Order Details */}
          <div className="col-md-5 order-details">
            <div className="section-title text-center">
              <h3 className="title">Đơn thanh toán</h3>
            </div>
            <div className="order-summary">
              <div className="order-col">
                <div>
                  <strong>Tên phòng</strong>
                </div>
                <div>
                  <strong>Tổng tiền</strong>
                </div>
              </div>
              <div className="order-products">
                <div className="order-col">
                  <div>1x Name Goes Here</div>
                  <div>500.000VND</div>
                </div>
              </div>
              <div className="order-products">
                <div className="order-col">
                  <div>Ngày đến:</div>
                  <input
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="input"
                  />
                </div>
              </div>
              <div className="order-products">
                <div className="order-col">
                  <div>Ngày trả:</div>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="input"
                  />
                </div>
              </div>
              <div className="order-voucher"> VOUCHER giảm giá : 
              <select id="country" name="country" className="input-select">
                <option value="vn">10%</option>
                <option value="us">20%</option>
                <option value="jp">30%</option>
              </select>
              </div>
             
              <div className="order-col">
                <div>
                  <strong>TỔNG</strong>
                </div>
                <div>
                  <strong className="order-total">1.000.000VND</strong>
                </div>
              </div>
            </div>
            <div className="payment-method">
              <div className="input-radio">
                <input type="radio" name="payment" id="payment-1" />
                <label htmlFor="payment-1">
                  <span></span>
                  Chuyển khoản ngân hàng trực tiếp
                </label>
              </div>
              <div className="input-radio">
                <input type="radio" name="payment" id="payment-3" />
                <label htmlFor="payment-3">
                  <span></span>
                  Thanh toán bằng Paypal
                </label>
              </div>
            </div>
            <div className="input-checkbox">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                <span></span>
                Tôi đã đọc và chấp nhận các{" "}
                <a href="#">điều khoản & điều kiện</a>
              </label>
            </div>
            <a href="#" className="primary-btn order-submit">
              Thanh toán
            </a>
          </div>
          {/* /Order Details */}
        </div>
        {/* /row */}
      </div>
      {/* /container */}
    </div>
  );
}

export default Thanhtoan;
