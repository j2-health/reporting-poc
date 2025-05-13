// Example of generating a PDF with a watermark using PDFShift
const fs = require('fs');
const fetch = require('node-fetch');

// Set up base64 encoding for Node.js environment
global.btoa = (b) => Buffer.from(b).toString('base64');

async function generateWatermarkedPDF() {
  console.log('Generating PDF with watermark...');
  
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
        
        // Add a watermark with simplified properties
        watermark: {
          // Text watermark
          text: "CONFIDENTIAL",
          offset_x: 0,
          offset_y: 0,
          rotate: 45,
          font_size: 60,
          // Remove problematic properties
          // font_family: "Arial",  // Removed
          // font_color: "rgba(220, 220, 220, 0.5)"  // Removed
        },
        
        // Simplified header
        header: {
          source: "<div style='text-align: center; font-size: 14px; padding: 10px; border-bottom: 1px solid #ddd;'><strong>J2 Health | Member Access Report</strong></div>",
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
    const pdfFilename = 'dashboard-watermark.pdf';
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
generateWatermarkedPDF(); 