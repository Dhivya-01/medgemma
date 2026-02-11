import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <div className="section-container">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)" }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-20 top-20 w-[300px] h-[300px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)" }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 text-sm font-medium text-muted-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            Next-Generation Healthcare Intelligence
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          AI That{" "}
          <span className="gradient-text">Heals</span>
          <br />
          Smarter
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Transforming diagnostics, drug discovery, and patient care with
          privacy-first artificial intelligence built for the future of medicine.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <motion.button
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-accent-foreground transition-all"
            style={{ background: "var(--gradient-accent)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(175 80% 40% / 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Platform
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            className="px-8 py-4 rounded-full font-semibold text-foreground glass-card border border-border"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[
            { value: "99.7%", label: "Accuracy" },
            { value: "< 2s", label: "Response" },
            { value: "HIPAA", label: "Compliant" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.15 }}
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
