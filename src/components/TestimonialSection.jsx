function MobileCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);
  const len = testimonials.length;

  const next = () => setIndex((i) => (i + 1) % len);
  const prev = () => setIndex((i) => (i - 1 + len) % len);

  return (
    <div className="relative flex items-center">
      {/* Carousel */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 75}%)` }}
        >
          {testimonials.map((t, idx) => (
            <div key={idx} className="w-[75%] flex-shrink-0 px-2">
              <div className="bg-white rounded-xl shadow-lg p-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-sky-500 to-rose-400">
                    <img
                      src={t.avatar}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>

                <p className="mt-3 text-slate-700 text-xs leading-relaxed">
                  {t.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons — centered in gap */}
      <button
        onClick={prev}
        className="
          absolute left-[8%] top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full bg-white/95 shadow-md
          flex items-center justify-center
        "
      >
        <svg
          className="w-5 h-5 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={next}
        className="
          absolute right-[8%] top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full bg-white/95 shadow-md
          flex items-center justify-center
        "
      >
        <svg
          className="w-5 h-5 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicator */}
      <div className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 flex gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-slate-800" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
