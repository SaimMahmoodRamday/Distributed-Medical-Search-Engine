// // front/src/components/ResultsList.js

// import React, { useState } from 'react'; 
// import { Card, Button, Modal } from 'react-bootstrap';
// import './ResultsList.css';

// export default function ResultsList({ docs }) {
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState('');

//   const handleClose = () => setShowModal(false);

//   return (
//     <>
//       {docs.map((doc, idx) => {
//         const title = Array.isArray(doc.title) ? doc.title[0] : doc.title;
//         const abstract = Array.isArray(doc.abstract) ? doc.abstract[0] : doc.abstract;
//         const published = Array.isArray(doc.published_date)
//           ? doc.published_date[0]
//           : doc.published_date;
//         const pubDate = published
//           ? new Date(published).toLocaleDateString()
//           : 'Unknown';

//         // Determine the URL for the article: use doi_url if available, otherwise fallback to link
//         const doiUrl = Array.isArray(doc.doi_url) ? doc.doi_url[0] : doc.doi_url;
//         const fallbackLink = Array.isArray(doc.link) ? doc.link[0] : doc.link;
//         const articleUrl = doiUrl || fallbackLink;

//         // Determine keywords display: show joined keywords or 'not listed'
//         const keywordsList = Array.isArray(doc.keywords) && doc.keywords.length > 0
//           ? doc.keywords.join(', ')
//           : 'Not Listed';

//         return (
//           <Card className="mb-4 article-card" key={idx}>
//             <Card.Body>
//               <Card.Title className="article-title">
//                 {title || 'No Title'}
//               </Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">
//                 {doc.authors?.join(', ') || 'Unknown Authors'} |{' '}
//                 <small>Published: {pubDate}</small>
//               </Card.Subtitle>

//               <Card.Text>
//                 <strong>Abstract:</strong>
//                 <br />
//                 {abstract
//                   ? abstract.length > 200
//                     ? (
//                       <>
//                         {abstract.slice(0, 200)}…{' '}
//                         <Button
//                           variant="link"
//                           className="p-0 align-baseline"
//                           onClick={() => {
//                             setModalContent(abstract);
//                             setShowModal(true);
//                           }}
//                         >
//                           Read more
//                         </Button>
//                       </>
//                     )
//                     : abstract
//                   : 'No abstract'}
//               </Card.Text>

//               <pre className="small text-muted">
//                 Keywords: {keywordsList}
//               </pre>

//               {articleUrl && (
//                 <div className="d-flex justify-content-center mt-3">
//                   <Button
//                     variant="light"
//                     href={articleUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="view-btn"
//                   >
//                     View Article
//                   </Button>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         );
//       })}

//       {/* Modal for full abstract */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Abstract</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p style={{ whiteSpace: 'pre-wrap' }}>{modalContent}</p>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// Code 02

// front/src/components/ResultsList.js
// import React, { useState } from 'react'; 
// import { Card, Button, Modal, Spinner } from 'react-bootstrap';
// import './ResultsList.css';
// import { getSummary } from '../services/api';

// export default function ResultsList({ docs }) {
//   const [showModal,    setShowModal]    = useState(false);
//   const [modalTitle,   setModalTitle]   = useState('');
//   const [modalContent, setModalContent] = useState('');
//   const [loadingAI,    setLoadingAI]    = useState(false);

//   const handleClose = () => setShowModal(false);

//   // opens modal for abstract
//   const openAbstract = (abstract) => {
//     setModalTitle('Abstract');
//     setModalContent(abstract);
//     setShowModal(true);
//   };

//   // opens modal for AI summary
//   const openAISummary = async (title) => {
//     setLoadingAI(true);
//     try {
//       const summary = await getSummary(title);
//       setModalTitle('AI Explanation');
//       setModalContent(summary);
//       setShowModal(true);
//     } catch (err) {
//       console.error('AI summary failed', err);
//       setModalTitle('AI Summary');
//       setModalContent('Sorry, could not fetch AI summary.');
//       setShowModal(true);
//     } finally {
//       setLoadingAI(false);
//     }
//   };

//   return (
//     <>
//       {docs.map((doc, idx) => {
//         const title = Array.isArray(doc.title) ? doc.title[0] : doc.title;
//         const abstract = Array.isArray(doc.abstract)
//           ? doc.abstract[0]
//           : doc.abstract || '';
//         const published = Array.isArray(doc.published_date)
//           ? doc.published_date[0]
//           : doc.published_date;
//         const pubDate = published
//           ? new Date(published).toLocaleDateString()
//           : 'Unknown';

//         const doiUrl      = Array.isArray(doc.doi_url) ? doc.doi_url[0] : doc.doi_url;
//         const fallbackLink= Array.isArray(doc.link)    ? doc.link[0]    : doc.link;
//         const articleUrl  = doiUrl || fallbackLink;

//         const keywordsList = Array.isArray(doc.keywords) && doc.keywords.length > 0
//           ? doc.keywords.join(', ')
//           : 'Not Listed';

//         const showReadMore = abstract.length > 200;

