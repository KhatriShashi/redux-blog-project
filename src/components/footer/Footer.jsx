import React from 'react'
import logo from '../../assets/Images/logo.png'
function Footer() {
  return (
    <>
      <div className="container-fluid sk-footer py-5 mt-3">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <div className="sk-footer-left">
              <div className='px-4'>
                <img src={logo} alt="footer-logo" />
                <p className='mt-3'>Blogio: Spark your curiosity. Short reads, big ideas. Elevate your day with insights, trends, and inspiration.</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6"></div>
        </div>
      </div>
    </>
  )
}

export default Footer