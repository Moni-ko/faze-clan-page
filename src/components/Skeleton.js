import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type }) => {
  if (type === 'news') {
    return (
      <div className="skeleton-news-card">
        <div className="skeleton-image pulse"></div>
        <div className="skeleton-content">
          <div className="skeleton-date pulse"></div>
          <div className="skeleton-title pulse"></div>
          <div className="skeleton-desc pulse"></div>
          <div className="skeleton-footer pulse"></div>
        </div>
      </div>
    );
  }

  if (type === 'player') {
    return (
      <div className="skeleton-player-card">
        <div className="skeleton-avatar pulse"></div>
        <div className="skeleton-alias pulse"></div>
        <div className="skeleton-name pulse"></div>
        <div className="skeleton-stats pulse"></div>
      </div>
    );
  }

  return <div className="skeleton-box pulse"></div>;
};

export default Skeleton;
