"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Alphabet from "../components/Alphabet";
import Phrases from "../components/Phrases";
import Link from "next/link";
import VideoPlayer from "../components/VideoPlayer";

const SignLanguagePage = () => {
  const [selectedOption, setSelectedOption] = useState("Alphabet");
  const [showImage, setShowImage] = useState(false); // Toggle state for image

  return (
    <div>
      <div className="pt-24 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">ASL Learning</h1>
          <Link
            href="/"
            className="bg-blue-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors fixed right-4"
          >
            Back
          </Link>
        </div>
        <VideoPlayer src="/ASL.mp4" />
        <div className="mb-8">
          <p className="text-gray-700 mb-4">
            Use your hand gesture to learn American Sign Language (ASL) through
            a fun and interactive experience.
          </p>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2 text-black">
              Instructions:
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-black">
              <li>
                The player will need to create a hand gesture that matches with
                the below letter or phrases.
              </li>
              <li>If you're having trouble, feel free to click on the 'Show Reference' button for assistance.
</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              selectedOption === "Alphabet"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedOption("Alphabet")}
          >
            Alphabet
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              selectedOption === "Phrases"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedOption("Phrases")}
          >
            Phrases
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {selectedOption === "Alphabet" && <Alphabet />}
          {selectedOption === "Phrases" && <Phrases />}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 fixed bottom-10 left-10"
        onClick={() => setShowImage(!showImage)}
      >
        {showImage ? "Hide Reference" : "Show Reference"}
      </button>

      {/* Sticky Image - Only for Alphabet */}
      {selectedOption === "Alphabet" && showImage && (
        <img
          src="https://www.startasl.com/wp-content/uploads/sign-language-alphabet.png" // Update with the correct path to your image
          alt="ASL Reference"
          className="fixed bottom-20 left-10 w-80 h-auto shadow-lg rounded-lg border border-gray-300 bg-white p-2"
        />
      )}

      {/* YouTube Video for Phrases */}
      {selectedOption === "Phrases" && showImage && (
        <div className="fixed bottom-20 left-10 w-80 h-auto shadow-lg rounded-lg border border-gray-300 bg-white p-2">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/2ydksrdlI9o" // Embed YouTube video
            title="ASL Phrases Reference"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SignLanguagePage;
