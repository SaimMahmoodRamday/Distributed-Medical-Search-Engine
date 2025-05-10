// front/src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="app-footer text-center py-4 mt-5">
      <div className="container">
        <p>Contact Us: info@medicalengine.com</p>
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
