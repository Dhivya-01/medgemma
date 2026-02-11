import { motion } from "framer-motion";
import { Upload, Brain, FileCheck, Zap } from "lucide-react";
import { useState } from "react";

const DiagnosticsSection = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { icon: Upload, label: "Upload Scan", desc: "Drop medical imaging data" },
    { icon: Brain, label: "AI Analysis", desc: "Deep learning processes" },
    { icon: FileCheck, label: "Results", desc: "Detailed diagnostic report" },
  ];

  return (
    <div className="section-container">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="text-sm font-semibold text-accent tracking-wide uppercase mb-4">
            Diagnostics Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            From scan to{" "}
            <span className="gradient-text">diagnosis</span>
            <br />in seconds
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Upload any medical image — X-ray, MRI, CT scan — and our AI delivers
            radiologist-grade analysis with highlighted regions of interest.
          </p>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                  step === i ? "glass-card glow-ring" : "hover:bg-secondary/50"
                }`}
                onClick={() => setStep(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  step === i ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs text-muted-foreground">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Demo Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, hsl(175 80% 40%), transparent)" }} />

            {/* Upload zone */}
            <motion.div
              className="border-2 border-dashed border-accent/30 rounded-2xl p-12 text-center mb-6"
              animate={step === 0 ? { borderColor: ["hsl(175 80% 40% / 0.3)", "hsl(175 80% 40% / 0.6)", "hsl(175 80% 40% / 0.3)"] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={step === 0 ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Upload className="w-12 h-12 mx-auto text-accent mb-3" />
              </motion.div>
              <div className="text-sm font-medium">Drop your scan here</div>
              <div className="text-xs text-muted-foreground mt-1">DICOM, PNG, JPG supported</div>
            </motion.div>

            {/* Processing animation */}
            {step >= 1 && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-5 h-5 text-accent" />
                  </motion.div>
                  <span className="text-sm font-medium">Analyzing with neural network...</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "var(--gradient-accent)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}

            {/* Results */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {[
                  { label: "Confidence", value: "99.2%", color: "text-accent" },
                  { label: "Anomalies", value: "2 detected", color: "text-destructive" },
                  { label: "Priority", value: "High", color: "text-foreground" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">{r.label}</span>
                    <span className={`text-sm font-semibold ${r.color}`}>{r.value}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2 text-accent">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-medium">Analysis complete in 1.8s</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiagnosticsSection;
