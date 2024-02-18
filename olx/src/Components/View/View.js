import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../Store/PostContext';
import { firestore } from '../../Firebase/config';
import { doc, getDoc } from "firebase/firestore";

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
console.log('postDetails',postDetails);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { user } = postDetails;
        console.log(user)

        const docRef = doc(firestore, 'users', user);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setUserDetails(snapshot.data());
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{new Date(postDetails.createdAt.seconds * 1000).toLocaleString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {userDetails ? (
            <>
              <p>{userDetails.username}</p>
              <p>{userDetails.phone}</p>
            </>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default View;
