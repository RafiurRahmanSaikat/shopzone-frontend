import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Enhanced carousel data with more engaging content
const carouselSlides = [
  {
    id: 1,
    title: "Summer Collections 2025",
    description:
      "Discover trending styles for the summer season with up to 40% OFF.",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80",
    btnText: "Shop Collection",
    btnLink: "/products?category=Fashion",
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: 2,
    title: "Tech Gadgets Showcase",
    description:
      "The latest tech innovations at unbeatable prices. Upgrade your devices today!",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80",
    btnText: "Explore Tech",
    btnLink: "/products?category=Electronics",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Home Essentials",
    description:
      "Transform your living space with our curated home collection. Free shipping on orders over $50.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
    btnText: "Shop Home",
    btnLink: "/products?category=Home & Kitchen",
    color: "from-amber-600 to-orange-600",
  },
];

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const carouselInterval = useRef(null);

  // Handle carousel auto-play with improved transition handling
  useEffect(() => {
    // Set up auto-play for carousel
    carouselInterval.current = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => {
      clearInterval(carouselInterval.current);
    };
  }, []);

  const handleSlideChange = (index) => {
    if (isTransitioning || index === activeSlide) return;

    setIsTransitioning(true);
    setActiveSlide(index);
    resetCarouselInterval();

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match duration with CSS transition
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length,
    );
    resetCarouselInterval();

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match duration with CSS transition
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    resetCarouselInterval();

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match duration with CSS transition
  };

  const resetCarouselInterval = () => {
    clearInterval(carouselInterval.current);
    carouselInterval.current = setInterval(() => {
      handleNextSlide();
    }, 5000);
  };

  return (
    <div className="relative mt-6 h-[60vh] overflow-hidden rounded-2xl shadow-2xl md:mt-10">
      {/* Carousel slides */}
      <div
        ref={carouselRef}
        className="absolute inset-0 flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {carouselSlides.map((slide, index) => (
          <div key={slide.id} className="relative h-full w-full flex-shrink-0">
            {/* Gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>

            {/* Slide image with subtle zoom effect */}
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className={`h-full w-full object-cover object-center transition-transform duration-10000 ease-out ${
                activeSlide === index ? "scale-110" : "scale-100"
              }`}
            />

            {/* Slide content with staggered animations */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container-custom">
                <div className="mx-auto max-w-2xl text-center">
                  <h1
                    className={`font-display text-shadow-lg text-5xl font-bold text-white transition-all duration-500 sm:text-6xl md:text-7xl ${
                      activeSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "100ms" }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className={`text-shadow mt-6 text-xl text-white transition-all duration-500 ${
                      activeSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    {slide.description}
                  </p>
                  <div
                    className={`mt-8 transition-all duration-500 ${
                      activeSlide === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    <Link
                      to={slide.btnLink}
                      className={`group inline-flex items-center rounded-full bg-gradient-to-r ${slide.color} px-8 py-4 text-base font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                    >
                      {slide.btnText}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls with improved hover effects */}
      <button
        onClick={handlePrevSlide}
        disabled={isTransitioning}
        className="absolute top-1/2 left-4 z-30 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNextSlide}
        disabled={isTransitioning}
        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Carousel Indicators with active state animations */}
      <div className="absolute right-0 bottom-8 left-0 z-30 flex justify-center space-x-3">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            disabled={isTransitioning}
            className={`h-3 rounded-full transition-all duration-300 ${
              activeSlide === index
                ? "w-10 bg-white"
                : "w-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
