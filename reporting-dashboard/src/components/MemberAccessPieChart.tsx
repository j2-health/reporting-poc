import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './MemberAccessPieChart.css';

interface MemberAccessPieChartProps {
  membersWithAccess: number;
  membersWithoutAccess: number;
  percentageWithAccess: number;
  percentageWithoutAccess: number;
}

const MemberAccessPieChart: React.FC<MemberAccessPieChartProps> = ({
  membersWithAccess,
  membersWithoutAccess,
  percentageWithAccess,
  percentageWithoutAccess
}) => {
  const options = {
    chart: {
      type: 'pie',
      height: 300
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        innerSize: '60%',
        colors: ['#192f59', '#e74c3c']
      }
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: {
        fontSize: '14px'
      },
      labelFormatter: function(): string {
        // @ts-ignore
        const percentage = this.percentage ? this.percentage.toFixed(1) : 0;
        // @ts-ignore
        return `${this.name}: ${percentage}%`;
      }
    },
    series: [{
      name: 'Members',
      type: 'pie',
      data: [
        {
          name: 'Members with Access',
          y: membersWithAccess,
          custom: {
            percentage: percentageWithAccess
          }
        },
        {
          name: 'Members without Access',
          y: membersWithoutAccess,
          custom: {
            percentage: percentageWithoutAccess
          }
        }
      ]
    }],
    credits: {
      enabled: false
    }
  };

  return (
    <div className="pie-chart-container">
      <div className="chart-header">
        <div className="member-stats">
          <div className="member-stat-item">
            <span className="member-stat-label">Members with Access</span>
            <span className="member-stat-value">{membersWithAccess} ({percentageWithAccess}%)</span>
          </div>
          <div className="member-stat-item">
            <span className="member-stat-label">Members without Access</span>
            <span className="member-stat-value">{membersWithoutAccess} ({percentageWithoutAccess}%)</span>
          </div>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default MemberAccessPieChart; 