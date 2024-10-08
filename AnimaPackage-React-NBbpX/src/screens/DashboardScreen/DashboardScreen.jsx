import React from "react";
import "./style.css";

export const DashboardScreen = () => {
  return (
    <div className="dashboard-screen">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="new-design">
            <div className="overlap-group">
              <img className="main-dashboard" alt="Main dashboard" src="/img/main-dashboard.png" />
              <img className="sidebar" alt="Sidebar" src="/img/sidebar.png" />
            </div>
          </div>
          <img className="iadm-logo" alt="Iadm logo" src="/img/iadm-logo-1.png" />
          <img className="GSA-star-mark-CMYK" alt="Gsa star mark CMYK" src="/img/gsa-star-mark-cmyk-6-1.png" />
        </div>
      </div>
    </div>
  );
};
