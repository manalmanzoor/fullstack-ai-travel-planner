export function TripMeta({ destination, days, budget, interests }) {
  const items = [
    { label: "Destination", value: destination },
    { label: "Duration", value: `${days} Day${days > 1 ? "s" : ""} Trip` },
    { label: "Budget", value: budget },
    { label: "Interests", value: interests },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-8 pb-6 border-b border-ink/10">
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-xs uppercase tracking-wide text-ink/40 mb-1">{item.label}</p>
          <p className="font-display italic text-lg text-secondary capitalize">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export function ItineraryTimeline({ data }) {
  if (!data || !data.days) return null;

  return (
    <div className="space-y-10">
      {data.trip_title && (
        <h3 className="font-display text-2xl text-ink mb-2">{data.trip_title}</h3>
      )}
      {data.days.map((day) => (
        <div key={day.day}>
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-display text-3xl text-secondary">
              {String(day.day).padStart(2, "0")}
            </span>
            <h4 className="text-lg font-semibold text-ink">{day.title}</h4>
          </div>

          <div className="space-y-6 border-l-2 border-dashed border-primary/25 pl-6">
            {day.activities.map((activity, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-secondary border-2 border-white shadow" />
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">
                  {activity.period} {activity.time && `· ${activity.time}`}
                </p>
                <h5 className="text-ink font-semibold mb-1">{activity.title}</h5>
                <p className="text-ink/60 text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}