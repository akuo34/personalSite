import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Slider from 'react-animated-slider';
// import Slider from 'react-slick';

const Gallery = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, [images]);

  const getImages = () => {
    Axios
      .get('/admin/api/gallery')
      .then(response => {
        if (response.data.length !== images.length) {
          setImages(response.data);
        }
      })
      .catch(err => console.error(err));
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <div className="buffer"></div>
      <div className="container-gallery-page">
        <h2 className="subheader-client">art by candy kuo</h2>
        {/* <Slider {...settings}> */}
        <Slider duration="800">
          {images.map((image, index) => {
            return (
              <div className="container-image-gallery" key={index}>
                <img className="image-gallery" src={image.fireBaseUrl} alt="gallery-image"></img>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default Gallery;