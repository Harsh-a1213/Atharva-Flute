import React from 'react';

const VideoSlideshow: React.FC = () => {
  return (
    <section className="py-10 bg-black text-center" id="video-slideshow">
      <h2 className="text-3xl text-white font-bold mb-6">Live Performance Highlights</h2>

      <div className="aspect-video max-w-4xl mx-auto px-4">
        <video
          src="/video/Perform.mp4"
          controls
          autoPlay
          loop
          muted
          className="w-full h-full rounded-xl shadow-2xl border border-brand-gold"
        />
      </div>
    </section>
  );
};

export default VideoSlideshow;
