// Advanced PDFShift example with headers, footers, and custom margins
const fs = require('fs');
const fetch = require('node-fetch');

// Set up base64 encoding for Node.js environment
global.btoa = (b) => Buffer.from(b).toString('base64');

async function generateAdvancedDashboardPDF() {
  console.log('Generating PDF with custom formatting...');
  
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  try {
    const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'X-API-Key': 'sk_3760610255903d34d05cba59ff6af8f79545b037',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        source: 'https://reporting-poc.netlify.app/',
        wait_for: 'pdfshiftReady',
        landscape: true,
        use_print: true,
        delay: 2000,
        sandbox: true,
        
        // Custom margins in centimeters (PDFShift expects these in cm)
        margin: {
          top: "2.54cm",    // 1 inch = 2.54 cm
          right: "1.27cm",  // 0.5 inch = 1.27 cm
          bottom: "1.9cm",  // 0.75 inch = 1.9 cm
          left: "1.27cm"    // 0.5 inch = 1.27 cm
        },
        
        // Simplified header with minimal styling
        header: {
          source: "<div style='text-align: center; font-size: 14px; padding: 10px; border-bottom: 1px solid #ddd;'><strong>J2 Health | Member Access Report</strong> - " + today + "</div>",
          height: "30px"
        },
        
        // Simplified footer
        footer: {
          source: "<div style='text-align: center; font-size: 12px; padding: 10px;'>Page {page} of {total} - Generated on " + today + "</div>",
          height: "30px"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('PDFShift API error:', errorData);
      return;
    }

    // Save the PDF to file
    const pdfFilename = 'dashboard-advanced.pdf';
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
generateAdvancedDashboardPDF(); 