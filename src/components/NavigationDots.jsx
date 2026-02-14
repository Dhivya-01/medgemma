import { motion } from "framer-motion";

const labels = ["Hero", "Diagnostics", "Assistant", "Discovery", "Privacy"];

const NavigationDots = ({ count, active, onNavigate, isAuthOpen }) => {
  return (
    <motion.div
      layout  // Enables smooth position/size transitions
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      // Replace className in motion.div:
className={`z-40 flex flex-col items-end gap-2 sm:gap-3 transition-all duration-700 ${
  isAuthOpen 
    ? "fixed bottom-16 sm:bottom-20 md:bottom-24 right-4 sm:right-6 md:right-8 lg:right-10"  // Responsive bottom-right
    : "fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 md:right-8 lg:right-10"  // Responsive vertical
}`}
>
      {Array.from({ length: count }).map((_, i) => (
        <motion.button
          key={i}
          className="group flex items-center gap-3"
          onClick={() => onNavigate(i)}
          whileHover={{ x: -4 }}
        >
          <span
            className={`text-xs font-medium transition-opacity duration-300 ${
              active === i
                ? "opacity-100 text-accent"
                : "opacity-0 group-hover:opacity-100 text-muted-foreground"
            }`}
          >
            {labels[i]}
          </span>
          <div className={`nav-dot ${active === i ? "active" : ""}`} />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default NavigationDots;
