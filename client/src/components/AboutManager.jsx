import React, { useState, useEffect } from 'react';
import { storage } from '../firebase/firebase';
import Axios from 'axios';

const AboutManager = () => {

  const [imageAsFile, setImageAsFile] = useState('');
  const [urlList, setUrlList] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);

  useEffect(() => {
    Axios
      .get('/api/about')
      .then(response => {

        let array = response.data;

        if (!array.length) {
          setAllowUpload(true);
        }

        if (urlList.length !== array.length) {
          setUrlList(array);
        }
      });
  }, [urlList]);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => image)
  };

  const getBio = () => {
    Axios
      .get('/api/about')
      .then(response => {

        let array = response.data;

        setUrlList(array);
      });
  }

  const handleFireBaseUpload = (e) => {
    e.preventDefault();

    const bio = e.target.bio.value;

    console.log('start of upload');

    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    };

    const uploadTask = storage.ref(`/about/${imageAsFile.name}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('about').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {

          let filename = imageAsFile.name;
          const request = { fireBaseUrl, bio, filename };

          Axios
            .post('/api/about', request)
            .then(() => {
              getBio();
              setAllowUpload(false);
              console.log('posted to database')
            })
            .catch(err => console.error(err))
        });
    });

    document.getElementById('form-about').reset();
  };

  const handleChangePhoto = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;
    let filename = e.target.dataset.filename;

    console.log('start of upload');

    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    };

    const uploadTask = storage.ref(`/about/${imageAsFile.name}`).put(imageAsFile);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot)
    }, (err) => {
      console.log(err);
    }, () => {
      console.log('uploaded to firebase')
      storage.ref('about').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {

          storage.ref('about').child(filename).delete()
            .then(() => console.log('deleted from firebase'))
            .catch(err => console.error(err));
          
          filename = imageAsFile.name;

          const request = { fireBaseUrl, filename };
          Axios
            .put(`/api/about/photo/${_id}`, request)
            .then(() => {
              getBio();
              console.log('posted to database')
            })
            .catch(err => console.error(err))

        });
    });

    document.getElementById('form-edit-photo').reset();
  };

  const editHandler = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;
    const bio = e.target.bio.value;

    Axios
      .put(`/api/about/${_id}`, { bio })
      .then(() => {
        getBio();
        console.log('updated to database')
      })
      .catch(err => console.error(err));

    document.getElementById(_id).reset();
  }

  const deleteHandler = (e) => {
    const _id = e.target.value;
    const filename = e.target.dataset.filename;

    Axios
      .delete(`/api/about/${_id}`)
      .then(response => {
        console.log(response)
        getBio();

        storage.ref('about').child(filename).delete()
          .then(() => console.log('deleted from firebase'))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h3>About</h3>
      {allowUpload ?
        <form id="form-about" className="form-gallery" onSubmit={handleFireBaseUpload}>
          <h4 className="text-gallery-form-header">Create your bio</h4>
          <textarea className="input-gallery-description" name="bio" placeholder="About me" />
          <div className="container-gallery-inputs">
            <input
              className="input-gallery-file"
              type="file"
              onChange={handleImageAsFile}
            />
            <button className="button-gallery-post">Upload to About</button>
          </div>
        </form> : null
      }
      {
        urlList.map(item => {
          return (
            <div>
            <div className="container-gallery-row">
              <div className="container-gallery-img">
                <img className="img-gallery" src={item.fireBaseUrl} alt="gallery img" />
              </div>
              <div className="container-gallery-title-description">
                <form id={item._id} className="form-gallery-edit" onSubmit={editHandler} data-id={item._id}>
                  <textarea name="bio" placeholder="Bio" style={{"height":"80px"}}></textarea>
                  <div className="container-form-buttons">
                    <button type="submit">Edit</button>
                    <button value={item._id} onClick={deleteHandler} data-filename={item.filename}>Delete</button>
                  </div>
                </form>
                <form id="form-edit-photo" onSubmit={handleChangePhoto} data-id={item._id} data-filename={item.filename}>
                  <div style={{"marginTop": "20px"}}>Change photo</div>
                  <div>
                    <input
                      type="file"
                      onChange={handleImageAsFile}
                    />
                    <button>Upload photo</button>
                  </div>
                </form>
              </div>
            </div>
            <p style={{"width":"380px"}}>Bio: {item.bio}</p>
            </div>
          )
        })
      }
    </div>
  );
};

export default AboutManager;