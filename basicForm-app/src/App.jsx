import React, { useEffect, useRef, useState } from 'react'

function App() {

  const [name, setName] = useState()
  const inputRef = useRef('')

  useEffect(() => {
    inputRef.current?.focus();
  }, [name]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const showInput=(e)=>
  {
    e.preventDefault();
    console.log(name)
  }
  return (
    <div className='container'>

      <form onSubmit={showInput}>

        <label>Enter your name</label>
        <input ref={inputRef} onChange={handleChange} type="text" placeholder='Enter a name' />
        <br />
        <br />
        <button >SUBMIT</button>

      </form>

    </div>
  )
}

export default App
