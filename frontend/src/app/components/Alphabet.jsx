"use client";
import { useEffect, useState } from "react";

export default function Alphabet() {
  const [sentence, setSentence] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0); // Key to trigger re-render

  const items = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function getRandomItem() {
    return items[Math.floor(Math.random() * items.length)];
  }

  function handleNextLetter() {
    setInput(""); // Clear input first
    setScore((prevScore) => prevScore + 1); // Increment score
    setKey((prevKey) => prevKey + 1); // Force re-render
  }

  function handleStartOver() {
    setInput("");
    setScore(0);
    setKey((prevKey) => prevKey + 1);
  }

  useEffect(() => {
    setSentence(getRandomItem()); // Generate a new letter whenever key changes
    setInput(""); // Extra safety to ensure input resets
  }, [key]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <p className="mb-4 text-4xl text-center font-semibold text-gray-800">
          Score: {score}
        </p>
        <p className="mb-4 text-8xl text-center font-semibold text-gray-800">
          {sentence}
        </p>
        <input
          key={key} // Ensures re-render
          type="text"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key.toUpperCase() === sentence) {
              handleNextLetter();
            }
          }}
          autoFocus // Automatically focus on the input field
        />
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
