import { motion } from "framer-motion";
import { Upload, Brain, FileCheck, Zap } from "lucide-react";
import { useState } from "react";
import heroBg from "../../assets/hero-bg.jpg";

const DiagnosticsSection = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { icon: Upload, label: "Secure Data Ingestion", desc: "Direct database integration or encrypted manual upload. Patient data remains isolated within your hospital's local infrastructure." },
    { icon: Brain, label: "Intelligence AI Analysis", desc: "The model generates a structured report, flagging high-confidence findings in Green and low-confidence areas in Red for review." },
    { icon: FileCheck, label: "Human-Verified Approval", desc: "Radiologists review the flags, correct errors, and finalize the report. These corrections fuel the self-enhancing learning loop." },
  ];

  return (
     <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/50" /> */}
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
            <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-12 py-24 sm:py-28 text-center">
        <motion.h1
                    className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
                    style={{ fontSize: "clamp(2.5rem, 3vw, 6rem)" }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    From Local Ingestion to{" "}
                   <span className="gradient-text">Coded Report</span>
                  </motion.h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Whether integrated with PACS or uploaded manually, AIRNotes processes data on-premise, using AI to detect pathologies and produce confidence-tagged draft reports.
          </p>
      <div className="relative z-10 max-w-6xl mx-auto px-8 grid grid-cols-1 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
        
          {/* <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            From Local Ingestion to{" "}
            <span className="gradient-text">Confidence</span>
            <br />Coded Report
          </h2> */}
        

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
          <div className="glass-card p-4 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, hsl(175 80% 40%), transparent)" }} />

            {/* Upload zone */}
            <motion.div
              className="border-2 border-dashed border-accent/30 rounded-2xl p-8 text-center "
              animate={step === 0 ? { borderColor: ["hsl(175 80% 40% / 0.3)", "hsl(175 80% 40% / 0.6)", "hsl(175 80% 40% / 0.3)"] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={step === 0 ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Upload className="w-12 h-12 mx-auto text-accent mb-3" />
              </motion.div>
              <div className="text-sm font-medium"> Import DICOM / X-Ray Source</div>
              <div className="text-xs text-muted-foreground mt-1">PACS Integration Active • Local Server Connected</div>
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
    </div>
  );
};

export default DiagnosticsSection;



// import { motion } from "framer-motion";
// import { CheckCircle2, Database, BrainCircuit, UserCheck } from "lucide-react";

// const steps = [
//   {
//     icon: Database,
//     title: "Secure Data Ingestion",
//     description:
//       "Direct PACS/database integration or encrypted manual upload. Patient data never leaves your hospital infrastructure.",
//     footer: "PACS Integration Active • Local Server Connected",
//   },
//   {
//     icon: BrainCircuit,
//     title: "Intelligence AI Analysis",
//     description:
//       "Deep learning models scan imaging, generate structured reports, and flag findings with confidence markers.",
//     footer: "Green = High Confidence • Red = Needs Review",
//   },
//   {
//     icon: UserCheck,
//     title: "Human-Verified Approval",
//     description:
//       "Radiologists validate findings, correct edge cases, and finalize reports — feeding a self-enhancing learning loop.",
//     footer: "Federated Feedback Enabled",
//   },
// ];

// const DiagnosticsSection = () => {
//   return (
//     <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

//       {/* ── Background Atmosphere (match Hero) ───────────────── */}
//       <div className="absolute inset-0 " />

//       {/* Floating Ambient Orbs (same language as Hero) */}
//       <motion.div
//         className="absolute rounded-full opacity-20 pointer-events-none"
//         style={{
//           width: "clamp(160px, 30vw, 420px)",
//           height: "clamp(160px, 30vw, 420px)",
//           bottom: "-5%",
//           left: "-6%",
//           background:
//             "radial-gradient(circle, hsl(175 80% 40% / 0.25), transparent)",
//         }}
//         animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
//         transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <motion.div
//         className="absolute rounded-full opacity-15 pointer-events-none"
//         style={{
//           width: "clamp(120px, 22vw, 260px)",
//           height: "clamp(120px, 22vw, 260px)",
//           top: "10%",
//           right: "5%",
//           background:
//             "radial-gradient(circle, hsl(215 90% 55% / 0.25), transparent)",
//         }}
//         animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
//         transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* ── Content Wrapper (identical spacing model to Hero) ── */}
//      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-4 py-24 sm:py-28 text-center">

       

//         {/* Title */}
//         <motion.h2
//             className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-6"
//           style={{ fontSize: "clamp(2.5rem, 4vw, 6rem)" }}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           Intelligent Reporting Engine
//         </motion.h2>

//         {/* Description */}
//         <motion.p
//           className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-14 leading-relaxed"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           From local ingestion to confidence-coded reporting — AIRNotes processes
//           imaging entirely on-premise, delivering speed, security, and explainable AI.
//         </motion.p>

//         {/* ── Workflow Steps ───────────────────────────────── */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

//           {steps.map((step, i) => {
//             const Icon = step.icon;

//             return (
//               <motion.div
//                 key={step.title}
//                 className="relative rounded-2xl border border-border bg-background/60 backdrop-blur-xl p-6 text-left"
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 + i * 0.15 }}
//                 whileHover={{ y: -6 }}
//               >
//                 {/* Icon */}
//                 <div className="mb-4 w-10 h-10 flex items-center justify-center rounded-lg bg-accent/20">
//                   <Icon className="w-5 h-5 text-accent" />
//                 </div>

