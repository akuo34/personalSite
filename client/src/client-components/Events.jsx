import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const Events = () => {
  const [images, setImages] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    Axios
      .get('/admin/api/events')
      .then(response => {
        
        response.data.forEach(item => {
          item.end = moment.utc(item.end).toDate();
          item.start = moment.utc(item.start).toDate();
        })
        setImages(response.data);
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

  const selectEventHandler = (e) => {

    setCurrentEvent(e);
  }

  return (
    <div>
      <div className="buffer"></div>
      <div className="container-gallery-page">
        <h2 className="subheader-client">events</h2>
        <div className="container-calendar">
          <Calendar
            onSelectEvent={selectEventHandler}
            localizer={localizer}
            events={images}
            views={['month', 'agenda']}
            startAccessor="startDate"
            endAccessor="endDate"
          />
          {Object.keys(currentEvent).length ?
            <div className="container-image-events">
              <h3 style={{ "marginBottom": "20px" }}>{currentEvent.title}</h3>
              <img className="image-events" src={currentEvent.fireBaseUrl} alt="gallery-image"></img>
              <div className="container-client-events">
                <p style={{ "marginBottom": "20px" }}>{currentEvent.resource}</p>
                <p style={{ "marginBottom": "20px" }}>Where: {currentEvent.location}</p>
                {/* <p>When: {currentEvent.start} to {currentEvent.end} at {currentEvent.time}</p> */}
              </div>
            </div>
            : images.length ?
              <div className="container-image-events">
                <h4>Next Event</h4>
                <h4 style={{ "marginBottom": "20px" }}>{images[0].title}</h4>
                <img className="image-events" src={images[0].fireBaseUrl} alt="gallery-image"></img>
                <div className="container-client-events">
                  <p style={{ "marginBottom": "20px" }}>{images[0].resource}</p>
                  <p style={{ "marginBottom": "20px" }}>Where: {images[0].location}</p>
                  {/* <p>When: {currentEvent.start} to {currentEvent.end} at {currentEvent.time}</p> */}
                </div>
              </div> : null
          }
        </div>
        {/* {images.map((image, index) => {
        return (
          <div className="container-image-events" key={index}>
            <img className="image-events" src={image.fireBaseUrl} alt="gallery-image"></img>
            <div className="container-client-events">
              <h3 style={{ "marginBottom": "20px" }}>{image.title}</h3>
              <p style={{ "marginBottom": "20px" }}>{image.resource}</p>
              <p style={{ "marginBottom": "20px" }}>Where: {image.location}</p>
              <p>When: {convertDate(image.start)} to {convertDate(image.end)} at {convertTime(image.time)}</p>
            </div>
          </div>
        )
      })} */}
      </div>
    </div>
  )
}

export default Events;