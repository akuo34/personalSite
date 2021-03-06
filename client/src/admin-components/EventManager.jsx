import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase';
import Axios from 'axios';

const EventManager = (props) => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [urlList, setUrlList] = useState([]);
  const [showEdit, setShowEdit] = useState(null);
  const [indexes, setIndexes] = useState({});

  useEffect(() => {
    Axios
      .get('/admin/api/events')
      .then(response => {

        let copy = { ...indexes };
        response.data.forEach(item => {
          copy[item._id] = 0;
        })

        setIndexes(copy);
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
        props.setLoading(false);
      })
      .catch(err => console.error(err));
  }

  const handleFireBaseUpload = (e) => {
    e.preventDefault();

    props.setLoading(true);

    const resource = e.target.description.value;
    const title = e.target.title.value;
    const location = e.target.location.value;
    let startDate = e.target.startDate.value;
    const startTime = e.target.startTime.value;
    const endTime = e.target.endTime.value;
    const allDay = false;

    let startYear = parseInt(startDate.substring(0, 4));
    let startMonth = parseInt(startDate.substring(5, 7)) - 1;
    let startDay = parseInt(startDate.substring(8, 10));
    let endYear = startYear;
    let endMonth = startMonth;
    let endDay = startDay;

    let startHours = parseInt(startTime.substring(0, 2));
    let startMinutes = parseInt(startTime.substring(3, 5));
    let endHours = parseInt(endTime.substring(0, 2));
    let endMinutes = parseInt(endTime.substring(3, 5));

    startDate = new Date(startYear, startMonth, startDay, startHours, startMinutes, 0, 0);
    let endDate = new Date(endYear, endMonth, endDay, endHours, endMinutes, 0, 0);

    console.log('start of upload');

    if (imageAsFile === '') {
      props.setLoading(false);
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

          let images = [{ fireBaseUrl, filename }];
          const request = { images, resource, title, location, startDate, endDate, startTime, endTime, allDay };

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
    const startTime = e.target.startTime.value;
    const endTime = e.target.endTime.value;
    const allDay = false;

    let startYear = parseInt(startDate.substring(0, 4));
    let startMonth = parseInt(startDate.substring(5, 7)) - 1;
    let startDay = parseInt(startDate.substring(8, 10));
    let endYear = startYear;
    let endMonth = startMonth;
    let endDay = startDay;

    let startHours = parseInt(startTime.substring(0, 2));
    let startMinutes = parseInt(startTime.substring(3, 5));
    let endHours = parseInt(endTime.substring(0, 2));
    let endMinutes = parseInt(endTime.substring(3, 5));

    startDate = new Date(startYear, startMonth, startDay, startHours, startMinutes, 0, 0);
    let endDate = new Date(endYear, endMonth, endDay, endHours, endMinutes, 0, 0);

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

  const handleAddPhoto = (e) => {
    e.preventDefault();

    props.setLoading(true);

    const _id = e.target.dataset.id;

    console.log('start of upload');

    if (imageAsFile === '') {
      props.setLoading(false);
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

          let photosArray = urlList.filter(item => item._id === _id);
          let newPhoto = { fireBaseUrl, filename };
          photosArray[0].images.push(newPhoto);

          let result = { images: photosArray[0].images }

          Axios
            .put(`/admin/api/events/photo/${_id}`, result)
            .then(response => {
              getImages();
              console.log(response);
              setImageAsFile('');
            })
            .catch(err => console.error(err));
        });
    });

    document.getElementById('form-events-edit-photo').reset();
  };

  const handleDeletePhoto = (e) => {
    const _id = e.target.value;
    let index = indexes[_id];
    let images = urlList.filter(item => item._id === _id)[0].images;
    const filename = images[index].filename;
    images.splice(index, 1);

    Axios
      .put(`/admin/api/events/photo/${_id}`, { images })
      .then(response => {
        console.log(response);

        if (!images[index]) {
          index--;
          let target = {};
          let copy = Object.assign(target, indexes);

          if (index < 0) {
            delete copy[_id];
          } else {
            copy[_id] = index;
          }
          setIndexes(copy)
        }
        getImages();

        storage.ref('events').child(filename).delete();
      })
      .catch(err => console.error(err));
  }

  const nextPhoto = (e) => {
    const _id = e.target.dataset.id;
    let copy = Object.assign({}, indexes);
    copy[_id]++;
    setIndexes(copy);
  }

  const previousPhoto = (e) => {
    const _id = e.target.dataset.id;
    let copy = Object.assign({}, indexes);
    copy[_id]--;
    setIndexes(copy);
  }

  const editToggler = (e) => {
    const _id = e.target.value;
    showEdit === _id ? setShowEdit(null) : setShowEdit(_id);
  }

  const convertTime = (time) => {
    let hours = parseInt(time.substring(0, 2));
    let minutes = time.substring(3, 5);

    return hours > 12 ? (hours - 12).toString() + ':' + minutes + ' PM' : hours.toString() + ':' + minutes + ' AM';
  }

  return (
    <div className="body-gallery">
      <h3>Events</h3>
      <form id="form-events" className="form-gallery" onSubmit={handleFireBaseUpload}>
        <h4 className="text-gallery-form-header">Post new event</h4>
        <input className="input-landing" type="text" name="title" placeholder="Title" />
        <input className="input-landing" type="text" name="location" placeholder="Location" />
        <textarea className="input-description" name="description" placeholder="Description" />
        <div className="form-1-events-row">
          <label className="label-1-date-time">Date: </label>
          <div className="container-date-time-column">
            <input className="input-date-time" type="date" name="startDate" placeholder="YYYY-MM-DD" />
          </div>
        </div>
        <div className="form-1-events-row">
          <label className="label-1-date-time">Start Time:</label>
          <div className="container-date-time-column">
            <input className="input-date-time" type="time" name="startTime" placeholder="HH:MM" />
          </div>
        </div>
        <div className="form-1-events-row">
          <label className="label-1-date-time">End Time:</label>
          <div className="container-date-time-column">
            <input className="input-date-time" type="time" name="endTime" placeholder="HH:MM" />
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
        urlList.map((item, key) => {
          return (
            <div className="container-gallery-row">
              <div className="container-store-column">
                <div style={{ "display": "flex", "alignItems": "center", "marginBottom": "40px" }}>
                  <img className="button-carousel" onClick={previousPhoto} data-id={item._id} style={indexes[item._id] > 0 ? { "height": "30px", "opacity": "0.2", "marginRight": "5px" } : { "height": "30px", "opacity": "0", "marginRight": "5px", "visibility": "hidden" }} src={'https://calendar-trips.s3-us-west-1.amazonaws.com/left_button.png'}></img>
                  <div className="container-store-img">
                    <img className="img-store" src={item.images.length === 0 ? "https://calendar-trips.s3-us-west-1.amazonaws.com/unnamed.png" : indexes[item._id] !== undefined ? item.images[indexes[item._id]].fireBaseUrl : item.images[0].fireBaseUrl} alt="gallery img" />
                  </div>
                  <img className="button-carousel" onClick={nextPhoto} data-id={item._id} style={indexes[item._id] < item.images.length - 1 ? { "height": "30px", "opacity": "0.2", "marginLeft": "5px" } : { "height": "30px", "opacity": "0", "marginLeft": "5px", "visibility": "hidden" }} src={'https://calendar-trips.s3-us-west-1.amazonaws.com/right_button.png'}></img>
                </div>
                {showEdit === item._id ?
                  <form id="form-events-edit-photo" onSubmit={handleAddPhoto} data-id={item._id}>
                    <div style={{ "marginBottom": "5px", "alignSelf": "flex-start" }}>Add photo</div>
                    <div style={{ "display": "flex", "flexWrap": "wrap", "justifySelf": "space-between", "width": "100%" }}>
                      <input
                        type="file"
                        onChange={handleImageAsFile}
                        style={{ "marginBottom": "5px" }}
                      />
                    </div>
                    <button type="submit" style={{ "marginBottom": "5px", "alignSelf": "flex-end" }}>Upload Photo</button>
                    {
                      item.images.length !== 0 ?
                        <button onClick={handleDeletePhoto} value={item._id} style={{ "alignSelf": "flex-end" }}>Delete Photo</button> : null
                    }
                  </form> : null
                }
              </div>
              <div className="container-events-title-description">
                <p>Title: {item.title}</p>
                <p>Location: {item.location}</p>
                <p>Start Date: {item.startDate}</p>
                <p>Start Time: {convertTime(item.startTime)}</p>
                <p>End Date: {item.endDate}</p>
                <p>End Time: {convertTime(item.endTime)}</p>
                <p>Number of Photos: {item.images.length}</p>
                <p style={{"lineHeight":"28px"}}>Description: {item.resource}</p>
                <div className="container-form-buttons">
                  <button value={item._id} style={{ "marginRight": "5px" }} onClick={editToggler}>Edit</button>
                  <button value={item._id} onClick={deleteHandler} data-filename={item.filename}>Delete</button>
                </div>
                {showEdit === item._id ?
                  <form id={item._id} className="form-gallery-edit" onSubmit={editHandler} data-id={item._id}>
                    <input style={{ "marginBottom": "5px", "marginTop": "5px", "fontSize": "14px" }} type="text" name="title" placeholder="Title" />
                    <input style={{ "marginBottom": "5px", "fontSize": "14px" }} type="text" name="location" placeholder="Location" />
                    <textarea name="description" placeholder="Description" style={{ "height": "50px", "marginBottom": "5px", "fontSize": "14px" }}></textarea>
                    <div className="form-2-events-row">
                      <p className="label-2-date-time">Date: </p>
                      <div className="container-date-time-column">
                        <input className="input-date-time" type="date" name="startDate" placeholder="YYYY-MM-DD" />
                      </div>
                    </div>
                    <div className="form-2-events-row">
                      <p className="label-2-date-time">Start Time: </p>
                      <div className="container-date-time-column">
                        <input className="input-date-time" type="time" name="startTime" placeholder="HH:MM" />
                      </div>
                    </div>
                    <div className="form-2-events-row">
                      <p className="label-2-date-time">End Time: </p>
                      <div className="container-date-time-column">
                        <input className="input-date-time" type="time" name="endTime" placeholder="HH:MM" />
                      </div>
                    </div>
                    <div className="container-form-buttons">
                      <button style={{ "marginRight": "5px" }} type="submit">Submit Changes</button>
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