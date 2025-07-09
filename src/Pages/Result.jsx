import { useLocation, Link } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-700 font-semibold">No conversion data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Conversion Result</h2>
        <p className="text-lg">
          <strong>{data.amount}</strong> {data.fromCurrency} =
        </p>
        <p className="text-3xl font-bold my-2 text-purple-900">
          {data.result.toFixed(2)} {data.toCurrency}
        </p>
        <p className="text-sm text-gray-600">Rate: 1 {data.fromCurrency} = {data.rate} {data.toCurrency}</p>
        <p className="text-xs text-gray-500 mt-1">Date: {data.date}</p>

        <Link
          to="/convert"
          className="mt-6 inline-block bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
        >
          Convert Again
        </Link>
      </div>
    </div>
  );
};

export default Result;