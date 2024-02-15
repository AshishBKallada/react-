import React from 'react'
import DisplayUser from './Components/DisplayUser/DisplayUser'

function App() {
  const userData = [
    { id: 1, name: 'Ashish B Kallada', email: 'ashishbkallada@gmail.com' },
    { id: 2, name: 'David Beckam', email: 'davidbeckam@gmail.com' }
  ];
  return (
    <div><center>

      <h1>USER INFORMATION </h1>
      {userData.map((user) => (
        <DisplayUser key={user.id} data={user} />
      ))}

    </center></div>
  )
}

export default App
