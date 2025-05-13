/**
 * PDFShift service to handle PDF generation
 * 
 * This utility provides functions to work with PDFShift API.
 * 
 * Example usage in a backend API:
 * ```
 * // API endpoint code to generate PDF
 * const url = "https://your-dashboard-url.com";
 * const apiKey = "your_pdfshift_api_key";
 * const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
 *   method: "POST",
 *   headers: {
 *     "Content-Type": "application/json",
 *     "X-API-Key": apiKey
 *   },
 *   body: JSON.stringify({
 *     source: url,
 *     wait_for: "pdfshiftReady", // This is the function we defined in highchartsConfig.ts
 *     landscape: true,
 *     use_print: true
 *   })
 * });
 * 
 * const pdfBuffer = await response.arrayBuffer();
 * ```
 */

/**
 * Parameters for PDFShift API
 */
export interface PDFShiftParams {
  source: string;
  wait_for?: string;
  landscape?: boolean;
  use_print?: boolean;
  sandbox?: boolean;
  filename?: string;
  [key: string]: any;
}

/**
 * Creates PDFShift conversion parameters with sensible defaults for Highcharts
 */
export const createPDFShiftParams = (source: string, additionalParams: Partial<PDFShiftParams> = {}): PDFShiftParams => {
  return {
    source,
    wait_for: "pdfshiftReady", // Use the function we defined in highchartsConfig.ts
    landscape: true,           // Dashboards are typically better in landscape
    use_print: true,           // Use print stylesheet
    sandbox: false,            // Set to true in development
    ...additionalParams
  };
}; 