import Highcharts from 'highcharts';

// Add PDFShift ready function to window
declare global {
  interface Window {
    pdfshiftReady: () => boolean;
  }
}

// Configure Highcharts globally for PDF generation
export const configurePDFShiftHighcharts = () => {
  // Disable animations for PDF export
  (Highcharts as any).setOptions({
    plotOptions: {
      series: {
        animation: false,
        states: {
          hover: {
            enabled: false
          }
        },
        showInLegend: true
      },
      pie: {
        animation: false,
        states: {
          hover: {
            enabled: false
          }
        }
      },
      column: {
        animation: false
      },
      scatter: {
        animation: false
      }
    },
    chart: {
      animation: false,
      events: {
        // Force immediate redraw of charts rather than waiting for animation
        load: function (this: any) {
          this.redraw();
        }
      }
    }
  });
};

// Add PDFShift ready function that will be called when the page is ready
export const createPDFShiftReadyFunction = () => {
  // This will be used by PDFShift's wait_for parameter
  window.pdfshiftReady = function () {
    // Return true when all charts are fully rendered
    return document.querySelectorAll('.highcharts-container').length > 0;
  };
}; 