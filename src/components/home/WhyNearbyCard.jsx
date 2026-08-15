function WhyNearbyCard({
  number,
  title,
  description,
  className = "",
}) {
  return (
    <div
      className={`
        min-h-56.25
        rounded-2xl
        bg-gray-100
        p-7
        transition
        hover:bg-gray-200
        ${className}
      `}
    >

      <p className="text-3xl font-bold text-gray-900">
        {number}
      </p>

      <h3 className="mt-7 text-lg font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {description}
      </p>

    </div>
  );
}

export default WhyNearbyCard;