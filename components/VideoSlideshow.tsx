import React from "react";
import Perform from "./assets/Perform.mp4";
import Poster from "./assets/perform-poster.jpg";

const VideoSlideshow: React.FC = () => {
  return (
    <section className="py-16 bg-black text-center" id="video-slideshow">
      <h2 className="text-4xl font-serif font-bold text-brand-gold mb-8">
        Live Performance Highlights
      </h2>

      <div className="max-w-4xl mx-auto px-4">
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-brand-gold shadow-2xl">
          <video
            src={Perform}
            controls
            preload="metadata"
            playsInline
            poster={Poster}
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSlideshow;
