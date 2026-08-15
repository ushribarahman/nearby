import Card from "../../components/common/Card";
import Filter from "../../components/common/Filter";
import Search from "../../components/common/Search";
import CategoryFilter from "../../components/common/CategoryFilter";
import events from "../../data/Events";
import EventHero from "../../components/events"

function Events() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <div className="relative mb-8 overflow-hidden rounded-2xl">
        <EventHero />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-50 p-3">

        <Filter />

        <div className="flex items-center gap-3">
          <div className="w-48">
            <Search />
          </div>

          <CategoryFilter />
        </div>

      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} data={event} />
        ))}
      </div>

    </div>
  );
}

export default Events;