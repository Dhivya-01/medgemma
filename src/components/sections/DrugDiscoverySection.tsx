import { motion } from "framer-motion";
import { Atom, FlaskConical, BarChart3, CheckCircle2 } from "lucide-react";

const molecules = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 4 + Math.random() * 8,
  duration: 4 + Math.random() * 6,
}));

const DrugDiscoverySection = () => {
  return (
    <div className="section-container">
      <div className="absolute inset-0 bg-background" />

      {/* Floating molecules */}
      {molecules.map((m) => (
        <motion.div
          key={m.id}
          className="absolute rounded-full bg-accent/10"
          style={{ left: `${m.x}%`, top: `${m.y}%`, width: m.size, height: m.size }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: m.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-sm font-semibold text-accent tracking-wide uppercase mb-4">
            Drug Discovery
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Accelerating{" "}
            <span className="gradient-text">molecular discovery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI simulates millions of compound interactions to identify promising
            drug candidates in days, not years.
          </p>
        </motion.div>

        {/* Pipeline visualization */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: FlaskConical,
              title: "Compound Library",
              value: "2.4M+",
              desc: "Molecules screened",
              delay: 0,
            },
            {
              icon: Atom,
              title: "Binding Analysis",
              value: "98.5%",
              desc: "Prediction accuracy",
              delay: 0.15,
            },
            {
              icon: BarChart3,
              title: "Toxicity Scoring",
              value: "< 0.3%",
              desc: "False positive rate",
              delay: 0.3,
            },
            {
              icon: CheckCircle2,
              title: "Lead Candidates",
              value: "47",
              desc: "Viable compounds",
              delay: 0.45,
            },
          ].map((stage, i) => (
            <motion.div
              key={stage.title}
              className="glass-card p-6 rounded-2xl relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: stage.delay, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Connector line */}
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-accent/30" />
              )}

              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <stage.icon className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold mb-1">{stage.value}</div>
              <div className="text-sm font-semibold mb-1">{stage.title}</div>
              <div className="text-xs text-muted-foreground">{stage.desc}</div>

              {/* Progress bar */}
              <div className="mt-4 w-full h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-accent)" }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: stage.delay + 0.5, duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrugDiscoverySection;
