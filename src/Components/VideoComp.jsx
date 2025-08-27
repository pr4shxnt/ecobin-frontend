import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  RotateCcw,
} from "lucide-react";
import heroVideo from "../assets/Untitled video - Made with Clipchamp.mp4";

const VideoComp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setShowControls(false);
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;

    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 flex gap-2 items-center justify-center">
            See ECOBIN in
            <span className="text-[#3a563f] block">Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Watch how our intelligent waste management system transforms the way
            you handle recycling and sustainability.
          </p>
        </div>

        <div className="flex items-center justify-center">
          {/* Video Section */}
          <div className="relative">
            <div
              ref={containerRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-black"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => {
                if (isPlaying) {
                  controlsTimeoutRef.current = setTimeout(() => {
                    setShowControls(false);
                  }, 2000);
                }
              }}
            >
              <video
                ref={videoRef}
                className="w-full h-[400px] lg:h-[500px] object-cover"
                poster={
                  videoRef.current?.currentTime === 0 ? undefined : undefined
                }
              >
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Custom Controls Overlay */}
              <div
                className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-gray-800" />
                  ) : (
                    <Play className="w-8 h-8 text-gray-800 ml-1" />
                  )}
                </button>

                {/* Bottom Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  {/* Progress Bar */}
                  <div
                    className="w-full h-2 bg-white/30 rounded-full cursor-pointer mb-4"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-100"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => skipTime(-10)}
                        className="hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        <SkipBack className="w-5 h-5" />
                      </button>

                      <button
                        onClick={togglePlay}
                        className="hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>

                      <button
                        onClick={() => skipTime(10)}
                        className="hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        <SkipForward className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            setCurrentTime(0);
                          }
                        }}
                        className="hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>

                      <button
                        onClick={toggleMute}
                        className="hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>

                      <button
                        onClick={toggleFullscreen}
                        className="hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Stats */}
          </div>

          {/* Features Section */}
        </div>

        {/* Additional Info */}
      </div>
    </div>
  );
};

export default VideoComp;
