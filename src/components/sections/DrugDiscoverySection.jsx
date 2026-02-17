// import { motion } from "framer-motion";
// import { Atom, FlaskConical, BarChart3, CheckCircle2 ,Shield} from "lucide-react";

// // Generate floating molecule positions
// const molecules = Array.from({ length: 12 }, (_, i) => ({
//   id: i,
//   x: Math.random() * 100,
//   y: Math.random() * 100,
//   size: 4 + Math.random() * 8,
//   duration: 4 + Math.random() * 6,
// }));

// const DrugDiscoverySection = () => {
//   return (
//     <div className="">
//       <div className="absolute inset-0 bg-background" />

//       {/* Floating molecules */}
//       {molecules.map((m) => (
//         <motion.div
//           key={m.id}
//           className="absolute rounded-full bg-accent/10"
//           style={{
//             left: `${m.x}%`,
//             top: `${m.y}%`,
//             width: m.size,
//             height: m.size,
//           }}
//           animate={{
//             y: [0, -20, 0],
//             x: [0, 10, 0],
//             opacity: [0.3, 0.6, 0.3],
//           }}
//           transition={{
//             duration: m.duration,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       ))}

//       <div className="relative z-10 max-w-6xl mx-auto px-8">
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="text-sm font-semibold text-accent tracking-wide uppercase mb-4">
//             FEDERATED SECURITY ARCHITECTURE
//           </div>

//           <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
//             Global Intelligence.{" "}
//             <span className="gradient-text">Zero Privacy Compromise.</span>
//           </h2>

//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             Traditional AI demands your data. AIRNotes works differently. We process everything locally on your servers and only share encrypted mathematical learnings (model weights) to our central hub. You get the power of a global network with the privacy of a local vault.
//           </p>
//         </motion.div>

//         {/* Pipeline visualization */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {[
//             {
//               icon: Shield,
//               title: "Compound Library",
//               value: "2.4M+",
//               desc: "Molecules screened",
//               delay: 0,
//             },
//             {
//               icon: Atom,
//               title: "Binding Analysis",
//               value: "98.5%",
//               desc: "Prediction accuracy",
//               delay: 0.15,
//             },
//             {
//               icon: BarChart3,
//               title: "Toxicity Scoring",
//               value: "< 0.3%",
//               desc: "False positive rate",
//               delay: 0.3,
//             },
//             {
//               icon: CheckCircle2,
//               title: "Lead Candidates",
//               value: "47",
//               desc: "Viable compounds",
//               delay: 0.45,
//             },
//           ].map((stage, i) => (
//             <motion.div
//               key={stage.title}
//               className="glass-card p-6 rounded-2xl relative group"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: stage.delay, duration: 0.6 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -8, transition: { duration: 0.3 } }}
//             >
//               {/* Connector line */}
//               {i < 3 && (
//                 <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-accent/30" />
//               )}

//               <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
//                 <stage.icon className="w-6 h-6 text-accent" />
//               </div>

//               <div className="text-3xl font-bold mb-1">{stage.value}</div>
//               <div className="text-sm font-semibold mb-1">{stage.title}</div>
//               <div className="text-xs text-muted-foreground">{stage.desc}</div>

//               {/* Progress bar */}
//               <div className="mt-4 w-full h-1 bg-secondary rounded-full overflow-hidden">
//                 <motion.div
//                   className="h-full rounded-full"
//                   style={{ background: "var(--gradient-accent)" }}
//                   initial={{ width: "0%" }}
//                   whileInView={{ width: "100%" }}
//                   transition={{
//                     delay: stage.delay + 0.5,
//                     duration: 1.5,
//                     ease: "easeOut",
//                   }}
//                   viewport={{ once: true }}
//                 />
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DrugDiscoverySection;

import heroBg from "../../assets/hero-bg.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Globe, Lock, Database, ArrowRight, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

