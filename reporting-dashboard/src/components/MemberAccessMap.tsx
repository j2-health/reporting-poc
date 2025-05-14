import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './MemberAccessMap.css';

interface LocationPoint {
  lat: number;
  lon: number;
  withAccess: boolean;
}

// Dummy data for member locations
const generateRandomPoints = (numPoints: number, withAccess: boolean): LocationPoint[] => {
  const points: LocationPoint[] = [];
  // Arkansas bounds
  const arkansasLat = { min: 33.9, max: 36.3 };
  const arkansasLon = { min: -94.4, max: -90.2 };

  for (let i = 0; i < numPoints; i++) {
    const lat = arkansasLat.min + Math.random() * (arkansasLat.max - arkansasLat.min);
    const lon = arkansasLon.min + Math.random() * (arkansasLon.max - arkansasLon.min);
    points.push({
      lat,
      lon,
      withAccess
    });
  }
  return points;
};

const MemberAccessMap: React.FC = () => {
  // Create a ref for the chart
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  
  // Effect to disable animations after the chart is rendered
  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      console.log("Directly disabling animations on map chart");
      
      // Force any animations to complete immediately
      chartRef.current.chart.renderer.globalAnimation = false;
      
      // Redraw without animations
      chartRef.current.chart.redraw(false);
    }
  }, []);
  
  // Generate dummy data for the map
  const membersWithAccess = generateRandomPoints(300, true);
  const membersWithoutAccess = generateRandomPoints(15, false);

  // Prepare the data for scatter points
  const withAccessPoints = membersWithAccess.map(point => ({
    x: point.lon,
    y: point.lat,
    marker: {
      symbol: 'circle',
      radius: 3,
      fillColor: '#192f59',
      lineWidth: 0
    },
    name: 'Member with Access'
  }));

  const withoutAccessPoints = membersWithoutAccess.map(point => ({
    x: point.lon,
    y: point.lat,
    marker: {
      symbol: 'triangle',
      radius: 5,
      fillColor: '#e74c3c',
      lineWidth: 0
    },
    name: 'Member without Access'
  }));

  // Simple outline of Arkansas as a polygon
  const arkansasOutline = {
    type: 'polygon',
    name: 'Arkansas',
    data: [
      [-94.617919, 36.499602],
      [-94.616028, 35.389603],
      [-94.430026, 35.387039],
      [-94.007843, 35.381405],
      [-93.952951, 35.302856],
      [-93.821251, 35.302856],
      [-93.826886, 35.137821],
      [-93.628143, 35.127552],
      [-93.579498, 35.069075],
      [-93.537677, 35.020431],
      [-93.486238, 35.003498],
      [-93.507114, 34.929394],
      [-93.516685, 34.851544],
      [-93.447639, 34.747993],
      [-93.447639, 34.666809],
      [-93.409531, 34.573494],
      [-93.388656, 34.544556],
      [-93.311504, 34.456749],
      [-93.212953, 34.448978],
      [-93.208016, 34.404564],
      [-93.056932, 34.404564],
      [-92.984421, 34.455150],
      [-92.943298, 34.450214],
      [-92.882126, 34.505104],
      [-92.867786, 34.539778],
      [-92.852747, 34.661873],
      [-92.825408, 34.748691],
      [-92.774667, 34.763032],
      [-92.719078, 34.696579],
      [-92.719078, 34.581188],
      [-92.669037, 34.514037],
      [-92.639400, 34.454452],
      [-92.639400, 34.320652],
      [-92.584510, 34.276936],
      [-92.548239, 34.141539],
      [-92.354556, 34.088347],
      [-92.066467, 34.076408],
      [-91.983688, 34.004597],
      [-91.819351, 33.860812],
      [-91.490113, 33.766798],
      [-91.178864, 33.766798],
      [-91.117691, 33.867446],
      [-91.143433, 33.947932],
      [-91.114494, 33.995878],
      [-91.080519, 34.138975],
      [-90.944423, 34.294656],
      [-90.918681, 34.344697],
      [-90.857508, 34.378671],
      [-90.773132, 34.546457],
      [-90.735024, 34.756462],
      [-90.585638, 34.878151],
      [-90.526062, 34.848515],
      [-90.465589, 34.871988],
      [-90.422571, 34.831284],
      [-90.377458, 34.869791],
      [-90.286739, 34.847118],
      [-90.212635, 34.878151],
      [-90.151462, 34.908486],
      [-90.064354, 34.995594],
      [-90.130807, 35.049786],
      [-90.114171, 35.148337],
      [-90.068161, 35.254483],
      [-90.041720, 35.284119],
      [-90.025084, 35.409214],
      [-89.978375, 35.462406],
      [-89.956801, 35.564361],
      [-89.932655, 35.672104],
      [-89.920017, 35.787552],
      [-89.952394, 35.880169],
      [-89.992399, 35.996315],
      [-90.030507, 36.115059],
      [-90.109055, 36.189861],
      [-90.114689, 36.272640],
      [-90.212541, 36.349792],
      [-90.254362, 36.421603],
      [-90.283300, 36.499453],
      [-94.617919, 36.499602]
    ],
    color: '#e9ecef',
    lineWidth: 1,
    lineColor: '#ced4da',
    enableMouseTracking: false,
    showInLegend: false
  };

  // Chart options
  const options = {
    chart: {
      type: 'scatter',
      height: 400,
      backgroundColor: 'transparent',
      animation: false,          // Explicitly disable animations
      reflow: false,             // Disable reflow animations
      events: {
        load: function() {
          console.log("Map chart loaded - no animations");
          // No redraw call
        }
      }
    },
    title: {
      text: ''
    },
    xAxis: {
      min: -94.7,
      max: -89.5,
      gridLineWidth: 0,
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      tickLength: 0,
      lineWidth: 0,
      animation: false        // Disable x-axis animations
    },
    yAxis: {
      min: 33.5,
      max: 36.7,
      gridLineWidth: 0,
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      tickLength: 0,
      lineWidth: 0,
      animation: false        // Disable y-axis animations
    },
    tooltip: {
      pointFormat: '{point.name}',
      animation: false        // Disable tooltip animations
    },
    legend: {
      enabled: true,
      layout: 'horizontal',
      verticalAlign: 'bottom',
      align: 'center',
      itemStyle: {
        fontWeight: 'normal'
      }
    },
    plotOptions: {
      scatter: {
        animation: false,     // Disable scatter plot animations
        marker: {
          radius: 3
        },
        enableMouseTracking: false
      },
      series: {
        animation: false,     // Disable all series animations
        states: {
          hover: {
            enabled: false    // Disable hover state
          }
        }
      }
    },
    series: [
      arkansasOutline,
      {
        name: 'With',
        data: withAccessPoints,
        color: '#192f59',
        zIndex: 2,
        animation: false      // Disable animation for this specific series
      },
      {
        name: 'Without',
        data: withoutAccessPoints,
        color: '#e74c3c',
        zIndex: 3,
        animation: false      // Disable animation for this specific series
      }
    ],
    credits: {
      enabled: false
    }
  };

  return (
    <div className="map-container">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};

export default MemberAccessMap; 