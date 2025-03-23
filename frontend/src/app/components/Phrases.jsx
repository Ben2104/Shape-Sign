"use client";
import { useEffect, useState } from "react";

export default function Phrases() {
    const [word, setWord] = useState("");
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0);
    const [key, setKey] = useState(0); // Used to force re-render

    const items = ['I', 'I Love You', 'Yes', 'can', 'drink', 'eat', 'good', 'help',
        'hungry', 'morning', 'my', 'name', 'no', 'please', 'sorry',
        'thanks', 'thirsty', 'yes', 'you', "you're welcome"];

    function getRandomWord() {
        return items[Math.floor(Math.random() * items.length)];
    }

    function handleNextPhrase() {
        setScore((prevScore) => prevScore + 1); // Increase score
        setKey((prevKey) => prevKey + 1); // Force re-render
    }

    function handleStartOver() {
        setScore(0);
        setKey((prevKey) => prevKey + 1);
    }

    useEffect(() => {
        setWord(getRandomWord());
        setInput(""); // Clear input when word changes
    }, [key]);

    useEffect(() => {
        const trimmedInput = input.trim().toLowerCase();
        if (trimmedInput === "") return;

        if (trimmedInput === word.toLowerCase()) {
            handleNextPhrase(); // Move to the next phrase when correct
        } else {
            setInput(""); // Reset input if incorrect
        }
    }, [input]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                <p className="mb-4 text-4xl text-center font-semibold text-gray-800">
                    Score: {score}
                </p>
                <p className="mb-4 text-5xl text-center font-semibold text-gray-800">
                    {word}
                </p>
                <input
                    key={key} // Ensures re-render
                    type="text"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
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
