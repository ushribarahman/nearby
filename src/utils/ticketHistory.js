// There's no real Orders/Tickets backend yet, so purchase history is
// tracked client-side in localStorage instead of being invented as
// static mock data. It's scoped per-account by email so it actually
// reflects what a specific logged-in user has bought (unlike the old
// organizer profile's disconnected localStorage blob), and it's
// populated for real by BuyTicket.jsx at the moment of "purchase".
const STORAGE_PREFIX = "nearby:ticketHistory:";

function getTicketHistory(email) {
  if (!email) return [];

  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${email}`);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read ticket history:", error);
    return [];
  }
}

function addTicketPurchase(email, purchase) {
  if (!email) return;

  try {
    const current = getTicketHistory(email);

    const updated = [
      {
        id: `${purchase.eventId}-${Date.now()}`,
        purchasedAt: new Date().toISOString(),
        ...purchase,
      },
      ...current,
    ];

    localStorage.setItem(
      `${STORAGE_PREFIX}${email}`,
      JSON.stringify(updated)
    );
  } catch (error) {
    console.error("Failed to save ticket purchase:", error);
  }
}

export { getTicketHistory, addTicketPurchase };
