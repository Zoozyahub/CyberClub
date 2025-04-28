import React from 'react';
import './Footer.css';
import logo from './logo.png';
import soc1 from './social-icon1.png';
import soc2 from './social-icon2.png';


function Footer() {
  return (
    <footer className="footer-container">
    <div className='in-footer'>
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="contacts">
        <span className="underline">Конт<span className="highlight">акты</span></span>
        <span className="email">Example@mail.ru</span>
      </div>
      <div className="social-media">
        <span className="underline">Со<span className="highlight">цсети</span></span>
        <div className="social-icons">
          <img src={soc1} alt="Social Icon 1" className="social-icon" />
          <img src={soc2} alt="Social Icon 2" className="social-icon" />
        </div>
      </div>
      <div className="info">
        <span className="underline">Информа<span className="highlight">ция</span></span>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
