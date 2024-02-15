import React from 'react'
import './DisplayUser.css'
function DisplayUser(props) {
  return (
    <div className='display-container'>

      <p>{props.data.name}</p>
      <p>Email:{props.data.email}</p>

    </div>
  )
}

export default DisplayUser
