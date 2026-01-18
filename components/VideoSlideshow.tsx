import React from "react";
import Perform from "./assets/Perform.mp4";

const VideoSlideshow: React.FC = () => {
  return (
    <section
      id="video-slideshow"
      className="py-24 md:py-32 bg-white/5 text-center"
    >
      {/* Section Heading */}
      <h2 className="text-4xl md:text-5xl font-serif font-semibold text-brand-gold mb-6 tracking-wide">
        Live Performance Highlights
      </h2>

      <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg">
        A glimpse into the soulful performances that bring classical music to
        life on stage.
      </p>

      {/* Video Container */}
      <div className="aspect-video max-w-4xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {/* Subtle vignette overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />

          <video
            src={Perform}
            controls
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSlideshow;
