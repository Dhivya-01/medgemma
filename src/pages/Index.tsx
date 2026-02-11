import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import DiagnosticsSection from "@/components/sections/DiagnosticsSection";
import ChatSection from "@/components/sections/ChatSection";
import DrugDiscoverySection from "@/components/sections/DrugDiscoverySection";
import PrivacySection from "@/components/sections/PrivacySection";
import NavigationDots from "@/components/NavigationDots";

const sections = [HeroSection, DiagnosticsSection, ChatSection, DrugDiscoverySection, PrivacySection];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const Index = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const isAnimating = useRef(false);

  const navigate = useCallback(
    (newPage: number) => {
      if (isAnimating.current || newPage === page) return;
      if (newPage < 0 || newPage >= sections.length) return;
      isAnimating.current = true;
      setPage([newPage, newPage > page ? 1 : -1]);
    },
    [page]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 20) return;
      if (e.deltaY > 0) navigate(page + 1);
      else navigate(page - 1);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(page + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(page - 1);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) {
        if (delta > 0) navigate(page + 1);
        else navigate(page - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [page, navigate]);

  const CurrentSection = sections[page];

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Top bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="font-display font-bold text-xl tracking-tight">
          <span className="gradient-text">RBG</span>AI
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {["Platform", "Research", "Safety", "About"].map((item) => (
            <motion.a
              key={item}
              href="#"
              className="hover:text-foreground transition-colors"
              whileHover={{ y: -1 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            className="px-5 py-2 rounded-full text-accent-foreground text-sm font-medium"
            style={{ background: "var(--gradient-accent)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Access
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence
        initial={false}
        custom={direction}
        mode="wait"
        onExitComplete={() => {
          isAnimating.current = false;
        }}
      >
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <CurrentSection />
        </motion.div>
      </AnimatePresence>

      <NavigationDots count={sections.length} active={page} onNavigate={navigate} />

      {/* Page indicator */}
      <motion.div
        className="fixed bottom-8 left-8 z-50 text-xs text-muted-foreground font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {String(page + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
      </motion.div>
    </div>
  );
};

export default Index;
