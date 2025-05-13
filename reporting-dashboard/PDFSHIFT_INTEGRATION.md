# PDFShift Integration for Reporting Dashboard

This document explains how to use PDFShift to generate PDFs from the dashboard with Highcharts visualizations.

## Overview

PDFShift is integrated to generate high-quality PDFs from our dashboard with proper rendering of Highcharts visualizations. The integration includes:

1. Disabling animations in Highcharts for PDF generation
2. Creating a `pdfshiftReady` function to indicate when charts are fully rendered
3. Setting up API utilities for PDF generation

## How It Works

The integration consists of several parts:

### 1. Highcharts Configuration for PDFShift

The `highchartsConfig.ts` utility disables animations and provides a ready function for PDFShift:

```typescript
// src/utils/highchartsConfig.ts
import Highcharts from 'highcharts';

// Configure Highcharts globally for PDF generation
export const configurePDFShiftHighcharts = () => {
  // Disables animations for charts
};

// Add PDFShift ready function that will be called when the page is ready
export const createPDFShiftReadyFunction = () => {
  // Creates window.pdfshiftReady function that PDFShift will check
};
```

### 2. PDFShift Service Utilities

The `pdfShiftService.ts` file provides helper functions and types for using PDFShift:

```typescript
// src/utils/pdfShiftService.ts
export interface PDFShiftParams {
  source: string;
  wait_for?: string;
  landscape?: boolean;
  // ... other options
}

export const createPDFShiftParams = (source: string, additionalParams = {}) => {
  // Creates parameters with good defaults for dashboards
};
```

### 3. Server-Side Integration

The `pdfEndpoint.js` file shows an example Express.js endpoint for generating PDFs:

```javascript
// Server-side code example
router.post('/generate-pdf', async (req, res) => {
  // Example implementation
});
```

## How to Generate PDFs

### Option 1: Backend API Call (Recommended)

To generate PDFs, create a backend endpoint that calls PDFShift:

1. Set your PDFShift API key as an environment variable: `PDFSHIFT_API_KEY`
2. Create an endpoint similar to the example in `src/server/pdfEndpoint.js`
3. Call this endpoint from your frontend when you need to generate a PDF

### Option 2: Direct API Call

For small projects or testing, you can call PDFShift directly from your frontend:

```javascript
const generatePDF = async () => {
  const apiKey = 'your_pdfshift_api_key'; // Should be in backend in production
  
  const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey
    },
    body: JSON.stringify({
      source: window.location.href,
      wait_for: 'pdfshiftReady',
      landscape: true,
      use_print: true,
      sandbox: true // Set to false in production
    })
  });
  
  if (response.ok) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    // Open PDF in new tab
    window.open(url, '_blank');
  }
};
```

## Important Notes

1. **Sandbox Mode**: In development, set `sandbox: true` to avoid using credits
2. **API Key Security**: Never expose your PDFShift API key in frontend code
3. **Wait For Function**: The `wait_for: 'pdfshiftReady'` parameter is crucial for proper chart rendering
4. **Handling Large Dashboards**: Use `landscape: true` for better layout of wide dashboards 