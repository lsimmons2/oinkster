
import React from 'react'

class Home extends React.Component {

  render(){
    return (
      <div id="home">
        <div id='home-container'>
          <div id='home-logo-container'>
            <img src='images/thick-logo.png'/>
          </div>
          <div id="home-description-container">
            <h2>
              Welcome to Oinkster!
            </h2>
            <p>
              It's pretty much Twitter, but with pigs!
            </p>
          </div>
        </div>
      </div>
    )
  }

}

export default Home
