// // front/src/components/Header.js
// import React from 'react';

// function Header() {
//   return (
//     <header className="app-header py-3">
//       <div className="container text-center">
//         <h1 className="solr-header mb-0">Distributed Medical Search Engine</h1>
//       </div>
//     </header>
//   );
// }

// export default Header;

// Code 02

// front/src/components/Header.js

// import React from 'react';
// import './Header.css';

// function Header() {
//   return (
//     <div className="hero-header text-center py-5">
//       <h1 className="solr-header">Distributed Medical Search Engine</h1>
//     </div>
//   );
// }

// export default Header;

// Code 03

// front/src/components/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="hero-header text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 123, 255, 0.6), rgba(0, 123, 255, 0.6)), url("/search-engine-bg.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="overlay">
        <div className="content">
          <div className="logo-title">
            <img src="/assets/medlogo.svg" alt="Medical Search Logo" className="header-logo" />
            <h1 className="solr-header">Distributed Medical Search Engine</h1>
          </div>
          <p className="subheading">Search smarter. Discover faster. Empower diagnosis.</p>
        </div>
      </div>
    </div>
  );
}

export default Header;