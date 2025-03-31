"use client";
import { useEffect, useState } from "react";

export default function Alphabet() {
  const [sentence, setSentence] = useState("");
  const [score, setScore] = useState(0);

  const items = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function getRandomItem() {
    return items[Math.floor(Math.random() * items.length)];
  }

  function handleNextLetter() {
    setScore((prevScore) => prevScore + 1); // Increment score
    setSentence(getRandomItem()); // Generate a new random letter
  }

  function handleStartOver() {
    setScore(0); // Reset score
    setSentence(getRandomItem()); // Generate a new random letter
  }

  useEffect(() => {
    // Generate the first random letter only once when the component mounts
    setSentence(getRandomItem());
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toUpperCase() === sentence) {
        handleNextLetter();
      }
    };

    // Add a keydown event listener to the window
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [sentence]); // Dependency array includes `sentence`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <p className="mb-4 text-4xl text-center font-semibold text-gray-800">
          Score: {score}
        </p>
        <p className="mb-4 text-8xl text-center font-semibold text-gray-800">
          {sentence}
        </p>
        <div className="mt-4 text-center">
          <button
            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleStartOver}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}