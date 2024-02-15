import React from 'react'
import Two from '../Components/two'
function One(props) {
  return (
    <div>
      <h1 style={{backgroundColor:'yellow',width:'300px'}}>Layer One</h1>
      <Two data={props.data}/>
    </div>
  )
}

export default One
