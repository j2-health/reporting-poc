import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { configurePDFShiftHighcharts, createPDFShiftReadyFunction } from './utils/highchartsConfig';

function App() {
  const [animationsDisabled, setAnimationsDisabled] = useState(false);

  useEffect(() => {
    // Configure Highcharts for PDFShift
    configurePDFShiftHighcharts();
    
    // Create the pdfshiftReady function for PDFShift to detect when the page is ready
    createPDFShiftReadyFunction();
    
    // Mark animations as disabled for our indicator
    setAnimationsDisabled(true);
  }, []);

  return (
    <div className="App">
      {animationsDisabled && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          right: 0, 
          background: 'rgba(0,0,0,0.6)', 
          color: 'white', 
          padding: '4px 8px', 
          fontSize: '10px',
          zIndex: 9999 
        }}>
          HC Animations Disabled - {new Date().toISOString()}
        </div>
      )}
      <Dashboard />
    </div>
  );
}

export default App; 