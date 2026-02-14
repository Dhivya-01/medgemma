import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import DiagnosticsSection from "@/components/sections/DiagnosticsSection";
import ChatSection from "@/components/sections/ChatSection";
import DrugDiscoverySection from "@/components/sections/DrugDiscoverySection";
import PrivacySection from "@/components/sections/PrivacySection";
import NavigationDots from "@/components/NavigationDots";

import AuthPanel from "../pages/Login";


const sections = [
  HeroSection,
  DiagnosticsSection,
  ChatSection,
  DrugDiscoverySection,
  PrivacySection,
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const Index = () => {
  
  const [[page, direction], setPage] = useState([0, 0]);
  const isAnimating = useRef(false);
  const [showAuth, setShowAuth] = useState(false);


  const navigate = useCallback(
    (newPage) => {
      if (isAnimating.current || newPage === page) return;
      if (newPage < 0 || newPage >= sections.length) return;

      isAnimating.current = true;
      setPage([newPage, newPage > page ? 1 : -1]);
    },
    [page]
  );

 const mainVariants = {
  expanded: {
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  shrunk: {
    scale: window.innerWidth < 1280 ? 0.97 : 0.92,
    x: window.innerWidth < 1280 ? "-2%" : "-4%",
    transition: { duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }
  }
};


  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 20) return;

      if (e.deltaY > 0) navigate(page + 1);
      else navigate(page - 1);
    };

    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        navigate(page + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        navigate(page - 1);
    };

    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
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
  <div className="h-screen w-full flex overflow-hidden relative">
  <motion.div
  variants={mainVariants}
  animate={showAuth ? "shrunk" : "expanded"}
  className="
    relative h-full w-full min-w-0 top-0

    sm-laptop:max-w-[1000px]
    md-laptop:max-w-[1180px]
    lg-desktop:max-w-[1320px]
    xl-wide:max-w-[1480px]

    mx-auto
  "
>

      <motion.header 
        className="
  fixed top-0 left-0 right-0 z-50 flex items-center justify-between

  px-4  sm-laptop:px-6  md-laptop:px-8  lg-desktop:px-12
  py-4  md-laptop:py-5
"

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
            onClick={() => setShowAuth(true)}
          >
            Get Access
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence 
        initial={false}
        custom={direction}
        mode="wait"
        onExitComplete={() => { isAnimating.current = false; }}
      >
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full flex items-center justify-center absolute top-0 left-0"
        >
          <CurrentSection />
        </motion.div>
      </AnimatePresence>

      {/* Single page counter - bottom-left */}
      <motion.div
        className="fixed bottom-8 left-8 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {String(page + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
      </motion.div>

      {/* NavigationDots - shrinks/moves with main content */}
     <NavigationDots
  className="
    right-4
    md-laptop:right-6
    lg-desktop:right-10
  "
  count={sections.length}
  active={page}
  onNavigate={navigate}
  isAuthOpen={showAuth}
/>

    </motion.div>

    {/* Auth Panel */}
    <motion.div
      initial={{ width: 0, x: "100%" }}
     animate={{
  width: showAuth
    ? window.innerWidth < 1200
      ? 320   // small laptops
      : window.innerWidth < 1500
      ? 380   // medium
      : 440   // large
    : 0,
  x: showAuth ? 0 : "100%",
}}

      transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
      className="h-full border-l border-border bg-background/95 backdrop-blur-xl flex-shrink-0 overflow-hidden z-30"
    >
      {showAuth && <AuthPanel onClose={() => setShowAuth(false)} />}
    </motion.div>
  </div>
);

};

export default Index;
