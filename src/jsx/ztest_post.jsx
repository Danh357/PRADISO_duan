import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("");
  const [homestayData, setHomestayData] = useState([]);
  const [datHomestay, setDatHomestay] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    // Fetch data from APIs
    const fetchData = async () => {
      try {
        const homestayResponse = await axios.get("http://localhost:3000/homestay");
        const datHomestayResponse = await axios.get("http://localhost:3000/dat_homestay");
        const loaiHomestayResponse = await axios.get("http://localhost:3000/loaihomestay");
  
        // Create a mapping of id_Loai to ten_Loai
        const loaiHomestayMap = loaiHomestayResponse.data.reduce((map, loai) => {
          map[loai.id_Loai] = loai.Ten_Loai;
          return map;
        }, {});
  
        // Attach ten_Loai and bookings to homestayData
        const updatedHomestayData = homestayResponse.data.map((room) => ({
          ...room,
          Ten_Loai: loaiHomestayMap[room.id_Loai] || `Loại ${room.id_Loai}`,
          bookings: datHomestayResponse.data.filter(
            (booking) => booking.id_homestay === room.id_homestay
          ),
        }));
  
        // Extract unique room types from loaiHomestayResponse
        const uniqueRoomTypes = loaiHomestayResponse.data.map((loai) => ({
          id_Loai: loai.id_Loai,
          Ten_Loai: loai.Ten_Loai,
        }));
  
        setHomestayData(updatedHomestayData);
        setDatHomestay(datHomestayResponse.data);
        setFilteredRooms(updatedHomestayData); // Default to show all rooms
        setRoomTypes(uniqueRoomTypes); // Set room types
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, []);

const isOverlap = (start1, end1, start2, end2) => {
  return !(end1 < start2 || end2 < start1);
};

const filterRooms = () => {
  const checkInDate = checkIn ? new Date(checkIn) : null;
  const checkOutDate = checkOut ? new Date(checkOut) : null;

  if (!checkIn || !checkOut) {
    setFilteredRooms(
      homestayData.filter(
        (room) => !roomType || room.id_Loai === parseInt(roomType)
      )
    );
    return;
  }

  if (checkInDate >= checkOutDate) {
    alert("Ngày nhận phòng phải trước ngày trả phòng.");
    return;
  }

  const availableRooms = homestayData.filter((room) => {
    if (roomType && room.id_Loai !== parseInt(roomType)) {
      return false;
    }

    return !datHomestay.some((booking) => {
      if (booking.id_homestay === room.id_homestay) {
        const bookingCheckIn = new Date(booking.ngay_dat);
        const bookingCheckOut = new Date(booking.ngay_tra);
        return isOverlap(checkInDate, checkOutDate, bookingCheckIn, bookingCheckOut);
      }
      return false;
    });
  });

  setFilteredRooms(availableRooms);
};

return (
  <div className="wap">
    <div className="danh">123123</div>
    <div className="danh2">
      <div className="form_booking">
        <div className="checkin_homstay">
          <div className="date_check_in search_item">
            <label>Ngày nhận phòng</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="date_check_out search_item">
            <label>Ngày trả phòng</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="number_people search_item">
          <label htmlFor="homestay-type">Loại homestay</label>
          <select
            id="homestay-type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">Tất cả các loại</option>
            {roomTypes.map((type) => (
              <option key={type.id_Loai} value={type.id_Loai}>
                {type.Ten_Loai}
              </option>
            ))}
          </select>
        </div>

        <div className="btn-more text-center search_btn">
          <button type="button" className="ocean-button book_room" onClick={filterRooms}>
            Lọc
          </button>
        </div>

       
      </div>
     <div className="wapp">
     <h2>Kết quả tìm kiếm:</h2>
     <div id="result">
  {filteredRooms.length > 0 ? (
    filteredRooms.map((room) => (
      <div key={room.id_homestay} className="room">
        <h3>{room.ten_homestay}</h3>
        <p>Loại phòng: {room.Ten_Loai}</p>
        <div>
          {room.bookings.length > 0 ? (
            room.bookings.map((booking, index) => (
              <p key={index}>
                Ngày:{" "}
                {new Date(booking.ngay_dat).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                <strong>Đến</strong>{" "}
                {new Date(booking.ngay_tra).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            ))
          ) : (
            <p>Chưa có thông tin đặt phòng</p>
          )}
        </div>
      </div>
    ))
  ) : (
    <p>Không có phòng nào trống.</p>
  )}
</div>
     </div>
    </div>
  </div>
);
};

export default ImageGallery;