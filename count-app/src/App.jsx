import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from './urls'
import './App.css'

function App() {

  const [count, setCount] = useState(0)
  const [userData, setuserData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if(count!==0)
    setLoading(true)
    if (count)
      axios.get(`${baseUrl}/${count}`).then((response) => {
        console.log(response.data)
        setuserData(response.data)
        setLoading(false)
      })
        .catch((err) => {
          console.log(err.message);
          setError(err.message)  
        })
  }, [count]);

  return (
    <div className='container'>
      <button style={{ marginRight: '100px' }} onClick={() => (count > 0 ? setCount(count - 1) : '')}>-</button>
      {count}
      <button style={{ marginLeft: '100px' }} onClick={() => (count<=9 ?setCount(count + 1):'')}>+</button>

      <div className='userinfo'>
        <h1>USER INFO</h1>
         {loading && <p className='loading'>Loading</p>}
         {error && <p>Error:{error}</p>}
         {userData && (
          <div>
            <p>Name:{userData.name}</p>
            <p>Name:{userData.email}</p>

            </div>
         )}
      </div>
    </div>
  )
}

export default App
