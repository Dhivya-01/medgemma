import { motion } from "framer-motion";

interface NavigationDotsProps {
  count: number;
  active: number;
  onNavigate: (index: number) => void;
}

const labels = ["Hero", "Diagnostics", "Assistant", "Discovery", "Privacy"];

const NavigationDots = ({ count, active, onNavigate }: NavigationDotsProps) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.button
          key={i}
          className="group flex items-center gap-3"
          onClick={() => onNavigate(i)}
          whileHover={{ x: -4 }}
        >
          <span className={`text-xs font-medium transition-opacity duration-300 ${
            active === i ? "opacity-100 text-accent" : "opacity-0 group-hover:opacity-100 text-muted-foreground"
          }`}>
            {labels[i]}
          </span>
          <div className={`nav-dot ${active === i ? "active" : ""}`} />
        </motion.button>
      ))}
    </div>
  );
};

export default NavigationDots;
