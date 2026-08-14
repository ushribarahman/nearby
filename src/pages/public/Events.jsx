import Card from "../../components/common/Card";
import events from "../../data/Events";

function Events() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">

        {events.map((event) => (
          <Card
            key={event.id}
            data={event}
          />
        ))}

      </div>

    </div>
  );
}

export default Events;