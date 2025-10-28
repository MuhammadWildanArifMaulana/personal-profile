import React, { useState, useEffect, useRef } from "react";
import project1 from "../assets/images/project1.webp";
import project2 from "../assets/images/project2.webp";
import project3 from "../assets/images/project3.webp";
import project4 from "../assets/images/project4.webp";
import project5 from "../assets/images/project5.webp";
import {
  FiExternalLink,
  FiShoppingCart,
  FiImage,
  FiGlobe,
  FiCreditCard,
  FiLayers,
  FiLock,
} from "react-icons/fi";

const getTagMeta = (tag) => {
  switch (tag) {
    case "E-commerce":
      return {
        icon: <FiShoppingCart className="h-3 w-3 text-amber-600" />,
        pill: "bg-amber-50 text-amber-700",
      };
    case "Digital Image Processing":
      return {
        icon: <FiImage className="h-3 w-3 text-violet-600" />,
        pill: "bg-violet-50 text-violet-700",
      };
    case "Website":
      return {
        icon: <FiGlobe className="h-3 w-3 text-sky-600" />,
        pill: "bg-sky-50 text-sky-700",
      };
    case "POS System":
      return {
        icon: <FiCreditCard className="h-3 w-3 text-green-600" />,
        pill: "bg-green-50 text-green-700",
      };
    case "Design Platform & E-commerce":
      return {
        icon: <FiLayers className="h-3 w-3 text-teal-600" />,
        pill: "bg-teal-50 text-teal-700",
      };
    default:
      return {
        icon: <FiGlobe className="h-3 w-3 text-slate-500" />,
        pill: "bg-white/90 text-sky-700",
      };
  }
};

function Modal({ isOpen, onClose, projectTitle }) {
  const modalRef = useRef(null);
  const primaryRef = useRef(null);
  const prevFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus trap + prevent background scroll while modal is open. Restore focus on close.
    prevFocusRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimeout = setTimeout(() => {
      if (primaryRef.current) primaryRef.current.focus();
      else if (modalRef.current) modalRef.current.focus();
    }, 50);

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const container = modalRef.current;
      if (!container) return;
      const focusable = container.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimeout);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      try {
        prevFocusRef.current?.focus();
      } catch (e) {}
    };
  }, [isOpen, onClose]);

  const handleContact = (e) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", "#contact");
    }, 220);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`relative z-10 max-w-sm sm:max-w-lg w-full mx-4 transition-all duration-200 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-95"
        }`}
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          tabIndex={-1}
          className="bg-white rounded-xl shadow-xl p-4 sm:p-6"
        >
          <h3
            id="modal-title"
            className="text-sm sm:text-lg font-semibold text-slate-800 flex items-center gap-2 whitespace-nowrap truncate"
            title="Oops! Detail project ini masih dikunci"
          >
            <span className="flex-shrink-0">
              <FiLock className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" />
            </span>
            <span className="truncate">
              Oops! Detail project ini masih dikunci
            </span>
          </h3>
          <p id="modal-desc" className="text-xs sm:text-sm text-slate-600 mt-2">
            {`Yah, sayangnya pemilik belum mengizinkan untuk melihat detail project ${projectTitle}.`}
          </p>

          <div className="mt-6 flex gap-3 justify-end">
            <a
              href="#contact"
              ref={primaryRef}
              onClick={handleContact}
              className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm font-medium hover:bg-sky-700"
            >
              Hubungi Pemilik
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-md text-sm font-medium"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const PortfolioCard = ({ image, tag, title, description, onOpen }) => {
  const meta = getTagMeta(tag);

  return (
    <div className="bg-white rounded-lg shadow-[0_18px_30px_-12px_rgba(2,6,23,0.12)] overflow-hidden flex flex-col h-full transform transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-36 sm:h-44 lg:h-48 bg-gradient-to-br from-slate-100 to-slate-50 flex items-start">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
          decoding="async"
        />
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm text-[10px] sm:text-xs font-medium ${meta.pill}`}
        >
          {meta.icon}
          {tag}
        </span>
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-4 flex-1">
          {description}
        </p>

        <div className="mt-2">
          <button
            type="button"
            onClick={() => onOpen(title)}
            className="inline-flex items-center text-sm font-medium text-sky-600 hover:underline"
          >
            Lihat Detail
            <FiExternalLink className="h-4 w-4 ml-2 text-sky-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PortfolioSection() {
  // Modal state and handlers for project detail dialog
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("");

  const openModal = (projectTitle) => {
    setActiveProject(projectTitle);
    setIsOpen(true);
  };

  const closeModal = () => {
    // trigger close animation in Modal (it listens to isOpen prop)
    setIsOpen(false);
    // clear activeProject after animation completes (~200ms)
    setTimeout(() => setActiveProject(""), 220);
  };

  const projects = [
    {
      title: "Kopi MbokTi",
      image: project1,
      link: "#",
      tag: "E-commerce",
      description:
        "The KopiMbokTi website is designed with a simple, responsive, and user-friendly interface to showcase products, brand story, and online ordering features.",
    },
    {
      title: "Digital Image Processing",
      image: project2,
      link: "#",
      tag: "Digital Image Processing",
      description:
        "Enhanced Color Segmentation is an intelligent image processing tool that uses advanced algorithms for precise color-based image segmentation with SE, K-means, and Region Growing methods.",
    },
    {
      title: "PetShop",
      image: project3,
      link: "#",
      tag: "Website",
      description:
        'Pet Shop website featuring responsive design with "Perawatan Berkualitas Untuk Hewan Kesayangan" — a modern, user-friendly interface for pet care services and products.',
    },
    {
      title: "WildPOS Cashier",
      image: project4,
      link: "#",
      tag: "POS System",
      description:
        "WildPOS Management System — A comprehensive point-of-sale dashboard with analytics, featuring revenue tracking charts and inventory management with responsive design.",
    },
    {
      title: "FoundaSign",
      image: project5,
      link: "#",
      tag: "Design Platform & E-commerce",
      description:
        "FoundaSign is a modern architectural design platform that helps users find inspiration and realize their dream homes. Featuring responsive UI/UX, smart search for architectural styles, design collections, consultation hours, and customer testimonials — delivering a seamless experience for both clients and designers.",
    },
  ];

  return (
    <section id="portfolio" className="bg-gray-50 py-14">
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        projectTitle={activeProject}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
            Portfolio Pilihan
          </h2>
          <p className="text-sm text-slate-500 mt-3 max-w-2xl mx-auto">
            Beberapa project terbaik yang pernah saya kerjakan untuk klien lokal
            maupun internasional.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <PortfolioCard
              key={p.title}
              image={p.image}
              tag={p.tag}
              title={p.title}
              description={p.description}
              onOpen={openModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
