import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './MemberAccessMap.css';

// Import the Arkansas map data
import usStateData from '../data/us-ar-all';

// Import necessary Highcharts modules directly
import highchartsMap from 'highcharts/modules/map';

// Initialize the modules
if (typeof Highcharts === 'object') {
  highchartsMap(Highcharts);
}

interface LocationPoint {
  lat: number;
  lon: number;
  withAccess: boolean;
}

// Dummy data for member locations
const generateRandomPoints = (numPoints: number, withAccess: boolean): LocationPoint[] => {
  const points: LocationPoint[] = [];
  const arkansasLat = { min: 33.0, max: 36.5 };
  const arkansasLon = { min: -94.6, max: -89.6 };

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
  // Generate dummy data for the map
  const membersWithAccess = generateRandomPoints(500, true);
  const membersWithoutAccess = generateRandomPoints(20, false);

  // Convert to simplified format
  const withAccessData = membersWithAccess.map(point => ({
    geometry: {
      type: 'Point',
      coordinates: [point.lon, point.lat]
    },
    properties: {
      name: 'Member with Access'
    }
  }));

  const withoutAccessData = membersWithoutAccess.map(point => ({
    geometry: {
      type: 'Point',
      coordinates: [point.lon, point.lat]
    },
    properties: {
      name: 'Member without Access'
    }
  }));

  // Chart options
  const options = {
    chart: {
      map: usStateData,
      height: 400
    },
    title: {
      text: ''
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.properties.name}'
    },
    legend: {
      enabled: true,
      layout: 'horizontal',
      verticalAlign: 'bottom',
      align: 'center'
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true
        }
      }
    },
    series: [
      {
        // Base Arkansas map
        type: 'map',
        name: 'Arkansas',
        data: [],
        borderColor: '#FFFFFF',
        nullColor: '#F8F8F8',
        showInLegend: false
      },
      {
        // Members with access
        type: 'mappoint',
        name: 'With',
        color: '#192f59',
        data: withAccessData,
        marker: {
          symbol: 'circle',
          radius: 3
        }
      },
      {
        // Members without access
        type: 'mappoint',
        name: 'Without',
        color: '#e74c3c',
        data: withoutAccessData,
        marker: {
          symbol: 'triangle',
          radius: 5
        }
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
        constructorType={'mapChart'}
      />
    </div>
  );
};

export default MemberAccessMap; 