import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import { configurePDFShiftHighcharts, createPDFShiftReadyFunction } from './utils/highchartsConfig';

function App() {
  useEffect(() => {
    // Configure Highcharts for PDFShift
    configurePDFShiftHighcharts();
    
    // Create the pdfshiftReady function for PDFShift to detect when the page is ready
    createPDFShiftReadyFunction();
  }, []);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App; 