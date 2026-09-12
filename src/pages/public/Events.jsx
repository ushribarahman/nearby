import Card from "../../components/common/Card";
import Filter from "../../components/common/Filter";
import Search from "../../components/common/Search";
import CategoryFilter from "../../components/common/CategoryFilter";
import useEvents from "../../hooks/useEvents";
import EventHero from "../../components/events/EventHero"

function Events() {
  const { events, loading, error } = useEvents();
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

        <EventHero />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-100 p-3">

        <Filter />

        <div className="flex items-center gap-3">
          <div className="w-48">
            <Search />
          </div>

          <CategoryFilter />
        </div>

      </div>
        {loading && <p>Loading events...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && events.length === 0 && <p>No approved events yet.</p>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} data={event} />
        ))}
        </div>
    </div>
  );
}

export default Events;
