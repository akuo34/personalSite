import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Slider from 'react-slick';
import $ from 'jquery';

const Store = () => {

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('Prints');
  const [selectedItem, setSelectedItem] = useState(null);
  const [animation, setAnimation] = useState('hidden');
  const [modalItem, setModalItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  $('body').on('contextmenu', 'img', (e) => {
    return false;
  });

  const getItems = () => {
    Axios
      .get('/admin/api/store')
      .then(response => {
        setItems(response.data);
      })
      .catch(err => console.error(err));
  }

  const categoryHandler = (e) => {
    let category = e.target.dataset.category;
    setCategory(category);
    setSelectedItem(null);
  }

  const selectItem = (e) => {
    let id = e.target.dataset.id;
    let item = items.filter(item => item._id === id);
    setSelectedItem(item[0]);
  }

  const modalHandler = (e) => {
    const id = e.target.dataset.id;
    let item = items.filter(item => item._id === id);
    setModalItem(item[0]);

    if (showModal) {
      setShowModal(false);
      setAnimation('fadeout');
      setAnimation('hidden');
      setModalItem(null);
      document.body.style.overflow = "auto";
    } else {
      setShowModal(true);
      setAnimation('active');
      document.body.style.overflow = "hidden";
    }
  }

  var settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: 0,
  };

  return (
    <div>
      <div className="buffer"></div>
      <div className={animation === "active" ? "modal-image-zoom zoom-active" : `modal-image-zoom ${animation}`} onClick={modalHandler}>
      </div>
      <div
        className={`container-modal-image ${animation}`}>
        {/* // onClick={modalHandler}> */}
        {modalItem !== null ?
          <Slider className="slider-store" {...settings}>
            {modalItem.images.map(image => {
              return (
                <div 
                  className="container-image-slider-store"
                  onClick={modalHandler}>
                  <img
                    className="image-slider-store"
                    onClick={modalHandler}
                    src={image.fireBaseUrl}
                    alt="gallery-image"></img>
                </div>
              )
            })}
          </Slider> : null
        }
      </div>
      <div className="container-gallery-page">
        <div className="container-category-buttons-client">
          <button className="button-category-client" onClick={categoryHandler} data-category="Prints">Prints</button>
          <button className="button-category-client" onClick={categoryHandler} data-category="Originals">Originals</button>
          <button className="button-category-client" onClick={categoryHandler} data-category="Merchandise">Merchandise</button>
        </div>
        <h2 className="subheader-client-store">{selectedItem === null ? category : selectedItem.title}</h2>
        {selectedItem === null ?
          <div className="container-grid">
            {
              items.map(item => {
                if (item.category === category) {
                  return (
                    <div style={{ "marginBottom": "60px" }}>
                      <div className="container-item-store-client">
                        <div className="container-image-store-client">
                          <img
                            className="image-store-client"
                            onClick={selectItem}
                            data-id={item._id}
                            src={item.images[0].fireBaseUrl}
                            alt="store-img" />
                        </div>
                        <div className="container-title-price-client">
                          <h3
                            className="header-store-title-client"
                            onClick={selectItem}
                            data-id={item._id}
                            style={{ "textAlign": "right" }}>{item.title}</h3>
                          <span className="price">${item.price}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            }
          </div> :
          <div className="container-image-about">
            <img 
              className="image-store-item"
              data-id={selectedItem._id}
              onClick={modalHandler}
              src={selectedItem.images[0].fireBaseUrl} 
              alt="store-img"></img>
            <div>
              <p className="container-bio">{selectedItem.description}</p>
              {selectedItem.width && selectedItem.height ? <p className="container-bio" style={{"marginBottom":"10px"}}>{selectedItem.width} &#10005; {selectedItem.height} (inches)</p> : null}
              <p className="container-bio" style={{"marginBottom":"15px", "fontSize":"25px"}}>${selectedItem.price}</p>
              <p className="container-bio" style={{"marginBottom":"10px"}}>{selectedItem.quantity} left in stock.</p>
              <button className="button-add-cart-client">Add to cart</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Store;