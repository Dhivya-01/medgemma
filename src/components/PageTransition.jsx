import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const variants = {
  initial: {
    y: "100%",
    opacity: 1,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    y: "-100%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-screen w-screen fixed inset-0 bg-background"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
