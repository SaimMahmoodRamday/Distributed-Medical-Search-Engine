
// // front/src/App.js

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// import SearchBar        from './components/SearchBar';
// import Filters          from './components/Filters';
// import SortDropdown     from './components/SortDropdown';
// import ResultsList      from './components/ResultsList';
// import PaginationControl from './components/PaginationControl';

// import { searchDocs }    from './services/api';
// import { getSummary }    from './services/api';

// function App() {
//   const [query,    setQuery]    = useState('');
//   const [filter,   setFilter]   = useState('all');
//   const [sortOrder,setSortOrder]= useState('desc');
//   const [year,     setYear]     = useState('');
//   const [results,  setResults]  = useState([]);
//   const [total,    setTotal]    = useState(0);
//   const [page,     setPage]     = useState(1);
//   const rowsPerPage = 15;

//   useEffect(() => {
//     if (query) fetchResults(query, filter, page, sortOrder, year);
//   }, [page, query, filter, sortOrder, year]);

//   const fetchResults = async (q, f, p, s, y) => {
//     try {
//       const { docs, numFound } = await searchDocs(q, f, p, rowsPerPage, s, y);
//       setResults(docs);
//       setTotal(numFound);
//     } catch (err) {
//       console.error('Error fetching:', err);
//     }
//   };

//   const handleSearch = () => {
//     setPage(1);
//     fetchResults(query, filter, 1, sortOrder, year);
//   };

//   return (
//     <div style={{
//         backgroundImage: "url('/search-engine-bg.jpg')",
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundAttachment: 'fixed',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//       }}>
//       <div style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.65)',
//           minHeight: '100vh',
//           padding: '20px 0',
//         }}>
//         <div className="container">
//           <h1 className="text-center solr-header">Distributed Medical Search Engine</h1>

//           <div className="row gy-3 mb-4">
//             <div className="col-12">
//               <SearchBar
//                 value={query}
//                 onChange={setQuery}
//                 onSearch={handleSearch}
//               />
//             </div>
//           </div>

//           <div className="row align-items-center gy-3 mb-4">
//             <div className="col-md-4 col-12">
//               <Filters value={filter} onChange={setFilter} />
//             </div>
//             <div className="col-md-4 col-12">
//               <SortDropdown value={sortOrder} onChange={order => { setSortOrder(order); setPage(1); }} />
//             </div>
//             <div className="col-md-4 col-12">
//               <input
//                 className="form-control"
//                 type="text"
//                 placeholder="Search By Year"
//                 value={year}
//                 onChange={e => setYear(e.target.value)}
//                 onKeyDown={e => { if (e.key==='Enter') handleSearch(); }}
//               />
//             </div>
//           </div>

//           <ResultsList
//             docs={results}
//             onRequestSummary={getSummary}
//           />

//           <div className="row mt-4">
//             <div className="col d-flex justify-content-center">
//               <PaginationControl
//                 current={page}
//                 total={total}
//                 perPage={rowsPerPage}
//                 onChange={setPage}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// Code 02

// front/src/App.js

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// import SearchBar        from './components/SearchBar';
// import Filters          from './components/Filters';
// import SortDropdown     from './components/SortDropdown';
// import ResultsList      from './components/ResultsList';
// import PaginationControl from './components/PaginationControl';

// import { searchDocs }    from './services/api';
// import { getSummary }    from './services/api';

// function App() {
//   // Controlled input value
//   const [query,      setQuery]      = useState('');
//   // Only when user submits (clicks search or presses Enter)
//   const [searchTerm, setSearchTerm] = useState('');

//   const [filter,     setFilter]     = useState('all');
//   const [sortOrder,  setSortOrder]  = useState('desc');
//   const [year,       setYear]       = useState('');
//   const [results,    setResults]    = useState([]);
//   const [total,      setTotal]      = useState(0);
//   const [page,       setPage]       = useState(1);
//   const rowsPerPage = 15;

//   useEffect(() => {
//     // Trigger fetch only when searchTerm changes (i.e., user clicked Search)
//     if (searchTerm) {
//       fetchResults(searchTerm, filter, page, sortOrder, year);
//     }
//   }, [searchTerm, filter, sortOrder, year, page]);

