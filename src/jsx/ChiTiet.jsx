import React, { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link,useParams } from 'react-router-dom';
import DanhGia from './danhgia';
const ChiTiet = () => {
    const [checkInDate, setCheckInDate] = useState(new Date("2024-10-22"));
    const [checkOutDate, setCheckOutDate] = useState(new Date("2024-10-23"));

    const { id } = useParams();
    // const [user, setUser] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem('auth'));
    const [homestayCT, setHomestay] = useState(null);
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]); // Hình ảnh homestay
  
    // Hàm fetch hình ảnh homestay
    const fetchHomestayImages = async () => {
      try {
        const response = await fetch('http://localhost:3000/dshinhanh');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setImages(data); // Đặt dữ liệu vào state
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
  
    // Fetch hình ảnh khi component mount
    useEffect(() => {
      fetchHomestayImages();
    }, []);
    //lay theo id
    useEffect(() => {
        axios.get(`http://localhost:3000/homestay/${id}`)
            .then(response => {
                setHomestay(response.data);
            })
            .catch(err => {
                setError("Lỗi khi tải dữ liệu homestay");
            });
    }, [id]);
//san pham lien quan
    useEffect(() => {
        const fetchRooms = async () => {
          try {
            const response = await fetch(`http://localhost:3000/homestaylienquan/${id}`);
            const data = await response.json();
      
            // Lọc dữ liệu để loại bỏ các id_homestay trùng lặp
            const uniqueRooms = data.filter((room, index, self) => 
              index === self.findIndex((r) => r.id_homestay === room.id_homestay)
            );
      
            // Cập nhật danh sách rooms
            setRooms(uniqueRooms);
          } catch (error) {
            console.error("Error fetching rooms:", error);
          }
        };
        fetchRooms();
      }, [id]);
///kiemtra dang nhap mmoiws được yêu thích
      useEffect(() => {
        if (!storedUser) {
            console.log("Người dùng chưa đăng nhập.");
            // Nếu cần, có thể tự động điều hướng đến trang đăng nhập:
            // window.location.href = '/login';
        } else {
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
            fetchUserData();
        }
    }, []);
///them vào yeu thich
    const addToFavorites = () => {
    if (!storedUser) {
        // Nếu chưa đăng nhập, hiển thị thông báo và điều hướng đến trang đăng nhập
        const goToLogin = window.confirm("Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích. Bạn có muốn đến trang đăng nhập?");
        if (goToLogin) {
            window.location.href = '/dk_dn'; // Điều hướng đến trang đăng nhập
        }
        return;
    }
    if (homestayCT) { // Kiểm tra nếu dữ liệu homestay đã tải
        try {
            const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            
            // Kiểm tra xem homestay đã có trong danh sách yêu thích chưa
            const isFavorite = existingFavorites.some(item => item.id_homestay === homestayCT.id_homestay);
            
            if (!isFavorite) {
                const updatedFavorites = [...existingFavorites, homestayCT];
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                
                // Hiển thị thông báo với hai lựa chọn
                const goToFavorites = window.confirm("Đã thêm vào danh sách yêu thích. Bạn có muốn đi đến trang yêu thích?");
                
                if (goToFavorites) {
                    // Điều hướng đến trang yêu thích
                    window.location.href = '/thich'; // Đường dẫn đến trang yêu thích
                }
                // Nếu chọn Cancel thì sẽ tự động quay lại trang hiện tại (tiếp tục mua hàng)
            } else {
                alert("Sản phẩm này đã có trong danh sách yêu thích");
            }
        } catch (error) {
            console.error("Lỗi khi xử lý dữ liệu yêu thích:", error);
            alert("Đã xảy ra lỗi khi thêm vào danh sách yêu thích.");
        }
    }
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

//dat homestay
const [user, setUser] = useState({
    ten_user: '',
    sdt_user: '',
    email_user: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      ten_user: user.ten_user,
      sdt_user: user.sdt_user,
      email_user: user.email_user,
      checkInDate: checkInDate.toLocaleDateString("en-GB"),
      checkOutDate: checkOutDate.toLocaleDateString("en-GB"),
      gia_homestay: homestayCT.gia_homestay
    };
         // Kiểm tra các trường hợp hợp lệ trước khi gửi yêu cầu
        if (bookingData.ten_user.length > 20) {
            alert('Tên không được quá 20 ký tự.');
            return;
        }
    // Kiểm tra số điện thoại
    const phoneRegex = /^0\d{9}$/; // Chỉ cho phép 10 chữ số cho số điện thoại
    if (!phoneRegex.test(bookingData.sdt_user)) {
    alert('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
    return;
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(bookingData.email_user)) {
    alert('Email không hợp lệ. Vui lòng nhập lại.');
    return;
    }

    try {
      const response = await fetch('http://localhost:3000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        const data = await response.json();
        alert('Đặt phòng thành công');
        // Làm gì đó sau khi đặt phòng thành công
      } else {
        const data = await response.json();
        alert(data.message || 'Có lỗi xảy ra khi đặt phòng');
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi gửi yêu cầu:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };
    
    if (error) return <p>{error}</p>;
    if (!homestayCT) return <p>Loading...</p>;
    return (
        <div className="layout-c layout-pageProduct">
             {error ? (
                <p>{error}</p>
            ) : (
                homestayCT && (
            <section className="productDetail-information">
                <div className="danh">1234</div>
                <div className="productDetail--main">
                    <div className="wap_img_chitiet">
                        {images.length > 0 ? (
                                images.map((image, index) => {
                                    if (homestayCT.id_homestay === image.id_hinh) {
                                        return (
                                            <div key={image.id_homestay || index} className="add_img">
                                                <div className="image-gallery">
                                                    <div className="main-image">
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt={homestayCT.ten_homestay || "Main Image"} />
                                                    </div>
                                                    <div className="thumbnail-grid">
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt="Thumbnail 1" />
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt="Thumbnail 2" />
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt="Thumbnail 3" />
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt="Thumbnail 4" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null; // Ensures a return statement if condition is not met
                                })
                            ) : (
                                <p>Không có hình để hiển thị</p>
                            )}

                    </div>
                    <div className="min_warp2">
                        <div className="productDetail--content">
                            <div className="wrapbox-inner">
                                <div className="d-flex flex-wrap">
                                    <div className="col-lg-8 col-md-12 col-12 wrapbox-left">
                                        <div class="proloop-detail chitiet">
                                            <h3><Link to="">{homestayCT.ten_homestay}</Link></h3>
                                            <div class="pro-tag">
                                                <div class="tag-item tag-area">
                                                    <span>150</span> <span class="tag-unit">m<sup>2</sup></span>
                                                </div>                                     
                                                <div class="tag-item tag-guests">
                                                    <span>10</span> <span class="tag-unit">Guests</span>
                                                </div>
                                                <div class="tag-item tag-bed">
                                                    <span>5</span> <span class="tag-unit">Beds</span>
                                                </div>
                                                <div class="tag-item tag-bathroom">
                                                    <span>4</span> <span class="tag-unit">Bathroom</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapbox-detaill">
                                            <div className="content-desc">
                                                <div className="productDetail--box box -detail-description mg-top">
                                                    <div className="product-description chitiet">
                                                        <div className="description-content expandable-toggle opened">
                                                            <div className="description-productdetail">
                                                                <p>{homestayCT.mota}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-4 col-md-12 col-12 wrapbox-right" id="form-booking-pro">
                                        <div className="wrapbox-detail">
                                            <div className="product-price" id="price-preview">
                                                <span className="pro-title">ĐẶT PHÒNG: </span>
                                                <div className="pro-price-chitiet no-sale">
                                                    <div className="percent-price">
                                                        <span className="price">{homestayCT.gia_homestay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}<span className="person">/ Đêm</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            {/* <div className="product-variants hidden" style={{ display: 'none' }}>
                                                <form id="add-item-form" action="" method="post" className="variants clearfix">
                                                    <div className="select clearfix" style={{ display: 'none' }}>
                                                        <select id="product-select" name="id" style={{ display: 'none' }}>
                                                            <option value="1128215632">Default Title - 3,200,000₫</option>
                                                        </select>
                                                    </div>
                                                   
                                                </form>
                                            </div> */}
                                            <div className="form-booking_chitiet">
                                                <form id="formbooking" onSubmit={handleSubmit}>
                                                    <div className="contact-form">
                                                        <div className="row_bth">
                                                            <div className="col-sm-12 col-xs-12">
                                                                <div className="input-group">
                                                                    <input
                                                                        required
                                                                        type="text"
                                                                        name="ten_user" // Đảm bảo tên này khớp với đối tượng `user`
                                                                        id="full_name"
                                                                        data-valid="full_name"
                                                                        className="form-control"
                                                                        placeholder="Tên của bạn"
                                                                        value={user.ten_user || ''}
                                                                        onChange={handleInputChange}
                                                                        />
                                                                </div>
                                                                <p className="full_name-validation field-error"></p>
                                                            </div>
                                                            <div className="col-sm-12 col-xs-12">
                                                                <div className="input-group">
                                                                <input
                                                                    pattern="[0-9]{10,12}"
                                                                    required
                                                                    type="text"
                                                                    name="sdt_user" // Tên này cũng khớp với đối tượng `user`
                                                                    id="your_phone"
                                                                    data-valid="your_phone"
                                                                    className="form-control"
                                                                    placeholder="Số điện thoại"
                                                                    value={user.sdt_user || ''}
                                                                    onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                                <p className="your_phone-validation field-error"></p>
                                                            </div>
                                                            <div className="col-sm-12 col-xs-12">
                                                                <div className="input-group">
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    name="email_user" // Tên này cũng khớp với đối tượng `user`
                                                                    id="your_email"
                                                                    data-valid="your_email"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    value={user.email_user || ''}
                                                                    onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                                <p className="your_email-validation field-error"></p>
                                                            </div>
                                                            <div className="col-sm-12 col-xs-12">
                                                                <div className="pro-datepicker t-datepicker">
                                                                    <div className="pro-item pro-when pro-checkin">
                                                                        <div className="pro-form">
                                                                            <label>Ngày nhận phòng</label>
                                                                            <div className="t-check-in">
                                                                                <DatePicker
                                                                                    selected={checkInDate}
                                                                                    onChange={(date) => setCheckInDate(date)}
                                                                                    dateFormat="dd/MM/yyyy"
                                                                                    className="t-input-check-in"
                                                                                />
                                                                              
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="pro-item pro-when pro-checkout">
                                                                        <div className="pro-form">
                                                                            <label>Ngày trả phòng</label>
                                                                            <div className="t-check-out">
                                                                                <DatePicker
                                                                                    selected={checkOutDate}
                                                                                    onChange={(date) => setCheckOutDate(date)}
                                                                                    dateFormat="dd/MM/yyyy"
                                                                                    className="t-input-check-out"
                                                                                />
                                                                   
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <input type="hidden" name="entry.1366726942" value={checkInDate.toLocaleDateString("en-GB")} />
                                                                    <input type="hidden" name="entry.1192184549" value={checkOutDate.toLocaleDateString("en-GB")} />
                                                                </div>
                                                            </div>
                                                            {/* <div class="search-form">
                                                                <div class="group-dropdown-qty pd_chitiet">
                                                                    <label className="homestay_type" htmlFor="homestay-type">Loại homestay</label>
                                                                    <select id="homestay-type" name="homestay-type">
                                                                        <option value="beachfront">Homestay gần biển</option>
                                                                        <option value="mountain">Homestay trên núi</option>
                                                                        <option value="city">Homestay trong thành phố</option>
                                                                        <option value="countryside">Homestay vùng quê</option>
                                                                    </select>
                                                                </div>
                                                            </div> */}
                                                            <div className="col-sm-12 col-xs-12">
                                                                <input type="hidden" id="link_pro" name="entry.1473149859" value="https://maple-inn.myharavan.com/products/double -suite" />
                                                                <div className="pro-total">
                                                                    <label>Tổng cộng: </label>
                                                                    <div className="pro-num-total" data-price=""> 
                                                                    {homestayCT.gia_homestay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-xs-12 btn_like ">
                                                                <div className="btn-more text-center">
                                                                    <a href="#"><button className="ocean-button btn_like_cart" id="oceanButton">Đặt phòng ngay</button></a>
                                                                </div>
                                                                <div className="btn-more text-center btn_ngan">
                                                                    <Link to={``}>
                                                                        <button onClick={addToFavorites} className="ocean-button btn_like_cart" id="oceanButton">Yêu thích <i class="fa-solid fa-heart"></i>
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* danhgia */}
                        <div className="container-danhgia">
                              {/* Reviews Card */}
                              <div className="card-danhgia reviews-danhgia">
                              <DanhGia id_homestay={homestayCT.id_homestay} />
                            </div>
                            <div className="wap_loca-tienich">
                                <div className="col_top_loca_tienich">
                                    {/* Location Card */}
                                    <div className="card-danhgia location-danhgia">
                                    <h3>Trong khu vực</h3>
                                        <p className='location_ic'><i class="fa-sharp fa-solid fa-location-dot"></i> 57-59 Đỗ Bí, Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Việt Nam, 550000</p>
                                        <p><strong>Gần khu vui chơi giải trí</strong></p>
                                        <p><i class="fa-solid fa-location-pin"></i> Biển Mỹ Khê - 868 m</p>
                                        <p><i class="fa-solid fa-location-pin"></i> Four Points by Sheraton Danang - 2.65 km</p>
                                        <p><i class="fa-solid fa-location-pin"></i> Số 294 Trưng Nữ Vương - 2.96 km</p>
                                   
                                    </div>
                                    {/* Amenities Card */}
                                    <div className="card-danhgia amenities-danhgia">
                                    <h3>Tiện ích chính</h3>
                                        <div className="wap_tienich">
                                            <div className="tien_ich1">
                                                    <ul>
                                                        <li>Máy lạnh</li>
                                                        <li>Nhà hàng</li>
                                                        <li>Lễ tân 24h</li>
                                                        <li>Chỗ đậu xe</li>
                                                        <li>Thang máy</li>
                                                        <li>WiFi</li>
                                                    </ul>
                                                </div>
                                                <div className="tien_ich2">
                                                    <ul>
                                                        <li>Máy lạnh</li>
                                                        <li>Nhà hàng</li>
                                                        <li>Lễ tân 24h</li>
                                                        <li>Chỗ đậu xe</li>
                                                        <li>Thang máy</li>
                                                        <li>WiFi</li>
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col_bottom_loca_tienich">
                                    <div class="full-width"> Homestay có không gian thoáng đãng, gần gũi với thiên nhiên, rất thích hợp để thư giãn sau những ngày làm việc căng thẳng."
"Thiết kế homestay đẹp và ấm cúng, cảm giác như đang ở nhà vậy. Mọi góc nhỏ đều được trang trí tinh tế và tỉ mỉ."
"View từ homestay thật tuyệt vời, có thể ngắm nhìn toàn cảnh núi đồi và tận hưởng không khí trong lành.
                                    </div>
                                </div>
                                    
                            </div>
                        </div>
                        {/* danhgia */}
                        <div className="sp_lienquan">
                            <h2 className='text_24px'>Xem thêm phòng khác</h2>
                            <ul class="homestay_list" data-aos="fade-up" data-aos-duration="2000">
                            {Array.isArray(rooms) && rooms.length > 0 ? (
                                rooms.map((room, index) => (
                                    <li key={index}>  
                                        <Link to={"/homestay/" + room.id_homestay}>
                                            <div className="img_homstay">
                                                <div className="pro-price pri_chitiet">
                                                    <span className="price">{room.gia_homestay}₫</span>
                                                    <span>/ Đêm</span>
                                                </div>
                                                <img src={room.url_hinh} alt={room.ten_homestay} />
                                            </div>
                                            <div class="des_hst">
                                                <div class="proloop-detail">
                                                    <h3><Link to={"/homestay/" + room.id_homestay}>{room.ten_homestay} </Link></h3>
                                                    <div class="pro-tag">
                                                        <div class="tag-item tag-area">
                                                            <span>150</span> <span class="tag-unit">m<sup>2</sup></span>
                                                        </div>                                     
                                                        <div class="tag-item tag-guests">
                                                            <span>10</span> <span class="tag-unit">Guests</span>
                                                        </div>
                                                        <div class="tag-item tag-bed">
                                                            <span>5</span> <span class="tag-unit">Beds</span>
                                                        </div>
                                                        <div class="tag-item tag-bathroom">
                                                            <span>4</span> <span class="tag-unit">Bathroom</span>
                                                        </div>
                                                    </div>
                                                <div className="pro-desc">
                                                {room.mota}
                                                </div>
                                                <div className="btn_ev">
                                                <Link to={"/homestay/" + room.id_homestay}>
                                                    <span>Xem chi tiết
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                                                    </svg>
                                                    </span>
                                                </Link>
                                                </div>
                                            </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))
                            ): (
                                <p>Chưa có phòng nào!</p>
                                )}
                            </ul>
                        </div>


                    </div>
                </div>
            </section>
              )
            )}
        </div>
        
    );
};

export default ChiTiet;

