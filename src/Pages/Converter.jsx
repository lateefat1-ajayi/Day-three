import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Converter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const currencyOptions = ["USD", "NGN", "EUR", "GBP", "KES", "CAD"];

  const handleConvert = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return alert("Enter a valid amount");

    if (fromCurrency !== "USD") {
      alert("Free tier only supports conversions *from* USD.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.currencylayer.com/live?access_key=cb8006ff58163a118adeabfc0e7be569`
      );
      const data = await res.json();
    //   console.log("API Response:", data);

      if (data.success && data.quotes) {
        const rateKey = `USD${toCurrency}`;
        const rate = data.quotes[rateKey];

        if (!rate) {
          alert("Currency pair not supported.");
          return;
        }

        const result = amt * rate;

        navigate("/result", {
          state: {
            amount: amt,
            fromCurrency,
            toCurrency,
            rate,
            result,
            date: new Date(data.timestamp * 1000).toLocaleDateString(),
          },
        });
      } else {
        alert("Conversion failed. Try again.");
      }
    } catch (err) {
      alert("Error fetching conversion rate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-950 text-white flex items-center justify-center px-4">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-purple-900">
          Currency Converter
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded text-center"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex justify-between gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              {currencyOptions.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-semibold">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              {currencyOptions.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleConvert}
          disabled={loading}
          className={`w-full py-2 rounded transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {loading ? "Converting..." : "Convert"}
        </button>
      </div>
    </div>
  );
};

export default Converter;
