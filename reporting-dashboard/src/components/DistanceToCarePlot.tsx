import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './DistanceToCarePlot.css';

// Import necessary Highcharts modules
import HighchartsMore from 'highcharts/highcharts-more';

// Initialize the modules
if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts);
}

interface DistanceData {
  average: number;
  maximum: number;
  minimum: number;
}

interface DistanceToCarePlotProps {
  distanceData: {
    closest: DistanceData;
    second: DistanceData;
    third: DistanceData;
  }
}

const DistanceToCarePlot: React.FC<DistanceToCarePlotProps> = ({ distanceData }) => {
  // Instead of box plot, we'll use a simpler column chart for demonstration
  const options = {
    chart: {
      type: 'column',
      height: 300
    },
    title: {
      text: 'Distance to Closest Providers',
      style: {
        fontSize: '14px'
      }
    },
    xAxis: {
      categories: ['Closest', '2nd', '3rd'],
      title: {
        text: null
      }
    },
    yAxis: {
      title: {
        text: 'Distance (mi)'
      },
      min: 0
    },
    tooltip: {
      formatter: function() {
        const point = this as any;
        return `<b>${point.key}</b><br/>
                Distance: ${point.y} mi`;
      }
    },
    series: [
      {
        name: 'Average',
        data: [
          distanceData.closest.average,
          distanceData.second.average,
          distanceData.third.average
        ],
        color: '#4682b4'
      },
      {
        name: 'Maximum',
        data: [
          distanceData.closest.maximum,
          distanceData.second.maximum,
          distanceData.third.maximum
        ],
        color: '#e74c3c'
      },
      {
        name: 'Minimum',
        data: [
          distanceData.closest.minimum,
          distanceData.second.minimum,
          distanceData.third.minimum
        ],
        color: '#2ecc71'
      }
    ],
    credits: {
      enabled: false
    }
  };

  return (
    <div className="boxplot-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default DistanceToCarePlot; 