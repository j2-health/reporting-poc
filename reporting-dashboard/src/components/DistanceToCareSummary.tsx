import React from 'react';
import './DistanceToCareSummary.css';

interface DistanceData {
  average: number;
  maximum: number;
  minimum: number;
}

interface DistanceToCareSummaryProps {
  distanceData: {
    closest: DistanceData;
    second: DistanceData;
    third: DistanceData;
  }
}

const DistanceToCareSummary: React.FC<DistanceToCareSummaryProps> = ({ distanceData }) => {
  return (
    <div className="distance-summary-container">
      <table className="distance-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Average</th>
            <th>Maximum</th>
            <th>Minimum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="provider-cell">Closest</td>
            <td>{distanceData.closest.average} mi</td>
            <td>{distanceData.closest.maximum} mi</td>
            <td>{distanceData.closest.minimum} mi</td>
          </tr>
          <tr>
            <td className="provider-cell">2nd</td>
            <td>{distanceData.second.average} mi</td>
            <td>{distanceData.second.maximum} mi</td>
            <td>{distanceData.second.minimum} mi</td>
          </tr>
          <tr>
            <td className="provider-cell">3rd</td>
            <td>{distanceData.third.average} mi</td>
            <td>{distanceData.third.maximum} mi</td>
            <td>{distanceData.third.minimum} mi</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DistanceToCareSummary; 