//                 {/* Title */}
//                 <h3 className="font-semibold text-lg mb-2">
//                   {step.title}
//                 </h3>

//                 {/* Body */}
//                 <p className="text-sm text-muted-foreground leading-relaxed">
//                   {step.description}
//                 </p>

//                 {/* Footer */}
//                 <div className="mt-5 text-xs text-accent flex items-center gap-2">
//                   <CheckCircle2 className="w-3.5 h-3.5" />
//                   {step.footer}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Bottom Callout */}
//         <motion.div
//           className="mt-16 text-xs tracking-widest text-muted-foreground"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           IMPORT DICOM / X-RAY SOURCE
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default DiagnosticsSection;



// import { motion } from "framer-motion";
// import { Upload, Brain, FileCheck, Zap } from "lucide-react";
// import { useState } from "react";

// const DiagnosticsSection = () => {
//   const [step, setStep] = useState(0);

//   const steps = [
//     {
//       icon: Upload,
//       label: "Secure Data Ingestion",
//       desc: "Direct database integration or encrypted manual upload. Patient data remains isolated within your hospital's local infrastructure.",
//     },
//     {
//       icon: Brain,
//       label: "Intelligence AI Analysis",
//       desc: "The model generates a structured report, flagging high-confidence findings in Green and low-confidence areas in Red for review.",
//     },
//     {
//       icon: FileCheck,
//       label: "Human-Verified Approval",
//       desc: "Radiologists review the flags, correct errors, and finalize the report. These corrections fuel the self-enhancing learning loop.",
//     },
//   ];

//   return (
//     /* ── SAME STRUCTURAL FRAME AS HERO ───────────────────────── */
//     <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

//       {/* Background Layer */}
//       <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/50" />

//       {/* Content Wrapper (Responsive to 100% / 80%) */}
//       <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12">

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center min-w-0">

//           {/* ───────── LEFT SIDE ───────── */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <div className="text-sm font-semibold text-accent tracking-wide uppercase mb-4">
//               INTELLIGENT REPORTING ENGINE
//             </div>

//             <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
//               From Local Ingestion to{" "}
//               <span className="gradient-text">Confidence</span>
//               <br />
//               Coded Report
//             </h2>

