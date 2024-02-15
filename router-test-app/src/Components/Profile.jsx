import React from 'react'
import One from '../Components/one'
function Profile(props) {
  return (
    <div>
         <h1 style={{backgroundColor:'blue'}}>Profile</h1>
         <One data={props.data} />
    </div>
  )
}

export default Profile
