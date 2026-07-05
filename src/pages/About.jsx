function About() {
  return (
    <div>
      {/* HERO STATEMENT */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-14 text-center">
        <span className="inline-block text-xs font-semibold tracking-wide uppercase text-primary bg-sage/50 px-3 py-1 rounded-full mb-5">
          About TravelAI
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold text-ink leading-tight mb-6">
          Travel planning shouldn't feel like a second job.
        </h1>
        <p className="text-ink/70 text-lg max-w-2xl mx-auto">
          TravelAI turns a few preferences into a full itinerary — so you spend less
          time researching and more time deciding where to go next.
        </p>
      </section>

      {/* STATS */}
      <section className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-3 gap-6 text-center">
        <div>
          <p className="font-display text-3xl text-secondary">6</p>
          <p className="text-ink/60 text-sm mt-1">Curated destinations</p>
        </div>
        <div>
          <p className="font-display text-3xl text-secondary">1</p>
          <p className="text-ink/60 text-sm mt-1">AI model, real-time</p>
        </div>
        <div>
          <p className="font-display text-3xl text-secondary">&lt;10s</p>
          <p className="text-ink/60 text-sm mt-1">To generate a trip</p>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://picsum.photos/seed/travelai-about/700/500"
          alt="Traveler planning a trip"
          className="rounded-2xl w-full h-80 object-cover shadow-sm"
        />
        <div>
          <h2 className="text-2xl font-semibold text-ink mb-4">Why we built this</h2>
          <p className="text-ink/70 leading-relaxed mb-4">
            Planning a trip usually means a dozen open tabs — blog posts, review sites,
            forum threads — just to piece together three good days somewhere new.
          </p>
          <p className="text-ink/70 leading-relaxed">
            TravelAI replaces the tabs with one form. Tell it where you're going, how
            long you have, and what you care about, and the planner returns a day-by-day
            itinerary you can save and revisit — built with FastAPI, React, and the Groq API.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Fast by default",
            text: "Itineraries generate in seconds, not after a form gauntlet.",
          },
          {
            title: "Built on real data",
            text: "Every destination and trip you see is pulled live from a real backend.",
          },
          {
            title: "Yours to keep",
            text: "Save any generated trip and come back to it whenever you like.",
          },
        ].map((v) => (
          <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-ink mb-2">{v.title}</h3>
            <p className="text-ink/60 text-sm leading-relaxed">{v.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default About;