import React, { useEffect, useState } from 'react';
import './Profile.css';
import Navbar from '../Home/Navbar/Navbar';

function Profile({ user }) {
  const [isUpdateDiv, setUpdateDiv] = useState(false)
  const [image, setImage] = useState(null)
  const [showImg, setShowImg] = useState(null)

  const handleshowImageDiv = () => {
    setUpdateDiv((prevState) => !prevState)
  }
  const handleUpdate = async () => {

    try {
      console.log(image, '_______________');
      const formData = new FormData();
      formData.append('image', image, user._id + '.jpg');
      formData.append('id',user._id)

      const response = await fetch('http://localhost:4000/user/updateimage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('USER IMAGE UPDATED');
        setUpdateDiv((prevState) => !prevState);
      } else {
        console.log('Failed to update image');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const imgUpdate = (e) => {
    setImage(e.target.files[0])
    handleImageChange(e)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const contents = event.target.result;
      setShowImg(contents)
    };
    reader.readAsDataURL(file);
    
  };


  return (
    <>

      <Navbar />
      <div className="outer-background">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src={showImg ? showImg : user ? 'http://localhost:4000/public/images/' + user.dp : "https://i.pinimg.com/564x/b1/68/50/b168502011200a8fcb2565938a9d22ce.jpg"} alt="Avatar" />
            </div>
            <div className="profile-info">
              <h2>{user && user.name}</h2>
              <p>{user && user.email}</p>
              <p>Location: New York City</p>
            </div>
            <div className='showImageUpdateDiv'>
              {isUpdateDiv && (
                <div>
                  <input type="file" accept="image/*" onChange={(e) => imgUpdate(e)} />
                  <button onClick={handleUpdate}>Update</button>
                </div>
              )}
            </div>
            {!isUpdateDiv && (<div className="uploadBtn">
              <button onClick={handleshowImageDiv}>Update image</button>
            </div>)}
          </div>

          <div className="profile-bio">
            <h3>About Me</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis vel justo lobortis scelerisque. Maecenas in velit et est cursus lacinia. Morbi nec placerat magna. Ut congue, magna at sagittis luctus, justo tortor tempor ex, nec pretium sem risus eget tortor.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
