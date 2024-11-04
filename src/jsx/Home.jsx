import axios from 'axios';
import React, { useState,useEffect, useRef } from 'react';
import { useParams } from "react-router-dom"
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
function Home() {
    const { id } = useParams();
    const [showhomestay, setHomestay] = useState(null); // Lưu thông tin homestay
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    const [homestays, setHomestays] = useState([]); // Lưu danh sách homestay
    const [danhSachPhong, setDanhSachPhong] = useState([]); // Lưu danh sách phòng
    const [checkInDate, setCheckInDate] = useState(new Date()); // Ngày nhận phòng mặc định là hôm nay
    const [checkOutDate, setCheckOutDate] = useState(new Date()); // Ngày trả phòng
    const [isCheckInOpen, setIsCheckInOpen] = useState(false); // Trạng thái mở cho ngày nhận phòng
    const [isCheckOutOpen, setIsCheckOutOpen] = useState(false); // Trạng thái mở cho ngày trả phòng
    const [roomsAvailable, setRoomsAvailable] = useState([]); // Danh sách phòng trống
    const [showRooms, setShowRooms] = useState(false); // Trạng thái hiển thị danh sách phòng
    const listRef = useRef(null); // Ref cho danh sách phòng
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [homestaysPerPage] = useState(6); // Số lượng homestay hiển thị trên mỗi trang
    const [danhSachLoaiPhong, setDanhSachLoaiPhong] = useState([]); // Lưu danh sách loại phòng
    const [loaiPhongHienThi, setLoaiPhongHienThi] = useState(''); // Loại phòng hiện tại
    const [selectedLoaiId, setSelectedLoaiId] = useState(null); // ID loại phòng đã chọn
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
  
    // Fetch thông tin homestay theo ID
    useEffect(() => {
      axios.get(`http://localhost:3000/homestay/${id}`)
        .then(response => {
          setHomestay(response.data); // Lưu thông tin homestay vào state
        })
        .catch(err => {
          setError("Lỗi khi tải dữ liệu homestay");
        });
    }, [id]);
    useEffect(() => {
        axios.get(`http://localhost:3000/homestay`)
          .then(response => {
            setHomestay(response.data); // Lưu thông tin homestay vào state
          })
          .catch(err => {
            setError("Lỗi khi tải dữ liệu homestay");
          });
      }, [id]);
  
    // Fetch danh sách phòng
    useEffect(() => {
      fetch('http://localhost:3000/homestay') // API lấy danh sách phòng
        .then(response => response.json())
        .then(data => setDanhSachPhong(data))
        .catch(error => console.error('Error fetching rooms:', error));
    }, []);
  
    // Fetch danh sách loại phòng
    useEffect(() => {
      fetch('http://localhost:3000/loaihomestay') // API lấy danh sách loại homestay
        .then(response => response.json())
        .then(data => setDanhSachLoaiPhong(data))
        .catch(error => console.error('Error fetching room types:', error));
    }, []);
  
    // Hàm thay đổi loại phòng khi người dùng chọn từ dropdown
    const handleChangeLoaiPhong = (event) => {
      const value = event.target.value;
      setSelectedLoaiId(value === 'all' ? null : value); // Nếu chọn 'all', gán selectedLoaiId là null
      setLoaiPhongHienThi(value); // Cập nhật loại phòng hiện thi
    };
  
    // // Fetch dữ liệu homestays
    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:3000/homestay'); // API lấy homestay
    //       setHomestays(response.data); // Lưu sản phẩm vào state
    //     } catch (error) {
    //       console.error('Lỗi khi fetch sản phẩm:', error);
    //     }
    //   };
    //   fetchProducts();
    // }, []);
  
    // Tính toán chỉ số của homestay bắt đầu và kết thúc trên trang hiện tại
    const indexOfLastHomestay = currentPage * homestaysPerPage;
    const indexOfFirstHomestay = indexOfLastHomestay - homestaysPerPage;
    const currentHomestays = homestays.slice(indexOfFirstHomestay, indexOfLastHomestay); // Homestays hiện tại
  
    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Hàm lấy phòng còn trống
    const handleCheckAvailableRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dshinhanh');
        const availableRooms = response.data.filter((room) => {
          const isAvailable = room.TrangThai === 'Còn phòng';
          const isMatchingLoai = selectedLoaiId ? room.id_Loai === Number(selectedLoaiId) : true; // Nếu selectedLoaiId không có, cho phép tất cả loại
          return isAvailable && isMatchingLoai;
        });
  
        // Lưu trữ các id_homestay đã hiển thị
        const displayedIds = new Set();
        const uniqueAvailableRooms = availableRooms.filter((room) => {
          if (!displayedIds.has(room.id_homestay)) {
            displayedIds.add(room.id_homestay);
            return true; // Giữ lại phòng này
          }
          return false; // Bỏ qua phòng đã hiển thị
        });
  
        console.log('Unique Available Rooms:', uniqueAvailableRooms); // Kiểm tra danh sách phòng có còn trống không 
        setRoomsAvailable(uniqueAvailableRooms); // Lưu lại các phòng còn trống vào state
        setShowRooms(true); // Hiển thị danh sách phòng
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng:', error);
      }
    };
  
    // Hàm để ẩn danh sách phòng khi click ra ngoài
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setShowRooms(false); // Ẩn danh sách phòng
      }
    };
  
    // Lắng nghe sự kiện click trên toàn bộ tài liệu
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      
      // Cleanup để gỡ bỏ sự kiện khi component bị unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    // Fetch homestays khi component được render
  
    if (error) return <p>{error}</p>;
    if (!showhomestay) return <p>Loading...</p>;

