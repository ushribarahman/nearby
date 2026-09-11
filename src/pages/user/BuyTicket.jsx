import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import events from "../../data/events";
import useAuth from "../../hooks/useAuth";
import { addTicketPurchase } from "../../utils/ticketHistory";

function BuyTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const event = events.find((e) => e.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Event not found
        </h1>
        <p className="mt-2 text-gray-500">
          The event you're trying to buy a ticket for doesn't exist.
        </p>
        <Link
          to="/events"
          className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const isFree = !event.ticketPrice || event.ticketPrice === 0;
  const total = isFree ? 0 : event.ticketPrice * quantity;

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(10, current + 1));
  };

  const handleProceed = () => {
    // No real order/payment backend yet — this is a dummy-data flow.
    // The purchase itself is recorded to this account's ticket
    // history (see utils/ticketHistory.js) so "My Tickets" on the
    // profile page reflects something real instead of more mock data.
    addTicketPurchase(user?.email, {
      eventId: event.id,
      eventTitle: event.title,
      eventImage: event.image,
      eventDate: event.date,
      eventLocation: event.location,
      quantity,
      total,
    });

    navigate("/purchase-success", {
      state: {
        eventTitle: event.title,
        quantity,
        total,
      },
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 pb-16">
      <p className="mb-2 text-sm font-medium text-gray-500">
        <Link to={`/events/${event.id}`} className="hover:underline">
          ← Back to event
        </Link>
      </p>

      <h1 className="text-3xl font-bold text-gray-900">Buy Ticket</h1>
      <p className="mt-2 text-gray-500">
        Review your ticket details before checking out.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Event summary */}
        <div className="flex gap-4 border-b border-gray-100 p-6">
          <img
            src={event.image}
            alt={event.title}
            className="h-20 w-28 shrink-0 rounded-lg object-cover"
          />

          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-gray-900">
              {event.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {event.date} {event.time ? `• ${event.time}` : ""}
            </p>
            <p className="mt-1 text-sm text-gray-500">{event.location}</p>
          </div>
        </div>

        {/* Ticket selector */}
        <div className="p-6">
          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div>
              <p className="font-medium text-gray-900">
                General Admission
              </p>
              <p className="text-sm text-gray-500">
                {isFree ? "Free" : `${event.ticketPrice} BDT / ticket`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-lg font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>

              <span className="w-6 text-center font-medium text-gray-900">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity >= 10}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-lg font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
            <span className="text-gray-500">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              {isFree ? "Free" : `${total} BDT`}
            </span>
          </div>

          <button
            type="button"
            onClick={handleProceed}
            className="mt-6 w-full rounded-full bg-black py-4 text-base font-semibold text-white transition hover:bg-gray-800"
          >
            Proceed to Buy
          </button>

          <p className="mt-4 text-center text-xs text-gray-400">
            This is a demo checkout — no payment will actually be
            processed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuyTicket;
