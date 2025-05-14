import Highcharts from 'highcharts';

// Add PDFShift ready function to window
declare global {
  interface Window {
    pdfshiftReady: () => boolean;
  }
}

// Configure Highcharts globally for PDF generation
export const configurePDFShiftHighcharts = () => {
  console.log("Applying simplified Highcharts PDF configuration");

  (Highcharts as any).setOptions({
    chart: {
      animation: false, // Disable chart-level animations
    },
    plotOptions: {
      series: {
        animation: false, // Disable series-level animations
        // Remove other aggressive settings like states, enableMouseTracking, shadow, dataLabels animation
      },
      pie: {
        animation: false,
      },
      column: {
        animation: false,
      },
      scatter: {
        animation: false,
      }
      // We are not disabling states or mouse tracking here to see if it fixes rendering
    },
    // We are not overriding SVGElement.prototype.animate here for now
  });

  // It's important that charts redraw if they are already on the page
  // when this config is applied. However, Highcharts.charts might not be populated yet.
  // This is safer to do in the component's useEffect or after chart creation if needed.
  /*
  if (Highcharts.charts) {
    Highcharts.charts.forEach(chart => {
      if (chart) {
        chart.redraw(false);
      }
    });
  }
  */
};

// Add PDFShift ready function that will be called when the page is ready
export const createPDFShiftReadyFunction = () => {
  window.pdfshiftReady = function () {
    console.log("pdfshiftReady check: found " + document.querySelectorAll('.highcharts-container').length + " charts");
    return document.querySelectorAll('.highcharts-container').length > 0;
  };
}; 