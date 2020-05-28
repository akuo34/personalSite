import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Events = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, [images]);

  const getImages = () => {
    Axios
      .get('/admin/api/events')
      .then(response => {
        if (response.data.length !== images.length) {
          setImages(response.data);
        }
      })
      .catch(err => console.error(err));
  }

  const convertDate = (date) => {
    let result = '';
    result += date.substring(5) + '-' + date.substring(0, 4);
    if (result[0] === '0') {
      result = result.substring(1);
    }
    return result;
  }

  const convertTime = (time) => {
    let hours = parseInt(time.substring(0, 2));
    let minutes = time.substring(3, 5);

    return hours > 12 ? (hours - 12).toString() + ':' + minutes + ' PM' : hours.toString() + ':' + minutes + ' AM';
  }

  return (
    <div>
      <div className="container-main-header">
        <h1 className="header-main">the wild ones</h1>
        <h2 className="subheader-main">events</h2>
      </div>
      {images.map((image, index) => {
        return (
          <div className="container-image-events" key={index}>
            <img className="image-events" src={image.fireBaseUrl} alt="gallery-image"></img>
            <div className="container-client-events">
              <h3 style={{ "margin-bottom": "20px" }}>{image.title}</h3>
              <p style={{ "margin-bottom": "20px" }}>{image.description}</p>
              <p style={{ "margin-bottom": "20px" }}>Where: {image.location}</p>
              <p>When: {convertDate(image.date)} at {convertTime(image.time)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Events;