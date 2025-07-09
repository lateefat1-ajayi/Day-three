import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-purple-900 flex items-center justify-center px-4">
      <div className="text-center text-white space-y-4">
        <h1 className="text-4xl font-bold">Convertly 💱</h1>
        <h4 className="text-lg w-140">Need to convert from dollars fast? This app helps you switch from <span className="font-bold">USD</span> to other currencies in seconds.</h4>
        <Link
          to="/convert"
          className="inline-block bg-white text-purple-800 px-6 py-3 rounded shadow hover:bg-purple-100 transition hover:-translate-y-0.5"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;