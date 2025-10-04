import React from 'react'

import NavBar from './NavBar';

function HomePage() {
  return (
    <div>
          <NavBar/>
          <div className='container hero-section'>
              <div className='row'>
                  <div className='col-6'>
                    <div className='hero-text'>
                      <h1>Simplify Your Onboarding Forms </h1>
                      <p>OnBoardForms helps you create, customize, and manage onboarding forms with ease.</p>
                    </div>
                    <a  href='/forms' className='hero-btn'>Get Started</a>
                  </div>
                  <div className='col-6'>
                    <div className='hero-image-container'>
                      <img src="/form2.jpg" alt="Hero Image" className="hero-image" />
                      <img src="/creating.png" alt="Hero Image" className="hero-image2" />
                    </div>                  
                  </div>
              </div>

          </div>
    </div>
  )
}

export default HomePage;