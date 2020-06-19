import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase';
import Axios from 'axios';

const EventManager = () => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [urlList, setUrlList] = useState([]);
  const [showEdit, setShowEdit] = useState(null);

  useEffect(() => {
    Axios
      .get('/admin/api/events')
      .then(response => {

        setUrlList(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => image)
  };

  const getImages = () => {
    Axios
      .get('/admin/api/events')
      .then(response => {

        let array = response.data;

        setUrlList(array);
      })
      .catch(err => console.error(err));
  }

  const handleFireBaseUpload = (e) => {
    e.preventDefault();

    const resource = e.target.description.value;
    const title = e.target.title.value;
    const location = e.target.location.value;
    let startDate = e.target.startDate.value;
    let endDate = e.target.endDate.value;
    const startTime = e.target.startTime.value;
    const endTime = e.target.endTime.value;
    const allDay = false;

    let startYear = parseInt(startDate.substring(0, 4));
    let startMonth = parseInt(startDate.substring(5, 7)) - 1;
    let startDay = parseInt(startDate.substring(8, 10));
    let endYear = parseInt(endDate.substring(0, 4));
    let endMonth = parseInt(endDate.substring(5, 7)) - 1;
    let endDay = parseInt(endDate.substring(8, 10));

    let startHours = parseInt(startTime.substring(0, 2));
    let startMinutes = parseInt(startTime.substring(3, 5));
    let endHours = parseInt(endTime.substring(0, 2));
    let endMinutes = parseInt(endTime.substring(3, 5));

    startDate = new Date(startYear, startMonth, startDay, startHours, startMinutes, 0, 0);

    console.log(startDate.getTimezoneOffset());
    endDate = new Date(endYear, endMonth, endDay, endHours, endMinutes, 0, 0);
    console.log(endDate.getTimezoneOffset());

    console.log('start of upload');

    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    };

    let randomizer = (Math.floor(Math.random() * (1000 - 1)) + 1).toString();
    let split = imageAsFile.name.split('.');
    const filename = split[0] + randomizer + split[1];

    const uploadTask = storage.ref(`/events/${filename}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('events').child(filename).getDownloadURL()
        .then(fireBaseUrl => {

          const request = { fireBaseUrl, resource, title, location, startDate, endDate, startTime, endTime, allDay, filename };

          Axios
            .post('/admin/api/events', request)
            .then(response => {
              getImages();
              console.log(response);
              setImageAsFile('');
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById('form-events').reset();
  };

  const editHandler = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;
    const title = e.target.title.value;
    const resource = e.target.description.value;
    const location = e.target.location.value;
    let startDate = e.target.startDate.value;
    let endDate = e.target.endDate.value;
    const startTime = e.target.startTime.value;
    const endTime = e.target.endTime.value;
    const allDay = false;

    let startYear = parseInt(startDate.substring(0, 4));
    let startMonth = parseInt(startDate.substring(5, 7)) - 1;
    let startDay = parseInt(startDate.substring(8, 10));
    let endYear = parseInt(endDate.substring(0, 4));
    let endMonth = parseInt(endDate.substring(5, 7)) - 1;
    let endDay = parseInt(endDate.substring(8, 10));

    let startHours = parseInt(startTime.substring(0, 2));
    let startMinutes = parseInt(startTime.substring(3, 5));
    let endHours = parseInt(endTime.substring(0, 2));
    let endMinutes = parseInt(endTime.substring(3, 5));

    startDate = new Date(startYear, startMonth, startDay, startHours, startMinutes, 0, 0);
    endDate = new Date(endYear, endMonth, endDay, endHours, endMinutes, 0, 0);

    Axios
      .put(`/admin/api/events/${_id}`, { title, resource, location, startDate, endDate, startTime, endTime, allDay })
      .then(response => {
        getImages();
        console.log(response);
        setShowEdit(null);
      })
      .catch(err => console.error(err));

    document.getElementById(_id).reset();
  }

  const deleteHandler = (e) => {
    const _id = e.target.value;
    const filename = e.target.dataset.filename;

    Axios
      .delete(`/admin/api/events/${_id}`)
      .then(response => {
        console.log(response);
        getImages();

        storage.ref('events').child(filename).delete()
          .then(() => console.log('deleted from firebase'))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  const editToggler = (e) => {
    const _id = e.target.value;
    showEdit === _id ? setShowEdit(null) : setShowEdit(_id);
  }

  return (
    <div className="body-gallery">
      <h3>Events</h3>
      <form id="form-events" className="form-gallery" onSubmit={handleFireBaseUpload}>
        <h4 className="text-gallery-form-header">Post new event</h4>
        <input className="input-landing" type="text" name="title" placeholder="Title" />
        <input className="input-landing" type="text" name="location" placeholder="Location" />
        <textarea className="input-description" name="description" placeholder="Description" />
        <div className="form-events-row">
          <label style={{ "marginBottom": "5px", "color": "rgb(224, 173, 158)", "fontSize": "calc(14px + 0.3vw)" }} >Start Date/Time: </label>
          <div className="container-date-time">
            <input style={{ "marginBottom": "5px" }} type="date" name="startDate" />
            <input type="time" name="startTime" />
          </div>
        </div>
        <div className="form-events-row">
          <label style={{ "marginBottom": "5px", "color": "rgb(224, 173, 158)", "fontSize": "calc(14px + 0.3vw)" }} >End &nbsp;Date/Time:</label>
          <div className="container-date-time">
            <input style={{ "marginBottom": "5px" }} type="date" name="endDate" />
            <input type="time" name="endTime" />
          </div>
        </div>
        <div className="container-gallery-inputs">
          <input
            className="input-gallery-file"
            type="file"
            onChange={handleImageAsFile}
          />
          <button className="button-gallery-post">Upload to Events</button>
        </div>
      </form>
      {
        urlList.map(item => {
          return (
            <div className="container-gallery-row">
              <div className="container-gallery-img">
                <img className="img-gallery" src={item.fireBaseUrl} alt="gallery img" />
              </div>
              <div className="container-gallery-title-description">
                <p>Title: {item.title}</p>
                <p>Location: {item.location}</p>
                <p>Start Date: {item.startDate}</p>
                <p>Start Time: {item.startTime}</p>
                <p>End Date: {item.endDate}</p>
                <p>End Time: {item.endTime}</p>
                <p>Description: {item.resource}</p>
                <div className="container-form-buttons">
                  <button value={item._id} style={{"marginRight":"5px"}} onClick={editToggler}>Edit</button>
                  <button value={item._id} onClick={deleteHandler} data-filename={item.filename}>Delete</button>
                </div>
                { showEdit === item._id ?
                <form id={item._id} className="form-gallery-edit" onSubmit={editHandler} data-id={item._id}>
                  <input style={{"marginBottom":"5px", "marginTop":"5px"}} type="text" name="title" placeholder="Title" />
                  <input style={{"marginBottom":"5px"}} type="text" name="location" placeholder="Location" />
                  <textarea name="description" placeholder="Description" style={{"height":"50px","marginBottom":"5px" }}></textarea>
                  <div style={{"display":"flex","width":"100%","alignContent":"center"}}>
                    <p style={{"width":"210px"}}>Start Date/Time: </p>
                    <div style={{"width":"136px","justifySelf":"flexEnd"}}>
                      <input style={{"marginBottom":"5px"}} type="date" name="startDate" />
                      <input style={{"marginBottom":"5px"}} type="time" name="startTime" />
                    </div>
                  </div>
                  <div style={{"display":"flex","width":"100%"}}>
                    <p style={{"width":"210px"}}>End &nbsp;Date/Time: </p>
                    <div style={{"width":"136px","justifySelf":"flexEnd"}}>
                      <input style={{"marginBottom":"5px"}} type="date" name="endDate" />
                      <input style={{"marginBottom":"5px"}} type="time" name="endTime" />
                    </div>
                  </div>
                  <div className="container-form-buttons">
                    <button style={{"marginRight":"5px"}} type="submit">Submit Changes</button>
                  </div>
                </form> : null
                }
              </div>
            </div>
          )
        })
      }
    </div >
  );
};

export default EventManager;