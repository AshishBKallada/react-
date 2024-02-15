import React from 'react'
import { useContext } from 'react'
import { AppContext } from './AppContext'
function Two(props) {
    const {data}=useContext(AppContext)
  return (
    <div>
      <h1 style={{backgroundColor:'green',width:'200px'}}>Layer Two {data}</h1>
    </div>
  )
}

export default Two
