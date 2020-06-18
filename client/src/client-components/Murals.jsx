import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Slider from 'react-animated-slider';

const Murals = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, [images]);

  const getImages = () => {
    Axios
      .get('/admin/api/murals')
      .then(response => {
        if (response.data.length !== images.length) {
          setImages(response.data);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div className="buffer"></div>
      <div className="container-gallery-page">
        <h2 className="subheader-client">murals</h2>
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

export default Murals;