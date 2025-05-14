// Simple script to test PDFShift with the reporting dashboard
const fs = require('fs');
const fetch = require('node-fetch');

// Set up base64 encoding for Node.js environment
global.btoa = (b) => Buffer.from(b).toString('base64');

async function generateDashboardPDF() {
  console.log('Generating PDF from dashboard...');
  
  try {
    const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'X-API-Key': 'sk_3760610255903d34d05cba59ff6af8f79545b037',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        source: 'https://reporting-poc.netlify.app/',
        wait_for: 'pdfshiftReady', // Use the function defined in our setup
        landscape: true,           // Dashboards are typically better in landscape
        use_print: true,           // Use print stylesheet - this will apply our @media print CSS
        delay: 2000,               // Add extra delay to ensure charts are fully rendered
        sandbox: true,             // Use sandbox mode to avoid using credits during testing
        
        // Use a larger page format
        format: 'A3',             // Larger page format (A3 instead of default A4)
        
        // Reduce margins to maximize usable space
        margin: {
          top: "1cm",
          right: "1cm",
          bottom: "1cm",
          left: "1cm"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PDFShift API error:', errorData);
      return;
    }

    // Save the PDF to file
    const pdfFilename = 'dashboard-single-page.pdf';
    const fileStream = fs.createWriteStream(pdfFilename);
    
    response.body.pipe(fileStream);
    
    fileStream.on('finish', () => {
      console.log(`PDF successfully saved to ${pdfFilename}`);
    });
    
    fileStream.on('error', (err) => {
      console.error('Error saving PDF:', err);
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

// Execute the function
generateDashboardPDF(); 