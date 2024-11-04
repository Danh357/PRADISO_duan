{/* <div className="sp_lienquan">
<h2 className='text_24px'>Xem thêm phòng khác</h2>
<ul class="homestay_list" data-aos="fade-up" data-aos-duration="2000">
{Array.isArray(rooms) && rooms.length > 0 ? (
    rooms.map((room, index) => (
        <li key={index}>  
            <Link href="#">
                <div className="img_homstay">
                    <div className="pro-price pri_chitiet">
                        <span className="price">{room.gia_homestay}₫</span>
                        <span>/ Đêm</span>
                    </div>
                    <img src={room.url_hinh} alt={room.ten_homestay} />
                </div>
                <div class="des_hst">
                    <div class="proloop-detail">
                        <h3><a href="/products/double-suite">{room.ten_homestay} </a></h3>
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
                    <Link to={``}>
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
    <p>No rooms available</p>
  )}
</ul>
          </div> */}