import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';
import Header from './Header';

const EpubReader = () => {
  const bookRef = useRef(null);
  const [rendition, setRendition] = useState(null);

  useEffect(() => {
    const book = ePub('/Sway.epub');

    book.ready.then(() => {
      const renditionInstance = book.renderTo(bookRef.current, {
        width: '100%',
        height: '100%',
      });

      renditionInstance.display();
      setRendition(renditionInstance);
    }).catch(error => {
      console.error('Error loading the ePub file:', error);
    });

    return () => {
      book.destroy();
    };
  }, []);

  const goToNextPage = () => {
    if (rendition) {
      rendition.next();
    }
  };


  const goToPreviousPage = () => {
    if (rendition) {
      rendition.prev();
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#fce5cc' }}>
      {/* ePub content */}
      <Header/>
      <div ref={bookRef} style={{
        width: '80%',  
        height: '70vh',
        margin: '85px auto',  
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}></div>
      
      {/* Navigation buttons */}
      <div style={{
        position: 'absolute',
        bottom: '153px',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        
      }}>
        <button onClick={goToPreviousPage} style={buttonStyle}>Previous</button>
        <button onClick={goToNextPage} style={buttonStyle}>Next</button>
      </div>
    </div>
  );
};


const buttonStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  outline: 'none',
  backgroundColor:'orangered'
};

export default EpubReader;
