import React, { useState, useEffect } from "react";
import avatar1 from "../assets/images/nata.webp";
import avatar2 from "../assets/images/dian.webp";
import avatar3 from "../assets/images/dipha.webp";

const testimonials = [
  {
    name: "Pranata Dewi Ratna Swari",
    role: "Mahasiswa Sastra Indonesia",
    quote:
      "Sangat proaktif memberikan insight dan solusi desain yang tepat. Eksekusinya cepat, rapi, dan hasilnya langsung bisa dipakai tanpa banyak revisi. Mantap!!",
    avatar: avatar1,
  },
  {
    name: "Dian Agus S.",
    role: "Mahasiswa Teknik Sipil",
    quote:
      "Josjis bolo... Kreatif. Landing page yang dibuatkan sangat efektif meningkatkan konversi produk PMW kami.",
    avatar: avatar2,
  },
  {
    name: "Arya Maulana P.",
    role: "Mahasiswa Teknik Sipil",
    quote:
      "Memahami kebutuhan tim dan menghasilkan desain yang menarik, serta komunikasi selalu ontime.",
    avatar: avatar3,
  },
];

/* ---------------------------------------------------
   REUSABLE CARD COMPONENT
---------------------------------------------------- */
function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-7 flex flex-col h-full w-full">
      <div className="flex items-center gap-4">
        <div className="p-0.5 rounded-full bg-gradient-to-tr from-sky-500 to-rose-400">
          <img
            src={avatar}
            alt={name}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover"
          />
        </div>

        <div>
          <h4 className="text-base font-semibold text-slate-800">{name}</h4>
          <p className="text-sm text-slate-500">{role}</p>
        </div>
      </div>

      <p className="text-sm sm:text-base text-slate-700 leading-relaxed mt-4 flex-1">
        {quote}
      </p>
    </div>
  );
}

/* ---------------------------------------------------
   MOBILE/TABLET CAROUSEL (<= LG)
---------------------------------------------------- */
function TestimonialCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const len = items.length;

  const next = () => setIndex((i) => (i + 1) % len);
  const prev = () => setIndex((i) => (i - 1 + len) % len);

  // Optional autoplay (6 detik)
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="relative w-full">
      {/* SLIDER */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((t, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-4">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>

      {/* PREV BUTTON */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="
          absolute left-2 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full bg-white border border-slate-200
          shadow-sm flex items-center justify-center
          hover:shadow-md active:scale-95 lg:hidden
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-700"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={next}
        aria-label="Next"
        className="
          absolute right-2 top-1/2 -translate-y-1/2
          w-10 h-10 rounded-full bg-white border border-slate-200
          shadow-sm flex items-center justify-center
          hover:shadow-md active:scale-95 lg:hidden
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-700"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* INDICATORS */}
      <div className="flex justify-center gap-2 mt-4 lg:hidden">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === index ? "bg-slate-800 scale-125" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   FINAL SECTION (GRID DESKTOP + CAROUSEL MOBILE)
---------------------------------------------------- */
export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
            Testimoni Klien
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Apa kata mereka setelah bekerja sama dengan saya.
          </p>
        </div>

        {/* MOBILE + TABLET (SLIDER) */}
        <div className="lg:hidden">
          <TestimonialCarousel items={testimonials} />
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
