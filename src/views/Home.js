import React from 'react'
import LocationSearch from '../components/LocationSearch'

function Home({currentUser}) {
  return (
    <div>
        <h1>Welcome {currentUser? currentUser.username: null}!</h1>
        <LocationSearch/>
    </div>
  )
}

export default Home