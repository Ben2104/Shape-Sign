"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const ShapeMatchingDisplay = () => {
  // Images for the carousel
  const carouselImages = [
    { id: 1, src: "/Shape-matching1.png", alt: "Game Demo Image 1" }, //Insert images here after KIEN and SYN demo placeholders text for now
    { id: 2, src: "/Shape-matching2.png", alt: "Game Demo Image 2" },
    { id: 3, src: "/Shape-matching3.png", alt: "Game Demo Image 3" }
  ];

  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  return (
    <section id="shape-matching-display" className="py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-blue-600 mb-6">
          Shape Matching Game
        </h2>
        
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          Test our model through a fun and interactive matching shapes game! Drag and drop
          each shape to its corresponding label using your webcam to win!
        </p>
        
        {/* Carousel */}
        <div className="relative mb-12 bg-white rounded-xl shadow-lg p-4 mx-auto">
          <div className="overflow-hidden rounded-lg h-64 relative">
            {carouselImages.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-1000 flex justify-center items-center ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="max-w-full max-h-full w-auto h-auto object-contain" 
                />
              </div>
            ))}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 text-blue-600 transition-all"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 text-blue-600 transition-all"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {carouselImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Play Button For Users */}
        <Link href="/games/shape-matching" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg">
          Try It Out!
        </Link>
      </div>
    </section>
  );
};

export default ShapeMatchingDisplay;