//             <p className="text-muted-foreground text-lg leading-relaxed mb-10">
//               Whether integrating directly with your hospital’s PACS or uploading manually,
//               AIRNotes processes data entirely on-premise. Our Intelligence AI scans for
//               pathologies and generates a draft report tagged with confidence levels —
//               ensuring speed without compromising accuracy.
//             </p>

//             {/* Workflow Steps */}
//             <div className="space-y-4">
//               {steps.map((s, i) => (
//                 <motion.div
//                   key={s.label}
//                   className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
//                     step === i ? "glass-card glow-ring" : "hover:bg-secondary/50"
//                   }`}
//                   onClick={() => setStep(i)}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
//                   whileHover={{ x: 4 }}
//                 >
//                   <div
//                     className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                       step === i
//                         ? "bg-accent text-accent-foreground"
//                         : "bg-secondary text-muted-foreground"
//                     }`}
//                   >
//                     <s.icon className="w-5 h-5" />
//                   </div>

//                   <div>
//                     <div className="font-semibold text-sm">{s.label}</div>
//                     <div className="text-xs text-muted-foreground">{s.desc}</div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* ───────── RIGHT SIDE DEMO PANEL ───────── */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
//             className="min-w-0"
//           >
//             <div className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden">

//               {/* subtle glow */}
//               <div
//                 className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
//                 style={{
//                   background:
//                     "radial-gradient(circle, hsl(175 80% 40%), transparent)",
//                 }}
//               />

//               {/* Upload Zone */}
//               <motion.div
//                 className="border-2 border-dashed border-accent/30 rounded-2xl p-10 sm:p-12 text-center mb-6"
//                 animate={
//                   step === 0
//                     ? {
//                         borderColor: [
//                           "hsl(175 80% 40% / 0.3)",
//                           "hsl(175 80% 40% / 0.6)",
//                           "hsl(175 80% 40% / 0.3)",
//                         ],
//                       }
//                     : {}
//                 }
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 <motion.div
//                   animate={step === 0 ? { y: [0, -8, 0] } : {}}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <Upload className="w-12 h-12 mx-auto text-accent mb-3" />
//                 </motion.div>

//                 <div className="text-sm font-medium">
//                   Import DICOM / X-Ray Source
//                 </div>
//                 <div className="text-xs text-muted-foreground mt-1">
//                   PACS Integration Active • Local Server Connected
//                 </div>
//               </motion.div>

//               {/* Processing */}
//               {step >= 1 && (
//                 <motion.div
//                   className="mb-6"
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                     >
//                       <Brain className="w-5 h-5 text-accent" />
//                     </motion.div>
//                     <span className="text-sm font-medium">
//                       Analyzing with neural network...
//                     </span>
//                   </div>

//                   <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
//                     <motion.div
//                       className="h-full rounded-full"
//                       style={{ background: "var(--gradient-accent)" }}
//                       initial={{ width: "0%" }}
//                       animate={{ width: "100%" }}
//                       transition={{ duration: 2, ease: "easeInOut" }}
//                     />
//                   </div>
//                 </motion.div>
//               )}

//               {/* Results */}
//               {step >= 2 && (
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
//                   {[
//                     { label: "Confidence", value: "99.2%", color: "text-accent" },
//                     { label: "Anomalies", value: "2 detected", color: "text-destructive" },
//                     { label: "Priority", value: "High", color: "text-foreground" },
//                   ].map((r) => (
//                     <div key={r.label} className="flex justify-between py-2 border-b border-border/50">
//                       <span className="text-sm text-muted-foreground">{r.label}</span>
//                       <span className={`text-sm font-semibold ${r.color}`}>{r.value}</span>
//                     </div>
//                   ))}

//                   <div className="flex items-center gap-2 pt-2 text-accent">
//                     <Zap className="w-4 h-4" />
//                     <span className="text-xs font-medium">
//                       Analysis complete in 1.8s
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiagnosticsSection;