//   const fetchResults = async (q, f, p, s, y) => {
//     try {
//       const { docs, numFound } = await searchDocs(q, f, p, rowsPerPage, s, y);
//       setResults(docs);
//       setTotal(numFound);
//     } catch (err) {
//       console.error('Error fetching:', err);
//     }
//   };

//   const handleSearch = () => {
//     // Reset to first page and set the term to trigger effect
//     setPage(1);
//     setSearchTerm(query.trim());
//   };

//   return (
//     <div style={{
//         backgroundImage: "url('/search-engine-bg.jpg')",
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundAttachment: 'fixed',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//       }}>
//       <div style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.65)',
//           minHeight: '100vh',
//           padding: '20px 0',
//         }}>
//         <div className="container">
//           <h1 className="text-center solr-header">Distributed Medical Search Engine</h1>

//           <div className="row gy-3 mb-4">
//             <div className="col-12">
//               <SearchBar
//                 value={query}
//                 onChange={setQuery}
//                 onSearch={handleSearch}
//               />
//             </div>
//           </div>

//           <div className="row align-items-center gy-3 mb-4">
//             <div className="col-md-4 col-12">
//               <Filters value={filter} onChange={setFilter} />
//             </div>
//             <div className="col-md-4 col-12">
//               <SortDropdown value={sortOrder} onChange={order => { setSortOrder(order); setPage(1); }} />
//             </div>
//             <div className="col-md-4 col-12">
//               <input
//                 className="form-control"
//                 type="text"
//                 placeholder="Search By Year"
//                 value={year}
//                 onChange={e => setYear(e.target.value)}
//                 onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
//               />
//             </div>
//           </div>

//           <ResultsList
//             docs={results}
//             onRequestSummary={getSummary}
//           />

//           <div className="row mt-4">
//             <div className="col d-flex justify-content-center">
//               <PaginationControl
//                 current={page}
//                 total={total}
//                 perPage={rowsPerPage}
//                 onChange={newPage => setPage(newPage)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// Code 03

// front/src/App.js

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// import SearchBar        from './components/SearchBar';
// import Filters          from './components/Filters';
// import SortDropdown     from './components/SortDropdown';
// import ResultsList      from './components/ResultsList';
// import PaginationControl from './components/PaginationControl';

// import { searchDocs }    from './services/api';
// import { getSummary }    from './services/api';

// function App() {
//   // Controlled input value
//   const [query,      setQuery]      = useState('');
//   // Only when user submits (clicks search or presses Enter)
//   const [searchTerm, setSearchTerm] = useState('');

//   const [filter,     setFilter]     = useState('all');
//   const [sortOrder,  setSortOrder]  = useState('desc');
//   const [year,       setYear]       = useState('');
//   const [results,    setResults]    = useState([]);
//   const [total,      setTotal]      = useState(0);
//   const [page,       setPage]       = useState(1);
//   const rowsPerPage = 15;

//   useEffect(() => {
//     // Trigger fetch only when searchTerm changes or page/filter/sort/year changes (after initial submit)
//     if (searchTerm) {
//       fetchResults(searchTerm, filter, page, sortOrder, year);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchTerm, filter, sortOrder, year, page]);

//   const fetchResults = async (q, f, p, s, y) => {
//     try {
//       const { docs, numFound } = await searchDocs(q, f, p, rowsPerPage, s, y);
//       setResults(docs);
//       setTotal(numFound);
//     } catch (err) {
//       console.error('Error fetching:', err);
//     }
//   };

//   const handleSearch = () => {
//     const term = query.trim();
//     // Clear previous results immediately
//     setResults([]);
//     setTotal(0);
//     setPage(1);

//     if (term === searchTerm) {
//       // If same term, manually re-fetch
//       fetchResults(term, filter, 1, sortOrder, year);
//     } else {
//       // Setting searchTerm triggers useEffect
//       setSearchTerm(term);
//     }
//   };

