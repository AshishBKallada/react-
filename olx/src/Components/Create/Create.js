import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext } from '../../Store/Context';
import { getStorage, ref, uploadBytes ,getDownloadURL } from 'firebase/storage';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { firestore } from '../../Firebase/config';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');
  const { user } = useContext(AuthContext);
  const storage = getStorage();
  const navigate = useNavigate();

  const handleUpload = (e) => {
    e.preventDefault();

    setNameError('');
    setCategoryError('');
    setPriceError('');
    setImageError('');

    if (!name) {
      setNameError('Name is required');
      return;
    }

    if (!category) {
      setCategoryError('Category is required');
      return;
    }

    if (!price) {
      setPriceError('Price is required');
      return;
    }

    if (!image) {
      setImageError('Image is required');
      return;
    }

    const currentDate = Timestamp.now();
    const storageRef = ref(storage, `/images/${image.name}`);
    uploadBytes(storageRef, image)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => addDoc(collection(firestore, 'products'), {
        name,
        category,
        price,
        url,
        user: user.uid,
        createdAt: currentDate
      }))
      .then((docRef) => {
        console.log('Document added with ID: ', docRef.id);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  }

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
          />
          {nameError && <div style={{'color':'red'}} className="error">{nameError}</div>} 
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            name="category"
          />
          {categoryError && <div style={{'color':'red'}} className="error">{categoryError}</div>} 
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            name="price"
          />
          {priceError && <div style={{'color':'red'}} className="error">{priceError}</div>} 
          <br />
        </form>
        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
        <form>
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {imageError && <div style={{'color':'red'}} className="error">{imageError}</div>}
          <br />
          <button className="uploadBtn" onClick={handleUpload}>Upload and Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
