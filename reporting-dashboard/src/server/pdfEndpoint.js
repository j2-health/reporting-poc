/**
 * Example Express.js endpoint for generating PDFs using PDFShift
 * 
 * This is a server-side code example and should be implemented in your backend,
 * not in the React frontend.
 */
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

/**
 * @route   POST /api/generate-pdf
 * @desc    Generate PDF from dashboard using PDFShift
 * @access  Private
 */
router.post('/generate-pdf', async (req, res) => {
  try {
    const { dashboardUrl } = req.body;
    
    if (!dashboardUrl) {
      return res.status(400).json({ error: 'Dashboard URL is required' });
    }
    
    // Your PDFShift API key
    const apiKey = process.env.PDFSHIFT_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'PDFShift API key not configured' });
    }
    
    // Call PDFShift API
    const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({
        source: dashboardUrl,
        wait_for: 'pdfshiftReady', // This is the function we defined in highchartsConfig.ts
        landscape: true,
        use_print: true,
        delay: 1000, // Add a small delay to ensure everything is fully rendered
        sandbox: process.env.NODE_ENV === 'development' // Use sandbox mode in development
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('PDFShift error:', errorData);
      return res.status(response.status).json({
        error: 'Failed to generate PDF',
        details: errorData
      });
    }
    
    // Get the PDF content
    const pdfBuffer = await response.buffer();
    
    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="dashboard.pdf"');
    
    // Send the PDF
    return res.send(pdfBuffer);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router; 