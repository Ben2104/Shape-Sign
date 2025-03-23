"use client"
import { useState } from "react";
import ShapeMatchingGame from "./components/ShapeMatchingGame";
import MusicDisplay from "./pages/MusicDisplay";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import ShapeMatchingDisplay from "./pages/ShapeMatchingDisplay";
// import Alphabet from "./components/Alphabet"
// import Phrases from "./components/Phrases"
import SignLanguageDisplay from "./pages/SignLanguageDisplay";
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="pt-24">
        <Home />
        <About />
        <MusicDisplay />
        <ShapeMatchingDisplay />
        <SignLanguageDisplay />
      </div>
    </div>
  );
}
