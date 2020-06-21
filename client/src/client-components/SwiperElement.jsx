import React from 'react';

const SwiperElement = (props) => {
  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {props.images.map(image => {
          return (
            <div className="swiper-slide">
              <img className="image-gallery" src={image.fireBaseUrl} alt="gallery-img"></img>
            </div>
          )
        })}
      </div>
      <div onClick={props.prevImage} className="swiper-button-prev"></div>
      <div onClick={props.nextImage} className="swiper-button-next"></div>
    </div>
  )
}

export default SwiperElement;