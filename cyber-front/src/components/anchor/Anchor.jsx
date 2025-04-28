import React, { useState, useEffect } from 'react';
import './Anchor.css'
import scrollToTopIcon from './anchor.png'


function Anchor() {
    const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.pageYOffset > 300;
      setShowButton(isTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top-button ${showButton ? 'show' : ''}`}
      onClick={handleScrollToTop}
    >
      <img src={scrollToTopIcon} alt="Scroll To Top" />
    </button>
  );
};
  
  export default Anchor;