return(
    <div className="section_menu">
            <div className="banner index">
            <div className="wap_name_dt_rr index">
                    <div className="min_warp2">
                    <div className="name_menu_date_restaurant"  data-aos="fade-up" data-aos-duration="3000">
                        <h1 className="restaurant index">Paradiso</h1>
                        <p className="date index">Đồng hành cùng chuyến đi của bạn</p>

                    </div>
                </div>
            </div>
        </div>
        <div className="form_calendar_booking">
            <div className="min_warp3">
                <div className="form_booking">
                    <div className="checkin_homstay t-datepicker" >
                        <div className="date_check_in search_item"  onClick={() => setIsCheckInOpen(!isCheckInOpen)}>
                            <div className="seach_icons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path>
                                    <path d="M16.5 2.25V5.25" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path>
                                    <path d="M7.5 2.25V5.25" stroke="#AAAFB6" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"></path>
                                    <path d="M3.75 8.25H20.25" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path>
                                </svg>
                            </div>
                            <div className="search-form">
                                <label>Ngày nhận phòng</label>
                                <div className="t-check-in">
                                    <div className="t-dates t-date-check-in">
                                        <label className="t-date-info-title"></label>
                                        <span className="t-day-check-in">{checkInDate.getDate().toString().padStart(2, '0')}//</span>
                                        <span className="t-month-check-in">{(checkInDate.getMonth() + 1).toString().padStart(2, '0')}/</span>
                                        <span className="t-year-check-in">{checkInDate.getFullYear()}</span>
                                    </div>
                                    {isCheckInOpen && (
                                    <div className="date-picker-container">
                                    <DatePicker
                                    selected={checkInDate} // Ngày hiện tại
                                    onChange={(date) => {
                                        console.log('Ngày đã chọn:', date); // Thêm dòng này để debug
                                        setCheckInDate(date);
                                        setIsCheckInOpen(false);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="t-input-check-in"
                                    todayButton="Hôm nay"
                                    onClickOutside={() => setIsCheckInOpen(false)} // Đóng khi click ra ngoài
                                    inline // Hiển thị lịch luôn
                                    minDate={new Date()} // Vô hiệu hóa các ngày đã qua
                                    />
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="date_check_out search_item"  onClick={() => setIsCheckOutOpen(!isCheckOutOpen)}>
                            <div className="seach_icons">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M19.5 3.75H4.5C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75Z" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path>
                                    <path d="M16.5 2.25V5.25" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path>
                                    <path d="M7.5 2.25V5.25" stroke="#AAAFB6" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round"></path>
                                    <path d="M3.75 8.25H20.25" stroke="#AAAFB6" strokeWidth="1.5" strokeLinecap="round"strokeLinejoin="round"></path>
                                </svg>
                            </div>
                            <div className="search-form">
                                <label>Ngày trả phòng</label>
                                <div className="t-check-in">
                                    <div className="t-dates t-date-check-out">
                                        <span className="t-day-check-out">
                                        {checkOutDate.getDate().toString().padStart(2, '0')}/
                                        </span>
                                        <span className="t-month-check-out">
                                        {(checkOutDate.getMonth() + 1).toString().padStart(2, '0')}/
                                        </span>
                                        <span className="t-year-check-out">{checkOutDate.getFullYear()}</span>
                                    </div>
                                    {isCheckOutOpen && (
                                    <div className="date-picker-container">
                                        <DatePicker
                                    selected={checkOutDate}
                                    onChange={(date) => {
                                    console.log('Ngày trả phòng đã chọn:', date);
                                    setCheckOutDate(date);
                                    setIsCheckOutOpen(false);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="t-input-check-out"
                                    todayButton="Hôm nay"
                                    onClickOutside={() => setIsCheckOutOpen(false)}
                                    inline
                                    minDate={checkInDate} // Vô hiệu hóa các ngày trước ngày nhận phòng
                                />
                                </div>
                                )}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="number_people search_item">
                        <div className="seach_icons">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M288 350.1l0 1.9-32 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L447.3 128.1c-12.3-1-25 3-34.8 11.7c-35.4 31.6-65.6 67.7-87.3 102.8C304.3 276.5 288 314.9 288 350.1zM480 512c-88.4 0-160-71.6-160-160c0-76.7 62.5-144.7 107.2-179.4c5-3.9 10.9-5.8 16.8-5.8c7.9-.1 16 3.1 22 9.2l46 46 11.3-11.3c11.7-11.7 30.6-12.7 42.3-1C624.5 268 640 320.2 640 352c0 88.4-71.6 160-160 160zm64-111.8c0-36.5-37-73-54.8-88.4c-5.4-4.7-13.1-4.7-18.5 0C453 327.1 416 363.6 416 400.2c0 35.3 28.7 64 64 64s64-28.7 64-64z"/></svg>
                        </div>
                            <div className="search-form">
                                <div className="group-dropdown-qty">
                                    <label className="homestay_type" htmlFor="homestay-type">Loại homestay</label>
                                    <select id="homestay-type" value={loaiPhongHienThi} onChange={handleChangeLoaiPhong}>
                                        <option value="all">Tất cả các loại phòng</option>
                                        {Array.isArray(danhSachLoaiPhong) && danhSachLoaiPhong.map(loai => {
                                            // console.log(loai.id_Loai);
                                            return (
                                            <option key={loai.id_Loai} value={loai.id_Loai}>
                                                {loai.Ten_Loai}
                                            </option>
                                        )})}
                                    </select>
                                    </div>
                            </div>
                    </div>
                    <div className="btn-more text-center search_btn">
                        <button type="button" className="ocean-button book_room" onClick={handleCheckAvailableRooms}>
                            Đặt phòng
                        </button>
                        {showRooms && (
                        <div ref={listRef} className="available-rooms">
                        <h3>Các phòng còn trống tại <strong>PARADISO</strong></h3>
                        {roomsAvailable.length === 0 ? (
                            <p>Không có phòng còn trống.</p>
                        ) : (
                            <ul className="show_sp">
                            {roomsAvailable.map((room) => {
                                // console.log(room.id_homestay)
                                return(
                                <li key={room.id_homestay}>
                                <Link to={"/homestay/" + room.id_homestay}>
                                    <div className="show_img">
                                    {images.length > 0 ? (
                                        images.map((image, index) => {
                                        if (room.id_homestay === image.id_hinh) {
                                            return (
                                            <div key={image.id_homestay || index} className="add_img"> {/* Sử dụng image.id hoặc index */}
                                                <div className="homestay-sale">Giảm giá 20%</div>
                                                <img
                                                className="img-loop"
                                                src={image.url_hinh}
                                                alt={room.ten_homestay || 'Hình ảnh homestay'}
                                                />
                                            </div>
                                            );
                                        }
                                        return null; // Đảm bảo có return nếu không thỏa mãn điều kiện
                                        })
                                    ) : (
                                        <p>Không có hình để hiển thị</p>
                                    )}
                                    </div>
                                    <div className="homestay-info">
                                    <h3 className="homestay-name">{room.ten_homestay}</h3>
                                    <p className="homestay-price">Giá: {room.gia_homestay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} /đêm</p>
                                    <p className="homestay-rating">{'⭐'.repeat(Math.floor(room.danh_gia))} (4.5/5)</p>
                                    <div className="room-status">
                                        {room.TrangThai === 'Còn phòng' ? (
                                        <span style={{ color: 'green' }}>Còn phòng</span>
                                        ) : (
                                        <span style={{ color: 'red' }}>Đã đặt</span>
                                        )}
                                    </div>
                                    </div>
                                </Link>
                                </li>
                            )})}
                            </ul>
                        )}
                        </div>
                    )}
                    </div>
                </div>
            </div>
                <div className="min_warp2">
                    <div className="row140">
                            <div className="row2" >
                                <div className="col-lg-4 col-md-6 col-12 banner--1" data-aos="fade-up" data-aos-duration="1400">
                                    <div className="about-banner">
                                        <picture>
                                            <source media="(max-width: 991px)" srcSet ="//theme.hstatic.net/200000909393/1001269498/14/home_about_banner_mb_1_1024x1024.jpg?v=2537"/>
                                            <source media="(min-width: 992px)" srcSet ="//theme.hstatic.net/200000909393/1001269498/14/home_about_banner_1.jpg?v=2537"/>
                                            <img src="//theme.hstatic.net/200000909393/1001269498/14/home_about_banner_1.jpg?v=2537" alt="banner 1"/>
                                        </picture>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12 banner--2" data-aos="fade-up" data-aos-duration="2000">
                                    <div className="about-banner banner-content">
                                        <picture>
                                            <source media="(max-width: 991px)" srcSet ="//theme.hstatic.net/200000909393/1001269498/14/home_about_banner_mb_2_1024x1024.jpg?v=2537"/>
                                            <source media="(min-width: 992px)" srcSet ="//theme.hstatic.net/200000909393/1001269498/14/home_about_banner_2.jpg?v=2537"/>
                                            <img src="//theme.hstatic.net/200000909393/1001269498/14/home_about_banner_2.jpg?v=2537" alt="banner 2"/>
                                        </picture>
                                        <div className="about-content text-center">
                                            <div className="heading-title">
                                                <p className="title1">Chào mừng bạn đến với Maple Inn</p>
                                                <h2 className="title2">Ngay trung tâm thành phố, cảnh quan tuyệt đẹp</h2>
                                            </div>
                                            <div className="btn_map col4">
                                                <Link to="#"><span>Xem thêm</span></Link>
                                            </div>    
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12 banner--3" data-aos="fade-up" data-aos-duration="3000">
                                    <div className="about-banner">
                                        <picture>
                                            <source media="(max-width: 991px)" srcSet ="//theme.hstatic.net/200000909393/1001269498/14/home_about_banner_mb_3_1024x1024.jpg?v=2537"/>
                                            <source media="(min-width: 992px)" srcSet ="//theme.hstatic.net/200000909393/1001269498/14/home_about_banner_3.jpg?v=2537"/>
                                            <img src="//theme.hstatic.net/200000909393/1001269498/14/home_about_banner_3.jpg?v=2537" alt="banner 3"/>
                                        </picture>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
              
        </div> 
{/* <!-- show homstay  --> */}
            <div className="min_warp2">
                <div className="row8">
                    <div className="heading_title row_left" data-aos="fade-up" data-aos-duration="1500">
                        <p className="title1">Tận hưởng trải nghiệm lưu trú đẳng cấp</p>
                        <h2 className="title2 show_room">Nơi nghỉ dưỡng của bạn</h2>
                        <p className="des_pro show_room">Trốn đến những ngọn núi và thung lũng xinh đẹp nơi giấc mơ thành hiện thực. Văn hóa, thiên nhiên, suối và ẩm thực. Đắm mình trong những phẩm chất phục hồi của thiên nhiên, tránh xa những xáo trộn của cuộc sống thường ngày.</p> 
                    </div>
                    <div className="btn_slide">
                        {/* <div className="owl-nav">
                            <button type="button" role="presentation" className="owl-prev" aria-label="prev slide">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" className=""><g transform="matrix(-1,-1.2246467991473532e-16,1.2246467991473532e-16,-1,511.9994964599609,511.99959468841564)"><g><g><path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701C391.333,275.032,391.333,236.967,367.954,213.588z"></path></g></g></g></svg>
                            </button>
                            <button type="button" role="presentation" className="owl-next" aria-label="next slide">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" className=""><g><g><g><path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701C391.333,275.032,391.333,236.967,367.954,213.588z"></path></g></g></g></svg>
                            </button>
                        </div> */}
                    </div>
                    <ul className="homestay_list" data-aos="fade-up" data-aos-duration="2000" >
                    {Array.isArray(showhomestay) && showhomestay.slice(0,4).map((homestay) =>  (
                        <li key={homestay.id_homestay}>
                            <Link to={"/homestay/" + homestay.id_homestay}>
                                <div className="img_homstay">
                                    <div className="pro-price">
                                        <span className="price">{homestay.gia_homestay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                        <span>/ Đêm</span>
                                    </div>
                                    <img src="/image/HST2.png" alt=""/>
                                </div>
                                <div className="des_hst">
                                    <div className="proloop-detail">
                                        <h3><Link to="#">{homestay.ten_homestay}</Link></h3>
                                        <div className="pro-tag">
                                            <div className="tag-item tag-area">
                                                <span>150</span> <span className="tag-unit">m<sup>2</sup></span>
                                            </div>                                     
                                            <div className="tag-item tag-guests">
                                                <span>10</span> <span className="tag-unit">Guests</span>
                                            </div>
                                            <div className="tag-item tag-bed">
                                                <span>5</span> <span className="tag-unit">Beds</span>
                                            </div>
                                            <div className="tag-item tag-bathroom">
                                                <span>4</span> <span className="tag-unit">Bathroom</span>
                                            </div>
                                        </div>
                                        <div className="pro-desc">
                                            Double Suite rộng 150m² với thiết kế trong suốt, nằm ở tầng cao nhất của khách sạn, mang đến tầm nhìn toàn cảnh tuyệt đẹp...
                                        </div>
                                        <div className="btn_ev">
                                            <Link to={"/homestay/" + homestay.id_homestay}>
                                                <span>Xem chi tiết
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                                                </span>
                                            </Link>
                                        </div>   
                                        
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
{/* <!-- show homstay  --> */}
{/* <!-- service --> */}
            <div className="bg_service" data-aos="fade-up" data-aos-duration="1500">
                <div className="min_warp2">
                    <div className="row_warp">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_1.jpg?v=2537" alt="Dịch vụ đưa đón tại sân bay"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Dịch vụ đưa đón tại sân bay</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>                
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_2.jpg?v=2537" alt="Dịch vụ quản gia"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Dịch vụ quản gia</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>      
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_3.jpg?v=2537" alt="Wifi &amp; Internet"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Wifi &amp; Internet</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>       
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_4.jpg?v=2537" alt="Dịch vụ giặt ủi"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Dịch vụ giặt ủi</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>           
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_5.jpg?v=2537" alt="Bữa sáng tại phòng"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Bữa sáng tại phòng</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>              
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_6.jpg?v=2537" alt="Chỗ đậu xe riêng"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Chỗ đậu xe riêng</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{/* <!-- service --> */}
{/* <!-- CNdu-lich --> */}
            <div className="bg_blog row8">
                <div className="min_warp2 ">
                    <div className="heading_title" data-aos="fade-up" data-aos-duration="1500">
                        <p className="title1">Hơn cả cảnh núi non</p>
                        <h2 className="title2 show_room">Trải nghiệm không thể quên</h2>
                    </div>
                    <div className="row2 list-blog justify-content-between align-items-center wow fadeInUp animated">
                        {/* Blog 1 */}
                        <div className="item-blog blog--1" data-aos="fade-up" data-aos-duration="1500">
                            <Link to="XXXX" title="Paddling Tour" aria-label="Paddling Tour">
                                <div 
                                    className="article-loop item-article" 
                                    style={{ backgroundImage: `url(https://file.hstatic.net/200000909393/article/img-69-800x600-1_3f16d7045e9a4dd49d5acc42384a3d5f.jpg)` }} // Sử dụng cú pháp JSX
                                >
                                    <div className="item-pd">
                                        <div className="media-article">
                                            <img 
                                                className="opcti0 ls-is-cached lazyloaded" 
                                                data-src="//file.hstatic.net/200000909393/article/img-69-800x600-1_3f16d7045e9a4dd49d5acc42384a3d5f_grande.jpg" 
                                                alt="Paddling Tour" 
                                                src="/image/index1.png" 
                                            />
                                            <time dateTime="2024-08-22">22 Tháng 08, 2024</time>
                                        </div>
                                        <div className="info-article">
                                            <div className="title-article">
                                                <h4 className="tittle_camnang">
                                                    Paddling Tour
                                                </h4>
                                            </div>
                                            <div className="short-article">
                                                Banff National Park’s biggest lake allows you to paddle for miles and enjoy breathtaking views. Lorem ipsum dolor...
                                            </div>
                                            <div className="btn_ev camnang">
                                                <Link to="#">
                                                    <span className="clo_white">Xem thêm
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Blog 2 */}
                        <div className="item-blog blog--2" data-aos="fade-up" data-aos-duration="2500">
                            <div 
                                className="article-loop item-article" >
                                <div className="media-article">
                                    <Link to="" title="Mountain Hiking" aria-label="Mountain Hiking">
                                        <img 
                                            className="ls-is-cached lazyloaded" 
                                            data-src="https://file.hstatic.net/200000909393/article/img-68_93702bac2c97447b9475c6bb07a485d8.jpg" 
                                            alt="Mountain Hiking" 
                                            src="https://file.hstatic.net/200000909393/article/img-68_93702bac2c97447b9475c6bb07a485d8.jpg" 
                                        />
                                        <time dateTime="2024-08-22">22 Tháng 08, 2024</time>
                                    </Link>
                                </div>
                                <div className="info-article">
                                    <div className="title-article">
                                        <h4 className="tittle_camnang">
                                            <Link to="XXXX">Mountain Hiking</Link>
                                        </h4>
                                    </div>
                                    <div className="short-article">
                                        With over 1,600 kilometres (994 miles) of trails, Banff National Park offers adventurers some of the best hiking...
                                    </div>
                                    <div className="btn_ev camnang">
                                        <Link to="#">
                                            <span>Xem chi tiết
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Blog 3 */}
                        <div className="item-blog blog--3" data-aos="fade-up" data-aos-duration="3000">
                            <div 
                                className="article-loop item-article" >
                                <div className="media-article">
                                    <Link to="/" title="Camping Tour" aria-label="Camping Tour">
                                        <img 
                                            className="ls-is-cached lazyloaded" 
                                            data-src="https://file.hstatic.net/200000909393/article/img-70_23537e350baa48c5b65a977c872d0b09.jpg" 
                                            alt="Camping Tour" 
                                            src="https://file.hstatic.net/200000909393/article/img-70_23537e350baa48c5b65a977c872d0b09.jpg" 
                                        />
                                        <time dateTime="2024-08-22">22 Tháng 08, 2024</time>
                                    </Link>
                                </div>
                                <div className="info-article">
                                    <div className="title-article">
                                        <h4 className="tittle_camnang">
                                            <Link to="XXXX">Camping Tour</Link>
                                        </h4>
                                    </div>
                                    <div className="short-article">
                                        Banff offers a range of camping spots allowing you to experience all of this most gorgeous park’s outdoor...
                                    </div>
                                    <div className="btn_ev camnang">
                                        <Link to="XXXX">
                                            <span>Xem chi tiết
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                            </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>           
                        </div>
                    </div>
                    <div className="blog-content text-center" data-aos="fade-up" data-aos-duration="1500">
                        <p className="content-desc">
                            Bên trong nơi nghỉ dưỡng, mọi chi tiết đều được lên kế hoạch và sắp xếp trước để đảm bảo du khách có được trải nghiệm tốt nhất về cuộc sống trên núi.
                        </p>
                        <div className="btn-more text-center">
                            <Link to="#"><button className="ocean-button index" id="oceanButton">Liên Hệ Ngay</button></Link>
                        </div>
                    </div>
                </div>
            </div>
{/* <!-- CNdu-lich --> */}
        </div> 

)

};
export default Home;
