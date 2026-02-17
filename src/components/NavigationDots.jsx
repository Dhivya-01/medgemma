// import { motion } from "framer-motion";

// const labels = ["Vision", "Workflow", "Learning", "Security", "Privacy"];

// const NavigationDots = ({ count, active, onNavigate, isAuthOpen }) => {
//   return (
//     <motion.div
//       layout  // Enables smooth position/size transitions
//       transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//       // Replace className in motion.div:
// className={`z-40 flex flex-col items-end gap-2 sm:gap-3 transition-all duration-700 ${
//   isAuthOpen 
//     ? "fixed bottom-16 sm:bottom-20 md:bottom-24 right-4 sm:right-6 md:right-8 lg:right-10"  // Responsive bottom-right
//     : "fixed top-1/2 -translate-y-1/2 right-4 sm:right-6 md:right-8 lg:right-10"  // Responsive vertical
// }`}
// >
//       {Array.from({ length: count }).map((_, i) => (
//         <motion.button
//           key={i}
//           className="group flex items-center gap-3"
//           onClick={() => onNavigate(i)}
//           whileHover={{ x: -4 }}
//         >
//           <span
//             className={`text-xs font-medium transition-opacity duration-300 ${
//               active === i
//                 ? "opacity-100 text-accent"
//                 : "opacity-0 group-hover:opacity-100 text-muted-foreground"
//             }`}
//           >
//             {labels[i]}
//           </span>
//           <div className={`nav-dot ${active === i ? "active" : ""}`} />
//         </motion.button>
//       ))}
//     </motion.div>
//   );
// };

// export default NavigationDots;


import { motion } from "framer-motion";

const NavigationDots = ({ count, active, onNavigate, isAuthOpen, className = "" }) => {
  return (
    <motion.div
      className={`fixed top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        scale: isAuthOpen ? 0.9 : 1,
      }}
      transition={{ 
        delay: 1.2,
        scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }}
    >
      {/* Background pill */}
      <motion.div
        className="absolute inset-y-0 -inset-x-3 bg-background/40 backdrop-blur-xl rounded-full border border-border/30 shadow-lg"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      />

      {/* Dots */}
      <div className="relative flex flex-col items-center gap-4 py-4">
        {Array.from({ length: count }).map((_, i) => {
          const isActive = i === active;
          const distance = Math.abs(i - active);
          
          return (
            <motion.button
              key={i}
              onClick={() => onNavigate(i)}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.05 }}
            >
              {/* Glow effect for active dot */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full blur-md"
                  style={{ background: 'hsl(175 80% 40%)' }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 0.6 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Main dot */}
              <motion.div
                className="relative z-10 rounded-full transition-all duration-300"
                animate={{
                  width: isActive ? 12 : 8,
                  height: isActive ? 12 : 8,
                  backgroundColor: isActive 
                    ? "hsl(175 80% 40%)" // accent color
                    : distance <= 1
                    ? "hsl(215 16% 47% / 0.6)" // muted-foreground with opacity
                    : "hsl(215 16% 47% / 0.3)",
                }}
              >
                {/* Inner ring for active state */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/50"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </motion.div>

              {/* Tooltip on hover */}
              <motion.div
                className="absolute right-full mr-4 whitespace-nowrap px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none shadow-lg"
                initial={false}
                transition={{ duration: 0.2 }}
              >
                Section {i + 1}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-background border-r border-b border-border/50" />
              </motion.div>

              {/* Connecting line */}
              {i < count - 1 && (
                <motion.div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-border/50 to-transparent"
                  style={{ height: 16 }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1.5 + i * 0.05 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <div className="relative flex flex-col gap-2 mt-2">
        <motion.button
          onClick={() => onNavigate(Math.max(0, active - 1))}
          disabled={active === 0}
          className="p-1.5 rounded-lg bg-background/60 backdrop-blur-sm border border-border/30 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/50 transition-colors"
          whileHover={{ scale: active > 0 ? 1.1 : 1 }}
          whileTap={{ scale: active > 0 ? 0.9 : 1 }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
        
        <motion.button
          onClick={() => onNavigate(Math.min(count - 1, active + 1))}
          disabled={active === count - 1}
          className="p-1.5 rounded-lg bg-background/60 backdrop-blur-sm border border-border/30 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent/50 transition-colors"
          whileHover={{ scale: active < count - 1 ? 1.1 : 1 }}
          whileTap={{ scale: active < count - 1 ? 0.9 : 1 }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NavigationDots;