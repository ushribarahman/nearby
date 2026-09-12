import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useEvents from "../../hooks/useEvents";
import useAuth from "../../hooks/useAuth";
import { addTicketPurchase } from "../../utils/ticketHistory";

function BuyTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { event, loading, error } = useEvents(id);

  const [quantities, setQuantities] = useState({});
  if (loading) return <p className="p-8">Loading event...</p>;
  if (error) return <p role="alert" className="p-8">{error}</p>;

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

  const tickets = event.tickets || [];
  const items = tickets.map((ticket) => ({
    ticketId: ticket.id,
    ticketName: ticket.name,
    unitPrice: ticket.price,
    quantity: quantities[ticket.id] || 0,
  })).filter((item) => item.quantity > 0);
  const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const changeQuantity = (ticketId, delta) => {
    setQuantities((current) => {
      const count = tickets.reduce((sum, ticket) => sum + (current[ticket.id] || 0), 0);
      if (delta > 0 && count >= 10) return current;
      return { ...current, [ticketId]: Math.max(0, (current[ticketId] || 0) + delta) };
    });
  };

  const handleProceed = () => {
    if (quantity === 0 || quantity > 10) return;
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
      items,
      quantity,
      total,
    });

    navigate("/purchase-success", {
      state: {
        eventTitle: event.title,
        items,
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
          <p className="mb-4 text-sm text-gray-500" aria-live="polite">
            {quantity} / 10 tickets selected. Maximum 10 tickets across all types.
          </p>
          {tickets.length === 0 && <p role="status" className="mb-4 text-gray-500">No tickets available for this event.</p>}
          <div className="space-y-3">
            {tickets.map((ticket) => {
              const count = quantities[ticket.id] || 0;
              return (
                <div key={ticket.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">{ticket.name}</p>
                    <p className="text-sm text-gray-500">{ticket.price === 0 ? "Free" : ticket.price + " BDT / ticket"}</p>
                    {ticket.description && <p className="mt-1 text-sm text-gray-500">{ticket.description}</p>}
                    {count > 0 && <p className="mt-2 text-sm font-medium">Subtotal: {ticket.price === 0 ? "Free" : ticket.price * count + " BDT"}</p>}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <button
                      type="button"
                      aria-label={"Remove one " + ticket.name + " ticket"}
                      onClick={() => changeQuantity(ticket.id, -1)}
                      disabled={count === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-lg font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >−</button>
                    <span className="w-6 text-center font-medium text-gray-900" aria-live="polite">{count}</span>
                    <button
                      type="button"
                      aria-label={"Add one " + ticket.name + " ticket"}
                      onClick={() => changeQuantity(ticket.id, 1)}
                      disabled={quantity >= 10}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-lg font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >+</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
            <span className="text-gray-500">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              {quantity === 0 ? "0 BDT" : total === 0 ? "Free" : `${total} BDT`}
            </span>
          </div>

          <button
            type="button"
            onClick={handleProceed}
            disabled={quantity === 0 || quantity > 10}
            className="mt-6 w-full rounded-full bg-black py-4 text-base font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
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