// The 4 pillars shown as horizontal flow steps
const flowSteps = [
  {
    id: 0,
    icon: Database,
    color: "#0079bf",
    glow: "rgba(0,191,165,0.18)",
    label: "Local Inference",
    sub: "AI runs entirely on your hospital server",
    stat: "0 bytes sent",
    statColor: "#0073bf",
  },
  {
    id: 1,
    icon: Lock,
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.18)",
    label: "Weight Encryption",
    sub: "Only math gradients are packaged",
    stat: "AES-256",
    statColor: "#38bdf8",
  },
  {
    id: 2,
    icon: Globe,
    color: "#8bcefa",
    glow: "rgba(167,139,250,0.18)",
    label: "Federated Sync",
    sub: "Encrypted weights reach global hub",
    stat: "4 regions",
    statColor: "#8baefa",
  },
  {
    id: 3,
    icon: CheckCircle,
    color: "#34bbd3",
    glow: "rgba(52,211,153,0.18)",
    label: "Model Improved",
    sub: "Global intelligence returns locally",
    stat: "HIPAA native",
    statColor: "#34a6d3",
  },
];

// Animated packet that slides along the connector
const Packet = ({ color, delay }) => (
  <motion.div
    style={{
      position: "absolute",
      top: "50%",
      left: 0,
      width: "clamp(5px, 0.7vw, 9px)",
      height: "clamp(5px, 0.7vw, 9px)",
      borderRadius: "50%",
      backgroundColor: color,
      transform: "translateY(-50%)",
      boxShadow: `0 0 8px ${color}`,
    }}
    animate={{ left: ["0%", "100%"] }}
    transition={{
      duration: 1.6,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
      repeatDelay: 1.2,
    }}
  />
);

