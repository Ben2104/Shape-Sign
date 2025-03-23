

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <div className="text-center z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-right">
          Hi, We're <span className="text-black">CODER</span><span className="text-blue-500">BROS</span>
        </h1>

        <p className="text-gray-700 text-lg mb-8 max-w-lg mx-auto">
          "To write is human, to code is power."
        </p>
      </div>
    </section>
  );
};

export default Home;