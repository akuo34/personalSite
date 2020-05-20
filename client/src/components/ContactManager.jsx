import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const ContactManager = () => {

  const [urlList, setUrlList] = useState([]);
  const [allowUpload, setAllowUpload] = useState(false);

  useEffect(() => {
    Axios
      .get('/api/contact')
      .then(response => {

        let array = response.data;

        if (!array.length) {
          setAllowUpload(true);
        }

        if (urlList.length !== array.length) {
          setUrlList(array);
        }
      })
      .catch(err => console.error(err));
  }, [urlList]);

  const getContact = () => {
    Axios
      .get('/api/contact')
      .then(response => {

        let array = response.data;

        setUrlList(array);
      })
      .catch(err => console.error(err));
  }

  const uploadContact = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const instagram = e.target.instagram.value;

    const request = { name, email, phone, instagram };

    Axios
      .post('/api/contact', request)
      .then(response => {
        getContact();
        setAllowUpload(false);
        console.log(response);
      })
      .catch(err => console.error(err));

    document.getElementById('form-contact').reset();
  };

  const editHandler = (e) => {
    e.preventDefault();

    const _id = e.target.dataset.id;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const instagram = e.target.instagram.value;

    const request = { name, email, phone, instagram };

    Axios
      .put(`/api/contact/${_id}`, request)
      .then(response => {
        getContact();
        console.log(response)
      })
      .catch(err => console.error(err));

    document.getElementById(_id).reset();
  }

  const deleteHandler = (e) => {
    const _id = e.target.value;

    Axios
      .delete(`/api/contact/${_id}`)
      .then(response => {
        console.log(response)
        getContact();
        setAllowUpload(true);
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h3>Contact</h3>
      {allowUpload ?
        <form id="form-contact" className="form-gallery" onSubmit={uploadContact}>
          <h4 className="text-gallery-form-header">Create your contact</h4>
          <input className="input-gallery-title" type="text" name="name" placeholder="Name" />
          <input className="input-gallery-title" type="email" name="email" placeholder="Email" />
          <input className="input-gallery-title" type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone XXX-XXX-XXXX" />
          <input className="input-gallery-title" type="url" name="instagram" placeholder="Instagram link" />
          <button className="button-gallery-post" type="submit">Upload to Contact</button>
        </form> : null
      }
      {
        urlList.map(item => {
          return (
            <div className="container-contact-row">
              <div>
                <p style={{ "width": "380px" }}>Name: {item.name}</p>
                <p style={{ "width": "380px" }}>Email: {item.email}</p>
                <p style={{ "width": "380px" }}>Phone: {item.phone}</p>
                <p style={{ "width": "380px" }}>Instagram: {item.instagram}</p>
              </div>
              <form id={item._id} 
                className="form-gallery-edit" 
                onSubmit={editHandler} 
                data-id={item._id}
                style={{"margin-left":"15px"}}>
                <input type="text" name="name" placeholder="Name" />
                <input type="email" name="email" placeholder="Email" />
                <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone XXX-XXX-XXXX" />
                <input type="url" name="instagram" placeholder="Instagram link" />
                <div className="container-form-buttons">
                  <button type="submit">Edit</button>
                  <button value={item._id} onClick={deleteHandler}>Delete</button>
                </div>
              </form>
            </div>
          )
        })
      }
    </div >
  );
};

export default ContactManager;