//   return (
//     <div style={{
//         backgroundImage: "url('/search-engine-bg.jpg')",
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundAttachment: 'fixed',
//         backgroundPosition: 'center',
//         minHeight: '100vh',
//       }}>
//       <div style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.65)',
//           minHeight: '100vh',
//           padding: '20px 0',
//         }}>
//         <div className="container">
//           <h1 className="text-center solr-header">Distributed Medical Search Engine</h1>

//           <div className="row gy-3 mb-4">
//             <div className="col-12">
//               <SearchBar
//                 value={query}
//                 onChange={setQuery}
//                 onSearch={handleSearch}
//               />
//             </div>
//           </div>

//           <div className="row align-items-center gy-3 mb-4">
//             <div className="col-md-4 col-12">
//               <Filters value={filter} onChange={value => { setFilter(value); setPage(1); }} />
//             </div>
//             <div className="col-md-4 col-12">
//               <SortDropdown value={sortOrder} onChange={order => { setSortOrder(order); setPage(1); }} />
//             </div>
//             <div className="col-md-4 col-12">
//               <input
//                 className="form-control"
//                 type="text"
//                 placeholder="Search By Year"
//                 value={year}
//                 onChange={e => { setYear(e.target.value); setPage(1); }}
//                 onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
//               />
//             </div>
//           </div>

//           <ResultsList
//             docs={results}
//             onRequestSummary={getSummary}
//           />

//           <div className="row mt-4">
//             <div className="col d-flex justify-content-center">
//               <PaginationControl
//                 current={page}
//                 total={total}
//                 perPage={rowsPerPage}
//                 onChange={newPage => setPage(newPage)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// Code 04

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SearchBar         from './components/SearchBar';
import Filters           from './components/Filters';
import SortDropdown      from './components/SortDropdown';
import ResultsList       from './components/ResultsList';
import PaginationControl from './components/PaginationControl';
import Header            from './components/Header';
import Footer            from './components/Footer';

import { searchDocs }    from './services/api';
import { getSummary }    from './services/api';

function App() {
  const [query,      setQuery]      = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter,     setFilter]     = useState('all');
  const [sortOrder,  setSortOrder]  = useState('desc');
  const [year,       setYear]       = useState('');
  const [results,    setResults]    = useState([]);
  const [total,      setTotal]      = useState(0);
  const [page,       setPage]       = useState(1);
  const rowsPerPage = 15;

  useEffect(() => {
    if (searchTerm) {
      fetchResults(searchTerm, filter, page, sortOrder, year);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filter, sortOrder, year, page]);

  const fetchResults = async (q, f, p, s, y) => {
    try {
      const { docs, numFound } = await searchDocs(q, f, p, rowsPerPage, s, y);
      setResults(docs);
      setTotal(numFound);
    } catch (err) {
      console.error('Error fetching:', err);
    }
  };

  const handleSearch = () => {
    const term = query.trim();
    setResults([]);
    setTotal(0);
    setPage(1);

    if (term === searchTerm) {
      fetchResults(term, filter, 1, sortOrder, year);
    } else {
      setSearchTerm(term);
    }
  };

  return (
    <div style={{
      backgroundImage: "url('/search-engine-bg.jpg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        minHeight: '100vh',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Header />

        <div className="container">
          <div className="row gy-3 mb-4">
            <div className="col-12">
              <SearchBar
                value={query}
                onChange={setQuery}
                onSearch={handleSearch}
              />
            </div>
          </div>

          <div className="row align-items-center gy-3 mb-4">
            <div className="col-md-4 col-12">
              <Filters value={filter} onChange={value => { setFilter(value); setPage(1); }} />
            </div>
            <div className="col-md-4 col-12">
              <SortDropdown value={sortOrder} onChange={order => { setSortOrder(order); setPage(1); }} />
            </div>
            <div className="col-md-4 col-12">
              <input
                className="form-control"
                type="text"
                placeholder="Search By Year"
                value={year}
                onChange={e => { setYear(e.target.value); setPage(1); }}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              />
            </div>
          </div>

          <ResultsList
            docs={results}
            onRequestSummary={getSummary}
          />

          <div className="row mt-4">
            <div className="col d-flex justify-content-center">
              <PaginationControl
                current={page}
                total={total}
                perPage={rowsPerPage}
                onChange={newPage => setPage(newPage)}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
