import React from 'react';
import MemberAccessPieChart from './MemberAccessPieChart';
import MemberAccessMap from './MemberAccessMap';
import DistanceToCareSummary from './DistanceToCareSummary';
import DistanceToCarePlot from './DistanceToCarePlot';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  // Dummy data for the dashboard
  const memberData = {
    totalMembers: 14803,
    providers: 984,
    membersWithAccess: 14326,
    membersWithoutAccess: 477,
    percentageWithAccess: 96.7,
    percentageWithoutAccess: 3.2
  };

  const distanceData = {
    closest: { average: 13.5, maximum: 55.1, minimum: 0.1 },
    second: { average: 22.4, maximum: 63.1, minimum: 0.2 },
    third: { average: 27.1, maximum: 65.5, minimum: 1.5 }
  };

  const networkDetails = {
    networkName: 'Empower Access Health',
    memberFile: 'Arkansas Members',
    accessStandard: 'ACCESSHEALTH_ARKANSAS_MED'
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Overall Access</h1>
        <div className="stats-container">
          <div className="stat-box">
            <span className="stat-icon">👥</span>
            <span className="stat-value">{memberData.totalMembers}</span>
            <span className="stat-label">Members</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">🏥</span>
            <span className="stat-value">{memberData.providers}</span>
            <span className="stat-label">Providers</span>
          </div>
        </div>
      </header>

      <div className="section-header">
        <h2>MEMBERS WITH AND WITHOUT ACCESS</h2>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-column">
          <MemberAccessPieChart 
            membersWithAccess={memberData.membersWithAccess} 
            membersWithoutAccess={memberData.membersWithoutAccess}
            percentageWithAccess={memberData.percentageWithAccess}
            percentageWithoutAccess={memberData.percentageWithoutAccess}
          />
        </div>
        <div className="dashboard-column map-column">
          <MemberAccessMap />
        </div>
      </div>

      <div className="section-header">
        <h2>DISTANCE TO CARE</h2>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-column">
          <DistanceToCareSummary distanceData={distanceData} />
        </div>
        <div className="dashboard-column">
          <DistanceToCarePlot distanceData={distanceData} />
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-column">
          <div className="network-details">
            <h3>NETWORK DETAILS</h3>
            <div className="detail-item">
              <span className="detail-label">Network</span>
              <span className="detail-value">{networkDetails.networkName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Member File</span>
              <span className="detail-value">{networkDetails.memberFile}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Access Standard</span>
              <span className="detail-value">{networkDetails.accessStandard}</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-column">
          <div className="plot-key">
            <h3>BOX PLOT KEY</h3>
            <div className="box-plot-key">
              <div className="key-row">
                <span className="key-label">Max</span>
                <div className="key-line-top"></div>
              </div>
              <div className="key-row">
                <span className="key-label">76-100th percentile</span>
                <div className="key-box-top"></div>
              </div>
              <div className="key-row">
                <span className="key-label">51-75th</span>
                <div className="key-box-middle"></div>
              </div>
              <div className="key-row">
                <span className="key-label">Median</span>
                <div className="key-median"></div>
              </div>
              <div className="key-row">
                <span className="key-label">26-75th</span>
                <div className="key-box-middle"></div>
              </div>
              <div className="key-row">
                <span className="key-label">1-25th percentile</span>
                <div className="key-box-bottom"></div>
              </div>
              <div className="key-row">
                <span className="key-label">Min</span>
                <div className="key-line-bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 