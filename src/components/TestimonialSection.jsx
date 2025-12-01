import React, { useRef, useState } from "react";

// --- ASSETS ---
import avatar1 from "../assets/images/nata.webp";
import avatar2 from "../assets/images/dian.webp";
import avatar3 from "../assets/images/dipha.webp";

// --- DATA ---
const testimonials = [
  {
    name: "Pranata Dewi Ratna Swari",
    role: "Mahasiswa Sastra Indonesia",
    quote:
      "Orgnya enak diajak diskusi, kasih insight yg kepikiran bgt n desainnya rapi jg. Kerjanya cepat tapi tetap detail, jadi jarang bgt perlu revisi. Keren banget sih!",
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
    quote: "mantap wil... desain menarik, komunikasi jg selalu ontime.",
    avatar: avatar3,
  },
];

/* ==========================================================================
   COMPONENT: NAV BUTTON
   ========================================================================== */
function NavButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-600 
                 flex items-center justify-center shadow-sm transition-all duration-300
                 ${
                   disabled
                     ? "opacity-50 cursor-not-allowed"
                     : "hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95"
                 }`}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      {direction === "left" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  );
}

/* ==========================================================================
   COMPONENT: TESTIMONIAL CARD
   ========================================================================== */
function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <div className="h-full bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-0.5 rounded-full bg-gradient-to-tr from-sky-400 to-rose-400 shrink-0">
          <img
            src={avatar}
            alt={name}
            className="h-14 w-14 rounded-full object-cover border-2 border-white"
          />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-800 line-clamp-1">
            {name}
          </h4>
          <p className="text-xs md:text-sm text-slate-500 font-medium line-clamp-1">
            {role}
          </p>
        </div>
      </div>
      <blockquote className="text-slate-600 leading-relaxed text-sm md:text-base flex-1">
        "{quote}"
      </blockquote>
    </div>
  );
}

/* ==========================================================================
   MAIN SECTION
   ========================================================================== */
export default function TestimonialSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // --- LOGIKA UPDATE INDIKATOR SAAT SCROLL ---
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;

      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? window.innerWidth * 0.85 : 432;

      const newIndex = Math.round(scrollLeft / cardWidth);

      const clampedIndex = Math.min(
        Math.max(newIndex, 0),
        testimonials.length - 1
      );

      setActiveIndex(clampedIndex);
    }
  };

  // --- LOGIKA TOMBOL NAVIGASI ---
  const scroll = (direction) => {
    const { current } = scrollRef;

    if (current) {
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? window.innerWidth * 0.85 + 16 : 432;

      let newIndex = activeIndex;
      if (direction === "left") newIndex = Math.max(0, activeIndex - 1);
      else newIndex = Math.min(testimonials.length - 1, activeIndex + 1);

      setActiveIndex(newIndex);

      current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 relative">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3">
              Kata Mereka Tentang Karya Saya
            </h2>
            <p className="text-slate-500 text-sm md:text-lg">
              Feedback jujur dari kolaborasi yang telah terjalin.
            </p>
          </div>

          <div className="hidden md:flex gap-3">
            <NavButton
              direction="left"
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
            />
            <NavButton
              direction="right"
              onClick={() => scroll("right")}
              disabled={activeIndex === testimonials.length - 1}
            />
          </div>
        </div>

        {/* SLIDER */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[400px]"
            >
              <TestimonialCard {...t} />
            </div>
          ))}
          <div className="w-4 shrink-0 md:hidden" />
        </div>

        {/* MOBILE CONTROL */}
        <div className="flex md:hidden justify-center items-center gap-6 mt-6">
          <NavButton
            direction="left"
            onClick={() => scroll("left")}
            disabled={activeIndex === 0}
          />
          <div className="h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-slate-800 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${100 / testimonials.length}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
          </div>
          <NavButton
            direction="right"
            onClick={() => scroll("right")}
            disabled={activeIndex === testimonials.length - 1}
          />
        </div>
      </div>
    </section>
  );
}
