"use client"
import React, { useRef, useState, useEffect } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle spacebar press to toggle music
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent the default spacebar action (scrolling the page)
        toggleMusic();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isPlaying]); // Add isPlaying as a dependency to ensure the state is synced

  return (
    <div className="bg-gray-100 p-4 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        {/* Album Cover */}
        <img
          src="/Carryon.jpg"
          alt="idk - Highvyn, Taylor Shin"
          className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg shadow-teal-50"
        />
        {/* Song Title */}
        <h2 className="text-xl font-semibold text-center text-black">Carry On</h2>
        {/* Artist Name */}
        <p className="text-gray-600 text-sm text-center">Anna Yvette, Lost Sky</p>
        {/* Music Controls */}
            <div className="mt-6 flex justify-center items-center">
              <button
                className={`p-3 rounded-full focus:outline-none transition-colors duration-300 ${
                  isPlaying ? "bg-gray-400 hover:bg-gray-5  00" : "bg-gray-400 hover:bg-gray-500"
                }`}
                onClick={toggleMusic}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
            </div>
            
            {/* Audio Element */}
        <audio ref={audioRef} src="/AnnaYvette,LostSky-CarryOn[NCS Release].mp3" />
      </div>
    </div>
  );
}
