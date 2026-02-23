import React from 'react';

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className = "" }) => {
  return (
    <div className={`w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group ${className}`}>
      {/* Overlay to darken map initially */}
      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>

      <iframe
        width="100%"
        height="100%"
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=137A%20Samad%20Vurgun,%20Baku&t=&z=15&ie=UTF8&iwloc=&output=embed"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        title="Varan Colleges Location"
        className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;
