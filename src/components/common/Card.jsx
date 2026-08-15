import cardimage from "/event1.jpg";
import { Link } from "react-router-dom";

function Card({ data }) {
  return (
    <Link to={`/event/${data.id}`} className="block">
    <div className="w-full overflow-hidden rounded-xl bg-white p-2 shadow-sm">

      {/* Event Image */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={data?.image || cardimage}
          alt={data?.title || "Event"}
          className="h-52 w-full object-cover"
        />

        {/* Category */}
        {data?.category && (
          <span className="absolute left-2 top-2 rounded-md bg-gray-700 px-2 py-1 text-xs font-semibold text-white">
            {data.category}
          </span>
        )}

        {/* Status */}
        {data?.status && (
          <span className="absolute right-2 top-2 rounded-md bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
            {data.status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-2 pb-3 pt-3">

        {/* Title */}
        <h3 className="truncate text-lg font-bold text-gray-900">
          {data?.title || "Event Title"}
        </h3>

        {/* Details */}
        <div className="mt-3 flex items-center gap-4">

          {/* Date */}
          {data?.date && (
            <div className="flex h-14 w-12 flex-col items-center justify-center rounded-md bg-black text-white">
              <span className="text-xl font-bold leading-none">
                {data.date.split(" ")[0]}
              </span>

              <span className="mt-1 text-xs font-medium">
                {data.date.split(" ")[1]}
              </span>
            </div>
          )}

          {/* Location + Price */}
          <div className="flex flex-col gap-2 text-sm">

            <div className="flex items-center gap-1.5 text-gray-700">
              <span>
                <img width="15" src="https://img.icons8.com/fluency-systems-filled/48/marker.png" alt="marker"/>
              </span>
              <span>{data?.location || "Location"}</span>
            </div>

            {data?.type === "event" && (
              <span className="text-gray-700">
                {data.ticketPrice
                  ? `৳${data.ticketPrice}`
                  : "No Tickets"}
              </span>
            )}

            {data?.type === "offer" && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">
                  {data.discount}
                </span>

                <span className="text-gray-400 line-through">
                  ৳{data.originalPrice}
                </span>

                <span className="font-semibold text-gray-900">
                  ৳{data.offerPrice}
                </span>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
    </Link>
  );
}

export default Card;