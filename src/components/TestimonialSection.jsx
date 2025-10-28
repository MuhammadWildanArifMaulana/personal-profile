import React, { useState } from "react";
import avatar1 from "../assets/images/dipha.webp";
import avatar2 from "../assets/images/dian.webp";

const testimonials = [
  {
    name: "Arya Maulana P.",
    role: "Mahasiswa Teknik Sipil",
    quote:
      '"mampu memahami kebutuhan tim kami dan menerjemahkannya menjadi desain yang sangat user-friendly. Komunikasi dan delivery selalu on time!"',
    avatar: avatar1,
  },
  {
    name: "Dian Agus S.",
    role: "Mahasiswa Teknik Sipil",
    quote:
      '"Kreativitas & kecepatan kerja luar biasa. Landing page yang dibuatkan sangat modern & efektif meningkatkan konversi produk kami."',
    avatar: avatar2,
  },
];

function MobileCarousel({ testimonials }) {
  // Carousel state + looping navigation
  const [index, setIndex] = useState(0);
  const len = testimonials.length;

  const next = () => setIndex((i) => (i + 1) % len);
  const prev = () => setIndex((i) => (i - 1 + len) % len);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t, idx) => (
            <div key={t.name + idx} className="w-full flex-shrink-0 px-4">
              <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col w-[75%] mx-auto">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="p-0.5 rounded-full bg-gradient-to-tr from-sky-500 to-rose-400">
                      <img
                        src={t.avatar}
                        alt={`${t.name} avatar`}
                        className="h-8 w-8 rounded-full object-cover block"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>

                <div className="mt-3 flex-1">
                  <p className="text-slate-700 text-xs leading-relaxed">
                    {t.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav buttons (mobile only) */}
      <button
        type="button"
        onClick={next}
        aria-label="Next testimonial"
        title="Next testimonial"
        className="absolute left-[6%] top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 shadow-sm flex items-center justify-center hover:bg-white hover:shadow-md md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-slate-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous testimonial"
        title="Previous testimonial"
        className="absolute right-[6%] top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 shadow-sm flex items-center justify-center hover:bg-white hover:shadow-md md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-slate-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-slate-800" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialSection() {
  return (
    <section id="testimonials" className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
            Testimoni Klien
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Apa kata mereka yang pernah bekerja sama dengan saya.
          </p>
        </div>

        {/* Mobile carousel: shown only below md */}
        <div className="md:hidden">
          <MobileCarousel testimonials={testimonials} />
        </div>

        {/* Desktop / tablet grid: keep existing look, unchanged */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 items-stretch">
          {testimonials.map((t, idx) => (
            <div
              key={t.name + idx}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8 h-full flex flex-col"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-sky-500 to-rose-400">
                    <img
                      src={t.avatar}
                      alt={`${t.name} avatar`}
                      className="h-12 w-12 rounded-full object-cover block"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>

              <div className="mt-4 flex-1">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {t.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