//         return (
//           <Card className="mb-4 article-card" key={idx}>
//             <Card.Body>
//               <Card.Title className="article-title">
//                 {title || 'No Title'}
//               </Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">
//                 {doc.authors?.join(', ') || 'Unknown Authors'} |{' '}
//                 <small>Published: {pubDate}</small>
//               </Card.Subtitle>

//               <Card.Text>
//                 <strong>Abstract:</strong><br/>
//                 {showReadMore
//                   ? (
//                     <>
//                       {abstract.slice(0, 200)}…{' '}
//                       <Button
//                         variant="link"
//                         className="p-0 align-baseline"
//                         onClick={() => openAbstract(abstract)}
//                       >
//                         Read more
//                       </Button>
//                     </>
//                   )
//                   : abstract || 'No abstract'
//                 }
//               </Card.Text>

//               <pre className="small text-muted">
//                 Keywords: {keywordsList}
//               </pre>

//               <div className="d-flex flex-wrap gap-2 mt-3">
//                 {articleUrl && (
//                   <Button
//                     variant="light"
//                     href={articleUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="view-btn"
//                   >
//                     View Article
//                   </Button>
//                 )}

//                 <Button
//                   variant="primary"
//                   onClick={() => openAISummary(title)}
//                   disabled={loadingAI}
//                 >
//                   {loadingAI
//                     ? (<><Spinner animation="border" size="sm" /> AI…</>)
//                     : 'AI Assistance'}
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         );
//       })}

//       {/* shared Modal for both Abstract & AI Summary */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{modalTitle}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p style={{ whiteSpace: 'pre-wrap' }}>{modalContent}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// Code 03

// front/src/components/ResultsList.js
import React, { useState } from 'react'; 
import { Card, Button, Modal, Spinner } from 'react-bootstrap';
import './ResultsList.css';
import { getSummary } from '../services/api';

export default function ResultsList({ docs }) {
  const [showModal,    setShowModal]    = useState(false);
  const [modalTitle,   setModalTitle]   = useState('');
  const [modalContent, setModalContent] = useState('');
  const [loadingId,    setLoadingId]    = useState(null);

  const handleClose = () => setShowModal(false);

  // Show full abstract in modal
  const openAbstract = (abstract) => {
    setModalTitle('Abstract');
    setModalContent(abstract);
    setShowModal(true);
  };

  // Fetch AI summary for one article
  const openAISummary = async (id, title) => {
    setLoadingId(id);
    try {
      const summary = await getSummary(title);
      setModalTitle('AI Summary');
      setModalContent(summary);
      setShowModal(true);
    } catch (err) {
      console.error('AI summary failed', err);
      setModalTitle('AI Summary');
      setModalContent('Sorry, could not fetch AI summary.');
      setShowModal(true);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      {docs.map((doc, idx) => {
        const id = idx; // or doc.id if you have one
        const title = Array.isArray(doc.title) ? doc.title[0] : doc.title;
        const abstract = Array.isArray(doc.abstract)
          ? doc.abstract[0]
          : doc.abstract || '';
        const published = Array.isArray(doc.published_date)
          ? doc.published_date[0]
          : doc.published_date;
        const pubDate = published
          ? new Date(published).toLocaleDateString()
          : 'Unknown';

        const doiUrl       = Array.isArray(doc.doi_url) ? doc.doi_url[0] : doc.doi_url;
        const fallbackLink = Array.isArray(doc.link)    ? doc.link[0]    : doc.link;
        const articleUrl   = doiUrl || fallbackLink;

        const keywordsList = Array.isArray(doc.keywords) && doc.keywords.length > 0
          ? doc.keywords.join(', ')
          : 'Not Listed';

        const showReadMore = abstract.length > 200;

        return (
          <Card className="mb-4 article-card" key={id}>
            <Card.Body>
              <Card.Title className="article-title">
                {title || 'No Title'}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {doc.authors?.join(', ') || 'Unknown Authors'} |{' '}
                <small>Published: {pubDate}</small>
              </Card.Subtitle>

              <Card.Text>
                <strong>Abstract:</strong><br/>
                {showReadMore
                  ? (
                    <>
                      {abstract.slice(0, 200)}…{' '}
                      <Button
                        variant="link"
                        className="p-0 align-baseline"
                        onClick={() => openAbstract(abstract)}
                      >
                        Read more
                      </Button>
                    </>
                  )
                  : abstract || 'No abstract'
                }
              </Card.Text>

              <pre className="small text-muted">
                Keywords: {keywordsList}
              </pre>

              <div className="d-flex flex-wrap gap-2 mt-3">
                {articleUrl && (
                  <Button
                    variant="light"
                    href={articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    View Article
                  </Button>
                )}

                <Button
                  variant="primary"
                  onClick={() => openAISummary(id, title)}
                  disabled={loadingId === id}
                >
                  {loadingId === id
                    ? (<><Spinner animation="border" size="sm" /> AI…</>)
                    : 'AI Assistance'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}

      {/* shared Modal for both Abstract & AI Summary */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ whiteSpace: 'pre-wrap' }}>{modalContent}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//  Generate a Fibonacci sequence up to 100
