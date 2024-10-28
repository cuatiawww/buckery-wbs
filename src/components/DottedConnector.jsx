// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const DottedConnector = ({ from, to }) => {
  return (
    <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
      <line
        // eslint-disable-next-line react/prop-types
        x1={from.x}
        // eslint-disable-next-line react/prop-types
        y1={from.y}
        // eslint-disable-next-line react/prop-types
        x2={to.x}
        // eslint-disable-next-line react/prop-types
        y2={to.y}
        stroke="gray"
        strokeWidth="2"
        strokeDasharray="4"
      />
    </svg>
  );
};

export default DottedConnector;