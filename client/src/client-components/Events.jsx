import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({});
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    Axios
      .get('/admin/api/events')
      .then(response => {
        let today = new Date();
        let index = 0;

        response.data.forEach(item => {
          let start = new Date(item.startDate);

          if (start < today) {
            index++;
          }
        })

        setUpcomingEvents(response.data.slice(index));
        setPastEvents(response.data.slice(0, index));
      })
      .catch(err => console.error(err));
  }

  const convertDate = (ISOdate) => {
    let date = new Date(ISOdate);
    let result = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
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
            events={upcomingEvents}
            views={['month', 'agenda']}
            startAccessor="startDate"
            endAccessor="endDate"
          />
          {Object.keys(currentEvent).length ?
            <div className="container-image-events">
              <h4 style={{ "margin": "0 auto 20px auto", "maxWidth": "60vw", "textAlign": "center" }}>Selected Event: {currentEvent.title}</h4>
              <img className="image-events" src={currentEvent.fireBaseUrl} alt="gallery-image"></img>
              <div className="container-client-events" style={{"marginTop":"20px"}}>
                <p style={{ "marginBottom": "20px" }}>{currentEvent.resource}</p>
                <p style={{ "marginBottom": "20px" }}>Where: {currentEvent.location}</p>
                <p>When: {convertDate(currentEvent.startDate)} from {convertTime(currentEvent.startTime)} to {convertTime(currentEvent.endTime)}</p>
              </div>
            </div>
            : upcomingEvents.length ?
              <div className="container-image-events">
                <h4 style={{ "margin": "0 auto 20px auto", "maxWidth": "60vw", "textAlign": "center" }}>Next Event: {upcomingEvents[0].title}</h4>
                <img className="image-events" src={upcomingEvents[0].fireBaseUrl} alt="gallery-image"></img>
                <div className="container-client-events" style={{"marginTop":"20px"}}>
                  <p style={{ "marginBottom": "20px" }}>{upcomingEvents[0].resource}</p>
                  <p style={{ "marginBottom": "20px" }}>Where: {upcomingEvents[0].location}</p>
                  <p>When: {convertDate(upcomingEvents[0].startDate)} from {convertTime(upcomingEvents[0].startTime)} to {convertTime(upcomingEvents[0].endTime)}</p>
                </div>
              </div> : null
          }
        </div>
        <h4 style={{ "marginBottom": "40px" }}>Upcoming Events</h4>
        {upcomingEvents.map((image, index) => {
          return (
            <div className="container-client-upcoming-events" key={index}>
              <div className="container-image-upcoming-events">
                <img className="image-events" src={image.fireBaseUrl} alt="gallery-image"></img>
              </div>
              <div className="container-client-events">
                <h4 style={{ "marginBottom": "20px" }}>{image.title}</h4>
                <p style={{ "marginBottom": "20px" }}>{image.resource}</p>
                <p style={{ "marginBottom": "20px" }}>Where: {image.location}</p>
                <p>When: {convertDate(image.startDate)} from {convertTime(image.startTime)} to {convertTime(image.endTime)}</p>
              </div>
            </div>
          )
        })}
        <h4 style={{ "marginBottom": "40px" }}>Past Events</h4>
        {pastEvents.map((image, index) => {
          return (
            <div className="container-client-upcoming-events" key={index}>
              <div className="container-image-upcoming-events">
                <img className="image-events" src={image.fireBaseUrl} alt="gallery-image"></img>
              </div>
              <div className="container-client-events">
                <h4 style={{ "marginBottom": "20px" }}>{image.title}</h4>
                <p style={{ "marginBottom": "20px" }}>{image.resource}</p>
                <p style={{ "marginBottom": "20px" }}>Where: {image.location}</p>
                <p>When: {convertDate(image.startDate)} from {convertTime(image.startTime)} to {convertTime(image.endTime)}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Events;