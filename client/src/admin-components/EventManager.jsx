import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase';
import Axios from 'axios';

const EventManager = () => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [urlList, setUrlList] = useState([]);

  useEffect(() => {
    Axios
      .get('/admin/api/events')
      .then(response => {

        let array = response.data;

        if (urlList.length !== array.length) {
          setUrlList(array);
        }
      })
      .catch(err => console.error(err));
  }, [urlList]);

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
    const time = e.target.time.value;
    const start = e.target.start.value;
    const end = e.target.end.value;
    const allDay = e.target.allDay.value;

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

          const request = { fireBaseUrl, resource, title, location, time, start, end, allDay, filename };

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
    const time = e.target.time.value;
    const start = e.target.start.value;
    const end = e.target.end.value;
    const allDay = e.target.allDay.value;

    Axios
      .put(`/admin/api/events/${_id}`, { title, resource, location, time, start, end, allDay })
      .then(response => {
        getImages();
        console.log(response)
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

  return (
    <div>
      <h3>Events</h3>
      <form id="form-events" className="form-gallery" onSubmit={handleFireBaseUpload}>
        <h4 className="text-gallery-form-header">Post new event</h4>
        <div className="form-events-row">
          <input className="input-gallery-title" type="text" name="title" placeholder="Title" />
          <div className="form-events-column">
            <input type="date" name="start" />
            <input type="date" name="end" />
          </div>
        </div>
        <div className="form-events-row">
          <input className="input-events-location" type="text" name="location" placeholder="Location" />
          <div className="form-events-column">
            <div>
              <label>Time: </label>
              <input type="time" name="time" />
            </div>
            <div>
              <label>All-day event: </label>
              <select name="allDay">
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
          </div>
        </div>
        <textarea className="input-gallery-description" name="description" placeholder="Description" />
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
              <div className="container-gallery-title-description" style={{ "width": "300px" }}>
                <p>Title: {item.title}</p>
                <p>Start: {item.start}</p>
                <p>End: {item.end}</p>
                <p>Time: {item.time}</p>
                <p>All-Day: {item.allDay}</p>
                <p>Location: {item.location}</p>
                <p>Description: {item.resource}</p>
                <form id={item._id} className="form-gallery-edit" onSubmit={editHandler} data-id={item._id}>
                  <input type="text" name="title" placeholder="Title" />
                  <input type="date" name="start" />
                  <input type="date" name="end" />
                  <input type="time" name="time" />
                  <select name="allDay">
                    <option value="true">true</option>
                    <option value="false">false</option>
                  </select>
                  <input type="text" name="location" placeholder="Location" />
                  <textarea name="description" placeholder="Description" style={{ "height": "50px" }}></textarea>
                  <div className="container-form-buttons">
                    <button type="submit">Edit</button>
                    <button value={item._id} onClick={deleteHandler} data-filename={item.filename}>Delete</button>
                  </div>
                </form>
              </div>
            </div>
          )
        })
      }
    </div >
  );
};

export default EventManager;