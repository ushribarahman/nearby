import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const REDIRECT_SECONDS = 5;

function PurchaseSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { eventTitle, quantity, total } = location.state || {};

  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate("/", { replace: true });
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#01BBC1]/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#01BBC1"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Purchase Successful!
        </h1>

        {eventTitle ? (
          <p className="mt-3 text-gray-500">
            Your ticket{quantity > 1 ? "s" : ""} for{" "}
            <span className="font-medium text-gray-900">{eventTitle}</span>{" "}
            {quantity > 1 ? `(x${quantity}) ` : ""}
            {total ? `— ${total} BDT ` : ""}
            {total === 0 ? "(Free) " : ""}
            {"has"} been confirmed.
          </p>
        ) : (
          <p className="mt-3 text-gray-500">
            Your purchase has been confirmed.
          </p>
        )}

        <p className="mt-6 text-sm text-gray-400">
          Redirecting you to the home page in {secondsLeft}...
        </p>

        <Link
          to="/"
          className="mt-6 inline-block w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Go to Home Now
        </Link>
      </div>
    </div>
  );
}

export default PurchaseSuccess;