const DrugDiscoverySection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [pulse, setPulse] = useState(false);

  // Auto-cycle active step
  useEffect(() => {
    const t = setInterval(() => {
      setActiveStep((p) => (p + 1) % flowSteps.length);
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const active = flowSteps[activeStep];

  return (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
  
        {/* ── Background image ─────────────────────────────────── */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
        </div>
  

      <motion.div
        className="absolute rounded-full opacity-20 pointer-events-none"
        style={{
          width: "clamp(180px, 35vw, 500px)",
          height: "clamp(180px, 35vw, 500px)",
          top: "5%",
          left: "-5%",
          background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)",
        }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Floating orb — top-right ──────────────────────────── */}
      <motion.div
        className="absolute rounded-full opacity-15 pointer-events-none"
        style={{
          width: "clamp(120px, 22vw, 300px)",
          height: "clamp(120px, 22vw, 300px)",
          top: "8%",
          right: "4%",
          background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)",
        }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Content ───────────────────────────────────────────────
          max-w keeps it readable on ultrawide monitors.
          px scales from tight mobile to comfortable desktop.
          py gives breathing room so nothing clips the header / dots.
          text-center on all sizes — adjust to text-left if needed.
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-6 py-12 sm:py-28 text-center">

        
    <motion.h1
          className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
          style={{ fontSize: "clamp(2.5rem, 4vw, 6rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
            Global Intelligence.{" "}
            <span
              className="gradient-text"
            >
              Zero Privacy Compromise.
            </span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground mx-auto"
            style={{
              fontSize: "clamp(0.66rem, 1vw, 0.88rem)",
              maxWidth: "min(500px, 92%)",
              lineHeight: 1.55,
              marginTop: "clamp(4px, 0.6vh, 8px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Raw patient data never leaves your servers — only encrypted weight gradients travel.
            The power of a global network. The privacy of a local vault.
          </motion.p>
        
        {/* ── Flow diagram row ── */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            marginBottom: "clamp(10px, 2vh, 22px)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {flowSteps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;
            const isPast = i < activeStep;

            return (
              <div
                key={step.id}
                style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}
              >
                {/* Step node */}
                <motion.button
                  onClick={() => setActiveStep(i)}
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "clamp(4px, 0.6vh, 7px)",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                    width: "clamp(56px, 9vw, 100px)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Icon circle */}
                  <motion.div
                    style={{
                      width: "clamp(38px, 5.5vw, 64px)",
                      height: "clamp(38px, 5.5vw, 64px)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isActive ? step.color + "22" : isPast ? step.color + "10" : "hsl(var(--muted) / 0.3)",
                      border: `2px solid ${isActive ? step.color : isPast ? step.color + "60" : "hsl(var(--border) / 0.4)"}`,
                      boxShadow: isActive ? `0 0 clamp(10px,1.5vw,22px) ${step.color}55` : "none",
                      transition: "all 0.4s ease",
                      position: "relative",
                    }}
                    animate={isActive ? { scale: [1, 1.07, 1] } : { scale: 1 }}
                    transition={{ duration: 1.2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <Icon
                      style={{
                        width: "clamp(15px, 2.2vw, 26px)",
                        height: "clamp(15px, 2.2vw, 26px)",
                        color: isActive ? step.color : isPast ? step.color + "bb" : "hsl(var(--muted-foreground))",
                        transition: "color 0.4s ease",
                      }}
                    />
                    {/* Active ring */}
                    {isActive && (
                      <motion.div
                        style={{
                          position: "absolute",
                          inset: "-4px",
                          borderRadius: "50%",
                          border: `1.5px solid ${step.color}`,
                          opacity: 0,
                        }}
                        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "clamp(0.56rem, 0.82vw, 0.72rem)",
                        fontWeight: 700,
                        color: isActive ? step.color : "hsl(var(--foreground) / 0.6)",
                        transition: "color 0.4s ease",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step.label}
                    </div>
                  </div>
                </motion.button>

                {/* Connector + packet */}
                {i < flowSteps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      position: "relative",
                      margin: "0 clamp(2px, 0.4vw, 6px)",
                      marginTop: "-clamp(10px, 1.5vh, 18px)", // align with icon center
                      alignSelf: "flex-start",
                      marginTop: "clamp(19px, 2.75vw, 32px)",
                    }}
                  >
                    {/* Track */}
                    <div
                      style={{
                        width: "100%",
                        height: "2px",
                        borderRadius: "2px",
                        background: i < activeStep
                          ? `linear-gradient(90deg, ${flowSteps[i].color}, ${flowSteps[i + 1].color})`
                          : "hsl(var(--border) / 0.35)",
                        transition: "background 0.5s ease",
                      }}
                    />
                    {/* Animated packet */}
                    {i < activeStep && (
                      <Packet color={flowSteps[i + 1].color} delay={i * 0.3} />
                    )}
                    {i === activeStep && (
                      <Packet color={flowSteps[i].color} delay={0} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ── Detail card — changes with active step ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            className="glass-card mx-auto"
            style={{
              borderRadius: "clamp(12px, 1.5vw, 18px)",
              padding: "clamp(12px, 2vw, 22px) clamp(16px, 2.5vw, 30px)",
              borderColor: active.color + "40",
              borderWidth: "1px",
              borderStyle: "solid",
              maxWidth: "min(700px, 100%)",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: "clamp(10px, 1.8vw, 22px)",
            }}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Left: big icon */}
            <div
              style={{
                width: "clamp(42px, 5.5vw, 64px)",
                height: "clamp(42px, 5.5vw, 64px)",
                borderRadius: "clamp(10px, 1.2vw, 16px)",
                backgroundColor: active.color + "18",
                boxShadow: `0 0 20px ${active.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {(() => { const Icon = active.icon; return <Icon style={{ width: "clamp(18px, 2.5vw, 30px)", height: "clamp(18px, 2.5vw, 30px)", color: active.color }} />; })()}
            </div>

            {/* Centre: text */}
            <div>
              <div
                style={{
                  fontSize: "clamp(0.82rem, 1.3vw, 1.15rem)",
                  fontWeight: 700,
                  color: active.color,
                  marginBottom: "clamp(2px, 0.3vh, 5px)",
                }}
              >
                {active.label}
              </div>
              <div
                className="text-muted-foreground"
                style={{ fontSize: "clamp(0.65rem, 0.95vw, 0.82rem)", lineHeight: 1.5 }}
              >
                {active.sub}
              </div>
            </div>

            {/* Right: stat pill */}
            <div
              style={{
                flexShrink: 0,
                padding: "clamp(5px, 0.7vw, 9px) clamp(10px, 1.4vw, 18px)",
                borderRadius: "9999px",
                backgroundColor: active.color + "15",
                border: `1px solid ${active.color}40`,
                fontSize: "clamp(0.62rem, 0.9vw, 0.8rem)",
                fontWeight: 800,
                color: active.color,
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
              }}
            >
              {active.stat}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Step dots ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(4px, 0.6vw, 8px)",
            marginTop: "clamp(10px, 1.5vh, 18px)",
          }}
        >
          {flowSteps.map((s, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveStep(i)}
              style={{
                height: "clamp(4px, 0.5vw, 6px)",
                width: i === activeStep ? "clamp(18px, 2.5vw, 28px)" : "clamp(4px, 0.5vw, 6px)",
                borderRadius: "9999px",
                backgroundColor: i === activeStep ? s.color : "hsl(var(--muted))",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default DrugDiscoverySection;