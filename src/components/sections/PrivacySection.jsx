import { motion } from "framer-motion";
import { Shield, WifiOff, Lock, Server, Eye } from "lucide-react";

const PrivacySection = () => {
  return (
    <div className="section-container">
      <div className="absolute inset-0 bg-gradient-to-tl from-secondary/50 via-background to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left - Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          {/* Shield graphic */}
          <div className="relative">
            <motion.div
              className="w-64 h-64 rounded-full border-2 border-accent/20 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <motion.div
                  key={deg}
                  className="absolute w-3 h-3 rounded-full bg-accent/30"
                  style={{
                    top: `${50 - 45 * Math.cos((deg * Math.PI) / 180)}%`,
                    left: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{
                    duration: 2,
                    delay: deg / 360,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-28 h-28 rounded-2xl bg-accent/10 flex items-center justify-center glow-ring"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Shield className="w-14 h-14 text-accent" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-sm font-semibold text-accent tracking-wide uppercase mb-4">
            Privacy & Security
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Your data stays <span className="gradient-text">yours</span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Full offline capability. Zero-knowledge architecture.
            Patient data never leaves your device unless you choose to share.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: WifiOff,
                title: "Offline Mode",
                desc: "Full AI capabilities without internet connection",
              },
              {
                icon: Lock,
                title: "End-to-End Encryption",
                desc: "AES-256 encryption for all data at rest and in transit",
              },
              {
                icon: Server,
                title: "On-Premise Deploy",
                desc: "Run entirely on your own infrastructure",
              },
              {
                icon: Eye,
                title: "Zero-Knowledge",
                desc: "We can't see your data, even if we wanted to",
              },
            ].map((item, i) => {
              const Icon = item.icon; // JSX-safe dynamic component
              return (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 p-4 rounded-xl glass-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>

                  <div>
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacySection;
