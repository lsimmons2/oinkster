
import React from 'react'

class About extends React.Component {

  render(){
    return (
      <div id='about'>

        <div id='about-description'>
          <h2>
            About Oinkster
          </h2>
          <p>
            This is a portfolio project I've made to showcase my web development skills. The app isn't meant to be original, but to demonstrate good web development code and architecture.
          </p>
          <p>
            The app currently consists of a front end made with React.js/Redux, authentication with JSON web tokens, a RESTful API built with Express, and a PostgreSQL database. I will try to push improvements and new features to production daily (with pm2).
          </p>
          <p>
            Source code <a href='https://github.com/lsimmons2/oinkster'>here</a>, my personal website <a href='http://leosimmons.me'>here</a>.
          </p>
        </div>

      </div>
    )
  }

}

export default About
