import React from 'react';

const Sponsors = () => {
  const sponsors = ["SteelSeries", "GHOST Energy", "DraftKings", "Nissan", "McDonald's", "Bithumb", "MoonPay"];
  
  // Duplicate array to ensure seamless looping
  const displaySponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="sponsors-marquee">
      <div className="marquee-content">
        {displaySponsors.map((name, index) => (
          <div key={index} className="sponsor-item">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
