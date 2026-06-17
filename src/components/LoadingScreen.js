import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ isLoading }) {
  const [visible, setVisible] = useState(isLoading);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFading(true);
      const timer = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`loading-overlay${fading ? ' loading-overlay--fade' : ''}`}
      role="status"
      aria-label="Loading Epic Beer Run"
    >
      <div className="loading-content">
        <h2 className="loading-title">EPIC BEER RUN</h2>
        <svg
          viewBox="0 0 100 145"
          width="110"
          height="145"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="mug-interior">
              <rect x="12" y="23" width="58" height="99" />
            </clipPath>
          </defs>
          <rect
            x="10" y="20" width="62" height="105"
            rx="5" fill="none"
            stroke="#e0e0e0" strokeWidth="3"
          />
          <path
            d="M72 45 Q92 45 92 72 Q92 99 72 99"
            fill="none" stroke="#e0e0e0" strokeWidth="3"
          />
          <rect
            className="beer-liquid"
            x="12" y="23" width="58" height="99"
            fill="#f5a623"
            clipPath="url(#mug-interior)"
          />
          <g className="beer-foam" clipPath="url(#mug-interior)">
            <ellipse cx="24" cy="27" rx="9" ry="7" fill="rgba(255,255,255,0.92)" />
            <ellipse cx="41" cy="24" rx="11" ry="8" fill="rgba(255,255,255,0.92)" />
            <ellipse cx="58" cy="27" rx="9" ry="7" fill="rgba(255,255,255,0.92)" />
          </g>
        </svg>
        <p className="loading-text">Loading breweries...</p>
      </div>
    </div>
  );
}
