import Highcharts from 'highcharts';

// Add PDFShift ready function to window
declare global {
  interface Window {
    pdfshiftReady: () => boolean;
  }
}

// Configure Highcharts globally for PDF generation
export const configurePDFShiftHighcharts = () => {
  console.log("Disabling Highcharts animations for PDF generation"); // Add logging

  // Disable animations for PDF export - more aggressively
  (Highcharts as any).setOptions({
    plotOptions: {
      series: {
        animation: false,
        states: {
          hover: {
            enabled: false
          },
          inactive: {
            opacity: 1
          }
        },
        showInLegend: true,
        enableMouseTracking: false,
        shadow: false,
        dataLabels: {
          animation: false,
          defer: false
        }
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
        animation: false,
        states: {
          hover: {
            enabled: false
          }
        }
      },
      scatter: {
        animation: false,
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    chart: {
      animation: false,
      reflow: false,
      events: {
        // Force immediate redraw of charts rather than waiting for animation
        load: function (this: any) {
          console.log("Chart loaded - forcing redraw");
          this.redraw();
        }
      }
    }
  });

  // Override the animate function - store original for reference but don't need to use it
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const originalAnimate = (Highcharts as any).SVGElement.prototype.animate;
  (Highcharts as any).SVGElement.prototype.animate = function () {
    // Skip animation completely
    return this;
  };
};

// Add PDFShift ready function that will be called when the page is ready
export const createPDFShiftReadyFunction = () => {
  // This will be used by PDFShift's wait_for parameter
  window.pdfshiftReady = function () {
    console.log("pdfshiftReady check: found " + document.querySelectorAll('.highcharts-container').length + " charts");
    // Return true when all charts are fully rendered
    return document.querySelectorAll('.highcharts-container').length > 0;
  };
}; 