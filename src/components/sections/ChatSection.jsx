// import { motion, AnimatePresence } from "framer-motion";
// import { Send, Bot, User, Mic } from "lucide-react";
// import { useState } from "react";
// import heroBg from "../../assets/hero-bg.jpg";

// const sampleMessages = [
//   { role: "bot", text: "Draft Report Generated.Low Confidence (42%) detected in region: Left Lower Lobe. Suggested finding: 'Mild Consolidation'. Verify?" },
//   { role: "user", text: "Correction: Artifact rejected. No consolidation present. Findings verified." },
//   { role: "user", text: "Can you explain that interaction in simpler terms?" },
//   { role: "bot", text: "Of course! Both Lisinopril (your blood pressure medication) and potassium supplements can raise your potassium levels. Too much potassium can cause irregular heartbeat. Your doctor may want to monitor your levels more closely." },
// ];

// const ChatSection = () => {
//   const [visibleCount, setVisibleCount] = useState(2);
//   const [inputValue, setInputValue] = useState("");

//   const showMore = () => {
//     if (visibleCount < sampleMessages.length) {
//       setVisibleCount((v) => Math.min(v + 1, sampleMessages.length));
//     }
//   };

//   return (
//      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    
//           {/* ── Background image ─────────────────────────────────── */}
//           <div className="absolute inset-0">
//             <img
//               src={heroBg}
//               alt=""
//               className="w-full h-full object-cover opacity-20"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
//           </div>
//     <motion.div
//         className="absolute rounded-full opacity-20 pointer-events-none"
//         style={{
//           width: "clamp(180px, 35vw, 500px)",
//           height: "clamp(180px, 35vw, 500px)",
//           top: "5%",
//           left: "-5%",
//           background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)",
//         }}
//         animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       />

//       {/* ── Floating orb — top-right ──────────────────────────── */}
//       <motion.div
//         className="absolute rounded-full opacity-15 pointer-events-none"
//         style={{
//           width: "clamp(120px, 22vw, 300px)",
//           height: "clamp(120px, 22vw, 300px)",
//           top: "8%",
//           right: "4%",
//           background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)",
//         }}
//         animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-12 py-24 sm:py-28 text-center">
      
        
      
//               {/* Headline
//                   clamp() gives smooth fluid scaling between breakpoints:
//                   min 2.5 rem (mobile) → preferred 8vw → max 6 rem (desktop)
//               */}
//               <motion.h1
//                 className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
//                 style={{ fontSize: "clamp(2.5rem, 4vw, 2rem)" }}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//               >
//                 CONTINUOUS LEARNING LOOP<span className="gradient-text"> Your Expertise</span>
//                 <br />
//                Trains the Model
//               </motion.h1>
      
//               {/* Subheading */}
//               <motion.p
//                 className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5, duration: 0.8 }}
//               >
//                When you correct a red-flagged report, our Federated Knowledge engine captures that insight securely. Your daily work actively enhances the system's intelligence.
//               </motion.p>

//       <div className="relative z-10 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
       
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
       
//           <div className="grid grid-cols-2 gap-4">
//             {[
//               { label: "Confidence Flags", desc: "Green/Red indicators guide focus." },
//               { label: "Federated Updates ", desc: "Global intelligence, local execution." },
//               { label: "Zero Leakage", desc: "Only model weights leave; data stays." },
//               { label: "Self-Healing", desc: "Accuracy improves with every correction." },
//             ].map((feat, i) => (
//               <motion.div
//                 key={feat.label}
//                 className="glass-card p-4 rounded-xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 + i * 0.1 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -4 }}
//               >
//                 <div className="text-sm font-semibold">{feat.label}</div>
//                 <div className="text-xs text-muted-foreground">{feat.desc}</div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>


//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           <div className="glass-card rounded-3xl overflow-hidden flex flex-col h-[480px]">
   
//             <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
//                 <Bot className="w-4 h-4 text-accent" />
//               </div>
//               <div>
//                 <div className="text-sm font-semibold">AIRNotes Learning Engine</div>
//                 <div className="flex items-center gap-1.5">
//                   <div className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
//                   <span className="text-xs text-muted-foreground">Active</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               <AnimatePresence>
//                 {sampleMessages.slice(0, visibleCount).map((msg, i) => (
//                   <motion.div
//                     key={i}
//                     className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
//                     initial={{ opacity: 0, y: 16, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     {msg.role === "bot" && (
//                       <div className="w-7 h-7 rounded-full bg-accent/10 flex-shrink-0 flex items-center justify-center mt-1">
//                         <Bot className="w-3.5 h-3.5 text-accent" />
//                       </div>
//                     )}
//                     <div
//                       className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
//                         msg.role === "user"
//                           ? "bg-primary text-primary-foreground rounded-br-md"
//                           : "bg-secondary text-secondary-foreground rounded-bl-md"
//                       }`}
//                     >
//                       {msg.text}
//                     </div>
//                     {msg.role === "user" && (
//                       <div className="w-7 h-7 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
//                         <User className="w-3.5 h-3.5 text-primary" />
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>

        
//             <div className="p-4 border-t border-border/50">
//               <div className="flex items-center gap-2">
//                 <motion.button
//                   className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <Mic className="w-4 h-4" />
//                 </motion.button>
//                 <input
//                   className="flex-1 px-4 py-2.5 rounded-full bg-secondary text-sm outline-none placeholder:text-muted-foreground"
//                   placeholder="Reviewing Report #8842... "
//                   value={inputValue}
//                   onChange={(e) => setInputValue(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && showMore()}
//                 />
//                 <motion.button
//                   className="w-10 h-10 rounded-full flex items-center justify-center text-accent-foreground"
//                   style={{ background: "var(--gradient-accent)" }}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={showMore}
//                 >
//                   <Send className="w-4 h-4" />
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default ChatSection;


import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Cpu, Zap, RefreshCw, Shield, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import heroBg from "../../assets/hero-bg.jpg";

const features = [
  { icon: Zap,        label: "Confidence Flags" },
  { icon: RefreshCw,  label: "Federated Updates" },
  { icon: Shield,     label: "Zero Leakage" },
  { icon: TrendingUp, label: "Self-Healing" },
];

const messages = [
  {
    role: "ai", icon: Bot, color: "#0ea5e9",
    from: "AIRNotes AI",
    text: "Low Confidence (42%) — Left Lower Lobe. Suggested: 'Mild Consolidation'.",
    tag: "VERIFY", tagColor: "#0bbef5",
  },
  {
    role: "user", icon: User, color: "#1097b9",
    from: "Radiologist",
    text: "Artifact rejected. No consolidation present. Findings verified.",
    tag: "CONFIRMED", tagColor: "#106db9",
  },
  {
    role: "system", icon: Cpu, color: "#5c9af6",
    from: "System",
    text: "Weights updated: 'Artifact Differentiation'. Local instance enhanced.",
    tag: "LEARNED", tagColor: "#5c9ff6",
  },
];

const stats = [
  { label: "Processed",  value: "12,840", color: "#0ea5e9", pct: 1 },
  { label: "Corrections",value: "3,291",  color: "#5c9ff6", pct: 0.76 },
  { label: "Accuracy",   value: "+18.4%", color: "#1045b9", pct: 0.62 },
  { label: "Data Leaked",value: "ZERO",   color: "#0bb3f5", pct: 0 },
];

const ChatSection = () => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown < messages.length - 1) {
      const t = setTimeout(() => setShown(v => v + 1), 1800);
      return () => clearTimeout(t);
    }
  }, [shown]);

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
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col gap-4 py-6">
<motion.h1
                    className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
                    style={{ fontSize: "clamp(2.5rem, 3vw, 5rem)" }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                  Your Expertise{" "}
                   <span className="gradient-text">Trains the Model.</span>
                  </motion.h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            When you correct a red-flagged report, our Federated Knowledge engine captures that insight securely.
            Your daily work actively enhances the system’s intelligence.
          </p>
        {/* Headline */}
        {/* <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-center text-[9px] tracking-[3px] font-bold text-sky-500/70 font-mono mb-1">
            CONTINUOUS LEARNING LOOP
          </p>

          <h1 className="text-center font-bold tracking-tight text-[clamp(1.6rem,3.5vw,3rem)]">
            <span className="gradient-text">Your Expertise</span>{" "}
            <span className="text-slate-900">Trains the Model.</span>
          </h1>

          <p className="text-center text-muted-foreground text-[clamp(10px,1vw,12px)] max-w-md mx-auto">
            When you correct a red-flagged report, our Federated Knowledge engine captures that insight securely.
            Your daily work actively enhances the system’s intelligence.
          </p>
        </motion.div> */}

        {/* Feature Ribbon (NEW — replaces left column) */}
        <motion.div className="flex flex-wrap justify-center gap-2">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.55)",
                  border: "1px solid rgba(14,165,233,0.18)",
                  backdropFilter: "blur(12px)",
                }}>
                <Icon size={12} color="#0369ad" />
                <span className="text-[12px] font-semibold">{f.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Chat Panel (Now the HERO element) */}
        <motion.div
          className="flex flex-col"
          style={{
            background: "rgba(255,255,255,0.58)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(14,165,233,0.16)",
            borderRadius: "14px",
            maxWidth: "820px",
            margin: "0 auto",
            boxShadow: "0 4px 24px rgba(14,165,233,0.07)",
          }}
        >

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-sky-200/40">
            <div className="flex items-center gap-2">
              <Bot size={14} color="#0369ad" />
              <span className=" font-bold">AIRNotes Learning Engine</span>
            </div>

            <motion.div className="w-2 h-2 rounded-full bg-blue-500"
              animate={{ opacity: [1, .3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
          </div>

          {/* Messages */}
          <div className="p-3 flex flex-col gap-2">
            <AnimatePresence>
              {messages.slice(0, shown + 1).map((msg, i) => {
                const Icon = msg.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2">

                    <div className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: msg.color + "20" }}>
                      <Icon size={10} color={msg.color} />
                    </div>

                    <div className="flex-1 p-2 rounded-md"
                      style={{ background: msg.color + "08", border: `1px solid ${msg.color}20` }}>

                      <div className="flex justify-between text-[12px] font-mono mb-1">
                        <span style={{ color: msg.color }}>{msg.from.toUpperCase()}</span>
                        <span style={{ color: msg.tagColor }}>{msg.tag}</span>
                      </div>

                      <p className="text-[13px] text-slate-600">{msg.text}</p>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="px-3 py-2 border-t border-sky-200/40 text-[10px] text-slate-400 font-mono">
            Reviewing Report #8842…
          </div>
        </motion.div>

        {/* Outcome Strip (NEW — replaces right column) */}
        <motion.div className="flex gap-2">
          {stats.map((s, i) => (
            <div key={i}
              className="flex-1 px-3 py-2 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(14,165,233,0.12)",
                backdropFilter: "blur(10px)",
              }}>

              <div className="text-[12px] text-slate-500">{s.label}</div>

              <div className="text-[13px] font-extrabold font-mono"
                style={{ color: s.color }}>{s.value}</div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: s.pct }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{
                  height: "2px",
                  marginTop: "4px",
                  background: s.color,
                  transformOrigin: "left",
                  opacity: 0.6,
                }}
              />
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default ChatSection;


// import { motion, AnimatePresence } from "framer-motion";
// import { Bot, User, Cpu, Shield, Zap, RefreshCw, TrendingUp } from "lucide-react";
// import { useState, useEffect } from "react";
// import heroBg from "../../assets/hero-bg.jpg";

// const features = [
//   { icon: Zap,        label: "Confidence Flags",  desc: "Green/Red indicators guide focus." },
//   { icon: RefreshCw,  label: "Federated Updates", desc: "Global intelligence, local execution." },
//   { icon: Shield,     label: "Zero Leakage",      desc: "Only model weights leave; data stays." },
//   { icon: TrendingUp, label: "Self-Healing",       desc: "Accuracy improves with every correction." },
// ];

// const messages = [
//   {
//     role: "ai", icon: Bot, color: "#0ea5e9",
//     from: "AIRNotes AI",
//     text: "Low Confidence (42%) — Left Lower Lobe. Suggested: 'Mild Consolidation'.",
//     tag: "VERIFY", tagColor: "#f59e0b",
//   },
//   {
//     role: "user", icon: User, color: "#10b981",
//     from: "Radiologist",
//     text: "Artifact rejected. No consolidation present. Findings verified.",
//     tag: "CONFIRMED", tagColor: "#10b981",
//   },
//   {
//     role: "system", icon: Cpu, color: "#8b5cf6",
//     from: "System",
//     text: "Weights updated: 'Artifact Differentiation'. Local instance enhanced.",
//     tag: "LEARNED", tagColor: "#8b5cf6",
//   },
// ];

// const stats = [
//   { label: "Processed",  value: "12,840", color: "#0ea5e9", pct: 100 },
//   { label: "Corrections",value: "3,291",  color: "#8b5cf6", pct: 76  },
//   { label: "Accuracy",   value: "+18.4%", color: "#10b981", pct: 62  },
//   { label: "Data Leaked",value: "ZERO",   color: "#f59e0b", pct: 0   },
// ];

// const ChatSection = () => {
//   const [shown, setShown] = useState(0);

//   useEffect(() => {
//     if (shown < messages.length - 1) {
//       const t = setTimeout(() => setShown(v => v + 1), 1800);
//       return () => clearTimeout(t);
//     }
//   }, [shown]);

//   return (
//     <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

//       {/* BG */}
//       <div className="absolute inset-0">
//         <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
//         <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
//       </div>
//       <motion.div className="absolute rounded-full opacity-20 pointer-events-none"
//         style={{ width: "clamp(180px,35vw,500px)", height: "clamp(180px,35vw,500px)", top: "5%", left: "-5%", background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)" }}
//         animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div className="absolute rounded-full opacity-15 pointer-events-none"
//         style={{ width: "clamp(120px,22vw,300px)", height: "clamp(120px,22vw,300px)", top: "8%", right: "4%", background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)" }}
//         animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 flex flex-col gap-4 py-6">

//         {/* HEADLINE — single compact row */}
//         <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "6px" }}>
//             <div style={{ height: "1px", width: "28px", background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.5))" }} />
//             <span style={{ fontSize: "8.5px", letterSpacing: "3px", fontWeight: 700, color: "rgba(14,165,233,0.7)", fontFamily: "monospace" }}>CONTINUOUS LEARNING LOOP</span>
//             <div style={{ height: "1px", width: "28px", background: "linear-gradient(90deg, rgba(14,165,233,0.5), transparent)" }} />
//           </div>
//           <div style={{ textAlign: "center" }}>
//             <h1 className="font-bold tracking-tight" style={{ fontSize: "clamp(1.6rem,3.5vw,3.2rem)", lineHeight: 1, marginBottom: "6px" }}>
//               <span className="gradient-text">Your Expertise</span>{" "}
//               <span style={{ color: "#0f172a" }}>Trains the Model.</span>
//             </h1>
//             <p className="text-muted-foreground mx-auto" style={{ fontSize: "clamp(10.5px,1.05vw,12.5px)", maxWidth: "460px", lineHeight: 1.5 }}>
//               When you correct a red-flagged report, our Federated Knowledge engine captures that insight securely.
//               Your daily work actively enhances the system's intelligence.
//             </p>
//           </div>
//         </motion.div>

//         {/* BODY — 3 tight columns */}
//         <div style={{ display: "grid", gridTemplateColumns: "170px 1fr 170px", gap: "10px", alignItems: "stretch" }}>

//           {/* COL 1 — Feature list */}
//           <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
//             style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//             <p style={{ fontSize: "8px", letterSpacing: "2px", fontWeight: 700, color: "rgba(14,165,233,0.55)", fontFamily: "monospace", marginBottom: "2px" }}>CAPABILITIES</p>
//             {features.map((f, i) => {
//               const Icon = f.icon;
//               return (
//                 <motion.div key={i}
//                   initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }} transition={{ delay: i * 0.06 }}
//                   whileHover={{ x: 2 }}
//                   style={{
//                     background: "rgba(255,255,255,0.58)", backdropFilter: "blur(14px)",
//                     border: "1px solid rgba(255,255,255,0.8)",
//                     borderLeft: "2px solid rgba(14,165,233,0.3)",
//                     borderRadius: "10px", padding: "9px 10px",
//                     display: "flex", gap: "8px", alignItems: "flex-start",
//                     flex: 1, transition: "transform 0.15s",
//                   }}>
//                   <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: "rgba(3,105,173,0.07)", border: "1px solid rgba(14,165,233,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
//                     <Icon size={11} color="#0369ad" strokeWidth={1.8} />
//                   </div>
//                   <div>
//                     <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a", lineHeight: 1, marginBottom: "3px" }}>{f.label}</div>
//                     <div style={{ fontSize: "9px", color: "#64748b", lineHeight: 1.35 }}>{f.desc}</div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>

//           {/* COL 2 — Interaction panel */}
//           <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}
//             style={{
//               background: "rgba(255,255,255,0.58)", backdropFilter: "blur(20px)",
//               border: "1px solid rgba(14,165,233,0.16)", borderRadius: "16px",
//               overflow: "hidden", display: "flex", flexDirection: "column",
//               boxShadow: "0 4px 24px rgba(14,165,233,0.07), inset 0 1px 0 rgba(255,255,255,0.9)",
//             }}>

//             {/* Header */}
//             <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(14,165,233,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.4)" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
//                 <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <Bot size={12} color="#0369ad" strokeWidth={1.5} />
//                 </div>
//                 <span style={{ fontSize: "11px", fontWeight: 700, color: "#0f172a" }}>AIRNotes Learning Engine</span>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                 <motion.div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 5px #10b981" }}
//                   animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
//                 <span style={{ fontSize: "7.5px", fontWeight: 700, color: "#10b981", fontFamily: "monospace", letterSpacing: "1px" }}>ACTIVE</span>
//               </div>
//             </div>

//             {/* Messages */}
//             <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
//               <AnimatePresence>
//                 {messages.slice(0, shown + 1).map((msg, i) => {
//                   const Icon = msg.icon;
//                   return (
//                     <motion.div key={i}
//                       initial={{ opacity: 0, y: 8, scale: 0.97 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       transition={{ duration: 0.35 }}
//                       style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
//                       <div style={{ width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0, background: msg.color + "15", border: `1px solid ${msg.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px" }}>
//                         <Icon size={11} color={msg.color} strokeWidth={1.8} />
//                       </div>
//                       <div style={{ flex: 1, padding: "8px 10px", borderRadius: "10px", borderTopLeftRadius: "3px", background: msg.color + "08", border: `1px solid ${msg.color}20` }}>
//                         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
//                           <span style={{ fontSize: "8px", fontWeight: 700, color: msg.color, fontFamily: "monospace", letterSpacing: "0.8px" }}>{msg.from.toUpperCase()}</span>
//                           <span style={{ fontSize: "7px", fontWeight: 700, color: msg.tagColor, fontFamily: "monospace", background: msg.tagColor + "15", border: `1px solid ${msg.tagColor}25`, borderRadius: "3px", padding: "1px 5px", letterSpacing: "0.8px" }}>{msg.tag}</span>
//                         </div>
//                         <p style={{ fontSize: "11px", color: "#334155", lineHeight: 1.45, margin: 0 }}>{msg.text}</p>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </div>

//             {/* Input bar */}
//             <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(14,165,233,0.08)", background: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: "7px" }}>
//               <div style={{ flex: 1, padding: "6px 10px", borderRadius: "16px", background: "rgba(14,165,233,0.05)", border: "1px solid rgba(14,165,233,0.12)", fontSize: "9.5px", color: "#94a3b8", fontFamily: "monospace" }}>
//                 Reviewing Report #8842…
//               </div>
//               <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, #0ea5e9, #10b981)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                 <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
//               </div>
//             </div>
//           </motion.div>

//           {/* COL 3 — Stats */}
//           <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.12 }}
//             style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//             <p style={{ fontSize: "8px", letterSpacing: "2px", fontWeight: 700, color: "rgba(16,185,129,0.6)", fontFamily: "monospace", marginBottom: "2px" }}>OUTCOMES</p>
//             {stats.map((s, i) => (
//               <motion.div key={i}
//                 initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }} transition={{ delay: i * 0.06 }}
//                 style={{
//                   background: "rgba(255,255,255,0.58)", backdropFilter: "blur(14px)",
//                   border: "1px solid rgba(255,255,255,0.8)",
//                   borderRadius: "10px", padding: "9px 11px",
//                   flex: 1,
//                 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
//                   <span style={{ fontSize: "9px", color: "#64748b" }}>{s.label}</span>
//                   <span style={{ fontSize: "12px", fontWeight: 800, color: s.color, fontFamily: "monospace", letterSpacing: "-0.3px" }}>{s.value}</span>
//                 </div>
//                 {/* Thin segmented bar */}
//                 <div style={{ display: "flex", gap: "1.5px", height: "3px" }}>
//                   {Array.from({ length: 14 }).map((_, j) => {
//                     const filled = j < Math.round((s.pct / 100) * 14);
//                     return (
//                       <motion.div key={j}
//                         initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: 0.25 + i * 0.05 + j * 0.025 }}
//                         style={{
//                           flex: 1, borderRadius: "2px", transformOrigin: "left",
//                           background: filled && s.pct > 0 ? s.color : "rgba(148,163,184,0.15)",
//                           opacity: filled && s.pct > 0 ? 0.4 + (j / 14) * 0.6 : 1,
//                         }}
//                       />
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//         </div>
//       </div>

//       <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');`}</style>
//     </div>
//   );
// };

// export default ChatSection;


// import { motion, AnimatePresence } from "framer-motion";
// import { Brain, CheckCircle2, Zap, RefreshCw, Shield, TrendingUp } from "lucide-react";
// import { useState, useEffect } from "react";
// import heroBg from "../../assets/hero-bg.jpg";

// const learningEvents = [
//   { id: 1, type: "flag",       label: "Report #8842",    detail: "Low confidence (42%) — Left Lower Lobe",        status: "flagged"   },
//   { id: 2, type: "correction", label: "Radiologist edit", detail: "Artifact rejected. No consolidation present.", status: "corrected" },
//   { id: 3, type: "capture",    label: "Insight captured", detail: "Federated engine encoded correction securely.", status: "learned"   },
//   { id: 4, type: "update",     label: "Model updated",    detail: "Weight delta pushed — accuracy +0.3%",         status: "improved"  },
// ];

// const statusColor = { flagged: "#f59e0b", corrected: "#0ea5e9", learned: "#8b5cf6", improved: "#10b981" };
// const statusBg    = { flagged: "rgba(245,158,11,0.08)", corrected: "rgba(14,165,233,0.08)", learned: "rgba(139,92,246,0.08)", improved: "rgba(16,185,129,0.08)" };

// // Right side: orbital metrics
// const metrics = [
//   { icon: Shield,     label: "Zero Leakage",      value: "0 bytes",  color: "#af9f0b", angle: -60  },
//   { icon: Zap,        label: "Confidence Flags",   value: "Real-time",color: "#f5260b", angle: 30   },
//   { icon: RefreshCw,  label: "Federated Sync",     value: "Encrypted",color: "#5cacf6", angle: 120  },
//   { icon: TrendingUp, label: "Accuracy Gain",      value: "+0.3%/day",color: "#0c752c", angle: 210  },
// ];

// const ChatSection = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [orbitAngle, setOrbitAngle] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => setActiveStep((s) => (s + 1) % learningEvents.length), 2200);
//     return () => clearInterval(t);
//   }, []);

//   useEffect(() => {
//     let frame;
//     const tick = () => { setOrbitAngle((a) => (a + 0.18) % 360); frame = requestAnimationFrame(tick); };
//     frame = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(frame);
//   }, []);

//   return (
//     <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

//       {/* Background */}
//       <div className="absolute inset-0">
//         <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
//         <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
//       </div>

//       {/* Orbs */}
//       <motion.div className="absolute rounded-full opacity-20 pointer-events-none"
//         style={{ width: "clamp(180px,35vw,500px)", height: "clamp(180px,35vw,500px)", top: "5%", left: "-5%", background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)" }}
//         animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div className="absolute rounded-full opacity-15 pointer-events-none"
//         style={{ width: "clamp(120px,22vw,300px)", height: "clamp(120px,22vw,300px)", top: "8%", right: "4%", background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)" }}
//         animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 flex flex-col gap-5 py-8">

//         {/* HEADLINE */}
//         <motion.div className="text-center"
//           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
//             <div style={{ height: "1px", width: "36px", background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.5))" }} />
//             <span style={{ fontSize: "9px", letterSpacing: "3px", fontWeight: 700, color: "rgba(14,165,233,0.7)", fontFamily: "monospace" }}>CONTINUOUS LEARNING LOOP</span>
//             <div style={{ height: "1px", width: "36px", background: "linear-gradient(90deg, rgba(14,165,233,0.5), transparent)" }} />
//           </div>
//           <h1 className="font-bold tracking-tight leading-none mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem)" }}>
//             <span className="gradient-text">Your Expertise</span>{" "}
//             <span style={{ color: "#0f172a" }}>Trains the Model.</span>
//           </h1>
//           <p className="text-muted-foreground mx-auto" style={{ fontSize: "clamp(11px,1.15vw,13.5px)", maxWidth: "500px", lineHeight: 1.6 }}>
//             Every correction you make is securely captured by our Federated Knowledge engine —
//             improving accuracy without ever exposing patient data.
//           </p>
//         </motion.div>

//         {/* BODY */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", alignItems: "stretch" }}>

//           {/* ══ LEFT: Learning loop feed (unchanged) ══ */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }} transition={{ duration: 0.5 }}
//             style={{
//               background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px)",
//               border: "1px solid rgba(14,165,233,0.2)", borderRadius: "18px",
//               padding: "20px 18px", display: "flex", flexDirection: "column", gap: "10px",
//               boxShadow: "0 4px 32px rgba(14,165,233,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
//               position: "relative", overflow: "hidden",
//             }}
//           >
//             {["tl","tr","bl","br"].map((c) => (
//               <div key={c} style={{
//                 position: "absolute", width: "12px", height: "12px",
//                 borderColor: "rgba(14,165,233,0.35)", borderStyle: "solid",
//                 borderWidth: c==="tl"?"1.5px 0 0 1.5px":c==="tr"?"1.5px 1.5px 0 0":c==="bl"?"0 0 1.5px 1.5px":"0 1.5px 1.5px 0",
//                 top: c.startsWith("t")?"10px":"auto", bottom: c.startsWith("b")?"10px":"auto",
//                 left: c.endsWith("l")?"10px":"auto", right: c.endsWith("r")?"10px":"auto",
//               }} />
//             ))}

//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
//                 <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <Brain size={14} color="#0369ad" strokeWidth={1.5} />
//                 </div>
//                 <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>Federated Learning Engine</span>
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//                 <motion.div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 5px #10b981" }}
//                   animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
//                 <span style={{ fontSize: "8px", fontFamily: "monospace", fontWeight: 700, color: "#10b981", letterSpacing: "1px" }}>LIVE</span>
//               </div>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//               {learningEvents.map((ev, i) => {
//                 const isActive = i === activeStep;
//                 const isPast   = i < activeStep;
//                 const color    = statusColor[ev.status];
//                 const bg       = statusBg[ev.status];
//                 return (
//                   <motion.div key={ev.id}
//                     animate={{ opacity: isPast ? 0.45 : isActive ? 1 : 0.3, x: isActive ? 2 : 0 }}
//                     transition={{ duration: 0.3 }}
//                     style={{
//                       display: "flex", alignItems: "center", gap: "10px",
//                       padding: "10px 12px", borderRadius: "10px",
//                       background: isActive ? bg : "transparent",
//                       border: `1px solid ${isActive ? color + "30" : "rgba(0,0,0,0.04)"}`,
//                     }}
//                   >
//                     <div style={{
//                       width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
//                       background: isActive ? color+"20" : isPast ? "#10b98120" : "rgba(0,0,0,0.04)",
//                       border: `1px solid ${isActive ? color+"50" : isPast ? "#10b98150" : "transparent"}`,
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                     }}>
//                       {isPast
//                         ? <CheckCircle2 size={11} color="#10b981" strokeWidth={2.5} />
//                         : <span style={{ fontSize: "8px", fontWeight: 800, color: isActive ? color : "#94a3b8", fontFamily: "monospace" }}>{String(i+1).padStart(2,"0")}</span>
//                       }
//                     </div>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div style={{ fontSize: "11.5px", fontWeight: 700, color: isActive ? "#0f172a" : "#64748b", marginBottom: "1px" }}>{ev.label}</div>
//                       <div style={{ fontSize: "10px", color: "#94a3b8", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.detail}</div>
//                     </div>
//                     {isActive && (
//                       <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
//                         style={{ fontSize: "7.5px", fontWeight: 700, letterSpacing: "1px", color, fontFamily: "monospace", background: bg, border: `1px solid ${color}30`, borderRadius: "4px", padding: "2px 6px", flexShrink: 0, textTransform: "uppercase" }}>
//                         {ev.status}
//                       </motion.span>
//                     )}
//                   </motion.div>
//                 );
//               })}
//             </div>

//             <div style={{ height: "2px", background: "rgba(0,0,0,0.06)", borderRadius: "99px", overflow: "hidden", marginTop: "2px" }}>
//               <motion.div
//                 animate={{ width: `${((activeStep + 1) / learningEvents.length) * 100}%` }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 style={{ height: "100%", borderRadius: "99px", background: "linear-gradient(90deg, #0ea5e9, #10b981)" }}
//               />
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <span style={{ fontSize: "8px", color: "#94a3b8", fontFamily: "monospace" }}>Step {activeStep + 1} of {learningEvents.length}</span>
//               <span style={{ fontSize: "8px", color: "#10b981", fontFamily: "monospace", fontWeight: 700 }}>Model improving…</span>
//             </div>
//           </motion.div>

//           {/* ══ RIGHT: Orbital metric ring ══ */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
//             style={{
//               background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px)",
//               border: "1px solid rgba(14,165,233,0.2)", borderRadius: "18px",
//               padding: "20px 18px",
//               boxShadow: "0 4px 32px rgba(14,165,233,0.07), inset 0 1px 0 rgba(255,255,255,0.8)",
//               display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//               gap: "10px", position: "relative", overflow: "hidden",
//             }}
//           >
//             {/* Corner brackets */}
//             {["tl","tr","bl","br"].map((c) => (
//               <div key={c} style={{
//                 position: "absolute", width: "12px", height: "12px",
//                 borderColor: "rgba(14,165,233,0.35)", borderStyle: "solid",
//                 borderWidth: c==="tl"?"1.5px 0 0 1.5px":c==="tr"?"1.5px 1.5px 0 0":c==="bl"?"0 0 1.5px 1.5px":"0 1.5px 1.5px 0",
//                 top: c.startsWith("t")?"10px":"auto", bottom: c.startsWith("b")?"10px":"auto",
//                 left: c.endsWith("l")?"10px":"auto", right: c.endsWith("r")?"10px":"auto",
//               }} />
//             ))}

//             {/* Title */}
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontSize: "10px", letterSpacing: "2px", fontWeight: 700, color: "rgba(14,165,233,0.6)", fontFamily: "monospace", marginBottom: "2px" }}>SYSTEM METRICS</div>
//             </div>

//             {/* Orbital diagram */}
//             <div style={{ position: "relative", width: "210px", height: "210px", flexShrink: 0 }}>

//               {/* Outer dashed orbit ring */}
//               <div style={{
//                 position: "absolute", inset: 0, borderRadius: "50%",
//                 border: "1px dashed rgba(14,165,233,0.18)",
//               }} />
//               {/* Inner orbit ring */}
//               <div style={{
//                 position: "absolute", inset: "28px", borderRadius: "50%",
//                 border: "1px dashed rgba(14,165,233,0.10)",
//               }} />

//               {/* Rotating connector line */}
//               <motion.div style={{
//                 position: "absolute", top: "50%", left: "50%",
//                 width: "80px", height: "1px",
//                 background: "linear-gradient(90deg, rgba(14,165,233,0.5), transparent)",
//                 transformOrigin: "0 50%",
//                 marginTop: "-0.5px",
//               }}
//                 animate={{ rotate: orbitAngle }}
//                 style={{ position: "absolute", top: "50%", left: "50%", width: "80px", height: "1px", background: "linear-gradient(90deg, rgba(14,165,233,0.4), transparent)", transformOrigin: "0 50%", transform: `rotate(${orbitAngle}deg)`, marginTop: "-0.5px" }}
//               />

//               {/* Center nucleus */}
//               <div style={{
//                 position: "absolute",
//                 top: "50%", left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "52px", height: "52px", borderRadius: "50%",
//                 background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(16,185,129,0.15))",
//                 border: "1px solid rgba(14,165,233,0.3)",
//                 display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//                 boxShadow: "0 0 20px rgba(14,165,233,0.15)",
//                 zIndex: 2,
//               }}>
//                 <Brain size={18} color="#0369ad" strokeWidth={1.5} />
//                 <span style={{ fontSize: "7px", fontFamily: "monospace", color: "#0369ad", fontWeight: 700, marginTop: "2px" }}>AI CORE</span>
//               </div>

//               {/* Orbiting metric nodes */}
//               {metrics.map((m, i) => {
//                 const Icon = m.icon;
//                 const rad = ((m.angle + orbitAngle * 0.4) * Math.PI) / 180;
//                 const r = 82;
//                 const x = 105 + r * Math.cos(rad) - 30;
//                 const y = 105 + r * Math.sin(rad) - 30;
//                 return (
//                   <motion.div
//                     key={i}
//                     style={{
//                       position: "absolute",
//                       left: x, top: y,
//                       width: "60px", height: "60px",
//                     }}
//                     whileHover={{ scale: 1.12 }}
//                   >
//                     <div style={{
//                       width: "60px", height: "60px", borderRadius: "14px",
//                       background: "rgba(255,255,255,0.9)",
//                       border: `1px solid ${m.color}30`,
//                       boxShadow: `0 2px 12px ${m.color}20`,
//                       display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//                       gap: "3px", backdropFilter: "blur(8px)",
//                     }}>
//                       <div style={{
//                         width: "22px", height: "22px", borderRadius: "6px",
//                         background: m.color + "15",
//                         border: `1px solid ${m.color}30`,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                       }}>
//                         <Icon size={11} color={m.color} strokeWidth={2} />
//                       </div>
//                       <span style={{ fontSize: "8.5px", fontWeight: 700, color: m.color, fontFamily: "monospace", textAlign: "center", lineHeight: 1.2, letterSpacing: "0.3px" }}>
//                         {m.value}
//                       </span>
//                       <span style={{ fontSize: "7px", color: "#94a3b8", textAlign: "center", lineHeight: 1.2, fontFamily: "monospace" }}>
//                         {m.label}
//                       </span>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {/* Bottom status row */}
//             <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
//               {[
//                 { dot: "#10b981", text: "All systems active" },
//                 { dot: "#0ea5e9", text: "Federated sync on" },
//               ].map((s) => (
//                 <div key={s.text} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//                   <motion.div style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.dot, boxShadow: `0 0 5px ${s.dot}` }}
//                     animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
//                   <span style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace" }}>{s.text}</span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//         </div>
//       </div>

     
//     </div>
//   );
// };

// export default ChatSection;



// import { motion, AnimatePresence } from "framer-motion";
// import { Bot, Brain, Shield, Zap, CheckCircle, Mic } from "lucide-react";
// import { useState, useEffect } from "react";
// import heroBg from "../../assets/hero-bg.jpg";

// const mainCardContent = [
//   {
//     title: "Low Confidence Detected",
//     text: "Draft Report Generated. 42% confidence in Left Lower Lobe. Suggested: 'Mild Consolidation'.",
//     status: "needsReview"
//   },
//   {
//     title: "Correction Applied",
//     text: "Artifact rejected. No consolidation present. Findings verified.",
//     status: "verified"
//   },
//   {
//     title: "Model Updated",
//     text: "Your correction has been captured. Federated weights updated successfully.",
//     status: "success"
//   },
//   {
//     title: "Continuous Learning",
//     text: "Every correction improves AIRNotes accuracy across the network.",
//     status: "learning"
//   }
// ];

// const chatCards = [
//   { role: "bot", text: "Draft Report Generated. Low Confidence (42%) detected in region: Left Lower Lobe." },
//   { role: "user", text: "Correction: Artifact rejected. No consolidation present." },
//   { role: "bot", text: "Model updated! Thanks for the correction." }
// ];

// const ChatSection = () => {
//   const [activeContent, setActiveContent] = useState(0);

//   // Auto-rotate main card content
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveContent((prev) => (prev + 1) % mainCardContent.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
    
//         <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    
//           {/* ── Background image ─────────────────────────────────── */}
//           <div className="absolute inset-0">
//             <img
//               src={heroBg}
//               alt=""
//               className="w-full h-full object-cover opacity-20"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
//           </div>
    
//           {/* ── Floating orb — top-left ───────────────────────────
//               Uses vw/vh-based sizing via inline style so it scales
//               with the viewport instead of being a fixed 500 px blob.
//           ───────────────────────────────────────────────────────── */}
//           <motion.div
//             className="absolute rounded-full opacity-20 pointer-events-none"
//             style={{
//               width: "clamp(180px, 35vw, 500px)",
//               height: "clamp(180px, 35vw, 500px)",
//               top: "5%",
//               left: "-5%",
//               background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)",
//             }}
//             animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//           />
    
//           {/* ── Floating orb — top-right ──────────────────────────── */}
//           <motion.div
//             className="absolute rounded-full opacity-15 pointer-events-none"
//             style={{
//               width: "clamp(120px, 22vw, 300px)",
//               height: "clamp(120px, 22vw, 300px)",
//               top: "8%",
//               right: "4%",
//               background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)",
//             }}
//             animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
//             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//           />
    
//           {/* ── Content ───────────────────────────────────────────────
//               max-w keeps it readable on ultrawide monitors.
//               px scales from tight mobile to comfortable desktop.
//               py gives breathing room so nothing clips the header / dots.
//               text-center on all sizes — adjust to text-left if needed.
//           ───────────────────────────────────────────────────────────── */}
//           <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-6 py-12 sm:py-28 text-center">
    
      
//         {/* ── Headline ────────────────────────────────────── */}
//         <motion.h1
//           className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
//           style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.9 }}
//         >
//           CONTINUOUS LEARNING LOOP<span className="gradient-text"> Your Expertise</span>
//           <br className="sm:hidden" />
//           Trains the Model
//         </motion.h1>

//       <motion.p
//           className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           When you correct flagged reports, our Federated Knowledge engine securely captures insights.
//           Your daily work actively enhances system intelligence.
//         </motion.p>

//         {/* ── MAIN SINGLE CARD (Centered, Large) ─────────────── */}
//         <motion.div
//           className="max-w-2xl mx-auto mb-4"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//         >
//           <div className="glass-card  flex flex-col justify-between relative overflow-hidden">
            
//             {/* Header */}
//             <div className="flex items-center p-4">
             
//               <div>
//                 <div className="text-md font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
//                   AIRNotes Engine
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
//                   <div className="w-2.5 h-2.5 rounded-full bg-green-400 pulse-dot" />
//                   <span>Learning Active</span>
//                 </div>
//               </div>
//             </div>

//             {/* Rotating Main Content */}
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeContent}
//                 className="flex-1 flex flex-col justify-center text-center"
//                 initial={{ opacity: 0, scale: 0.9, y: 30 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: -30 }}
//                 transition={{ duration: 0.7 }}
//               >
//                 <div className={`text-xl lg:text-xl font-bold mb-4 leading-tight ${
//                   mainCardContent[activeContent].status === 'success' 
//                     ? 'bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent' 
//                     : 'text-foreground'
//                 }`}>
//                   {mainCardContent[activeContent].title}
//                 </div>
//                 <p className=" lg:text-md text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
//                   {mainCardContent[activeContent].text}
//                 </p>
//               </motion.div>
//             </AnimatePresence>

//             {/* Progress Dots */}
          
//           </div>
//         </motion.div>

//         {/* ── SMALL CHAT CONTENT CARDS ───────────────────────── */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//         >
//           {chatCards.map((msg, i) => (
//             <motion.div
//               key={i}
//               className={`glass-card p-6 rounded-2xl flex items-start gap-4 h-[120px] group hover:shadow-xl transition-all duration-300 ${
//                 msg.role === "user" ? "justify-self-end" : ""
//               }`}
//               whileHover={{ y: -6 }}
//             >
//               <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
//                 msg.role === "user" 
//                   ? "bg-primary/20 group-hover:scale-110" 
//                   : "bg-secondary/30"
//               }`}>
//                 {msg.role === "user" ? (
//                   <Bot className="w-5 h-5 text-primary" />
//                 ) : (
//                   <Bot className="w-5 h-5 text-accent" />
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm leading-relaxed text-foreground line-clamp-3">{msg.text}</p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ChatSection;



// import { motion, AnimatePresence } from "framer-motion";
// import { Bot, Brain, Shield, Zap, CheckCircle } from "lucide-react";
// import { useState, useEffect } from "react";
// import heroBg from "../../assets/hero-bg.jpg";

// const mainCardContent = [
//   {
//     title: "AIRNotes Learning Engine • Active",
//     sections: [
//       "The AI:\nDraft Report Generated.\n⚠️ Low Confidence (42%) detected in region: Left Lower Lobe.\nSuggested finding: 'Mild Consolidation'. Verify?",
//       "The Radiologist:\nCorrection: Artifact rejected. No consolidation present.\nFindings verified.",
//       "The System Response:\nFeedback Encrypted & Logged. 🔒\nModel weights updated for 'Artifact Differentiation'.\nLocal instance enhanced.\n\nReviewing Report #8842..."
//     ]
//   }
// ];

// const featureCards = [
//   {
//     title: "Confidence Flags",
//     desc: "Green/Red indicators guide focus."
//   },
//   {
//     title: "Federated Updates",
//     desc: "Global intelligence, local execution."
//   },
//   {
//     title: "Zero Leakage",
//     desc: "Only model weights leave; data stays."
//   },
//   {
//     title: "Self-Healing",
//     desc: "Accuracy improves with every correction."
//   }
// ];

// const ChatSection = () => {
//   const [activeContent, setActiveContent] = useState(0);
//   const [activeFeature, setActiveFeature] = useState(0);

//   // Auto-rotate main card content
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveContent((prev) => (prev + 1) % mainCardContent[0].sections.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   // Auto-rotate feature cards
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % featureCards.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
   
//          {/* ── Background image ─────────────────────────────────── */}
//          <div className="absolute inset-0">
//            <img
//              src={heroBg}
//              alt=""
//              className="w-full h-full object-cover opacity-20"
//            />
//            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
//          </div>
   
//          {/* ── Floating orb — top-left ───────────────────────────
//              Uses vw/vh-based sizing via inline style so it scales
//              with the viewport instead of being a fixed 500 px blob.
//          ───────────────────────────────────────────────────────── */}
//          <motion.div
//            className="absolute rounded-full opacity-20 pointer-events-none"
//            style={{
//              width: "clamp(180px, 35vw, 500px)",
//              height: "clamp(180px, 35vw, 500px)",
//              top: "5%",
//              left: "-5%",
//              background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)",
//            }}
//            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
//            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//          />
   
//          {/* ── Floating orb — top-right ──────────────────────────── */}
//          <motion.div
//            className="absolute rounded-full opacity-15 pointer-events-none"
//            style={{
//              width: "clamp(120px, 22vw, 300px)",
//              height: "clamp(120px, 22vw, 300px)",
//              top: "8%",
//              right: "4%",
//              background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)",
//            }}
//            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
//            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//          />
   
//          {/* ── Content ───────────────────────────────────────────────
//              max-w keeps it readable on ultrawide monitors.
//              px scales from tight mobile to comfortable desktop.
//              py gives breathing room so nothing clips the header / dots.
//              text-center on all sizes — adjust to text-left if needed.
//          ───────────────────────────────────────────────────────────── */}
//          <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-6 py-12 sm:py-28 text-center">
   
     
//         {/* ── Headline ────────────────────────────────────── */}
//         <motion.h1
//           className="font-bold tracking-tight leading-[0.95] mb-6 sm:mb-10 mt-4"
//           style={{ fontSize: "clamp(2.5rem, 2vw, 4rem)" }}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.9 }}
//         >
//           CONTINUOUS LEARNING LOOP<span className="gradient-text"> Your Expertise</span>
//           <br className="sm:hidden" />
//           Trains the Model
//         </motion.h1>

//         <motion.p
//           className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           When you correct flagged reports, our Federated Knowledge engine securely captures insights.
//           Your daily work actively enhances system intelligence.
//         </motion.p>

//         {/* ── MAIN SINGLE CARD ──────────────────────────────── */}
//         <motion.div
//           className=" mx-auto mb-2"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//         >
//           <div className="glass-card p-2 h-[320px] flex flex-col justify-between relative overflow-hidden">
            
//             {/* Header */}
            
//              <div className="bg-gradient">
//               <div className="text-center">
//                 <div className="text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
//                   {mainCardContent[0].title}
//                 </div>
//               </div>
            
// </div>
//             {/* Rotating Main Content */}
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeContent}
//                 className="flex-1 flex flex-col justify-center text-center px-4"
//                 initial={{ opacity: 0, scale: 0.95, y: 30 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95, y: -30 }}
//                 transition={{ duration: 0.7 }}
//               >
//                 <div className="whitespace-pre-wrap text-md sm:text-xl lg:text-xl font-semibold mb-4 text-foreground leading-relaxed mx-auto">
//                   {mainCardContent[0].sections[activeContent]}
//                 </div>
//               </motion.div>
//             </AnimatePresence>

           
//           </div>
//         </motion.div>

//         {/* ── STACKED FEATURE CARDS (Back-to-Front Animation) ── */}
//         <div className="max-w-md mx-auto">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeFeature}
//               className="glass-card p-8 rounded-3xl relative overflow-hidden h-[200px] flex flex-col justify-center items-center text-center"
//               initial={{ 
//                 opacity: 0, 
//                 scale: 0.8, 
//                 rotateY: -90, 
//                 z: -100 
//               }}
//               animate={{ 
//                 opacity: 1, 
//                 scale: 1, 
//                 rotateY: 0, 
//                 z: 0 
//               }}
//               exit={{ 
//                 opacity: 0, 
//                 scale: 0.8, 
//                 rotateY: 90, 
//                 z: -100 
//               }}
//               transition={{ duration: 0.8, ease: "easeInOut" }}
//               style={{ 
//                 transformStyle: "preserve-3d",
//                 perspective: 1000
//               }}
//             >
//               <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center mx-auto"
//                    style={{ 
//                      backgroundColor: `hsl(${170 + activeFeature * 25}, 80%, 40% / 0.2)`,
//                      boxShadow: `0 0 20px hsl(${170 + activeFeature * 25}, 80%, 40% / 0.3)`
//                    }}>
//                 {activeFeature === 0 && <Brain className="w-8 h-8 text-emerald-500" />}
//                 {activeFeature === 1 && <Zap className="w-8 h-8 text-blue-500" />}
//                 {activeFeature === 2 && <Shield className="w-8 h-8 text-purple-500" />}
//                 {activeFeature === 3 && <CheckCircle className="w-8 h-8 text-green-500" />}
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-foreground">{featureCards[activeFeature].title}</h3>
//               <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
//                 {featureCards[activeFeature].desc}
//               </p>
//             </motion.div>
//           </AnimatePresence>

//           {/* Feature Progress Dots */}
//           <div className="flex justify-center gap-2 mt-6">
//             {featureCards.map((_, i) => (
//               <motion.div
//                 key={i}
//                 className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
//                   i === activeFeature ? 'bg-accent scale-125 shadow-md' : 'bg-muted'
//                 }`}
//                 animate={{ scale: i === activeFeature ? 1.25 : 1 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatSection;

// import { motion, AnimatePresence } from "framer-motion";
// import { Brain, Shield, Zap, CheckCircle, Cpu, UserCheck, ArrowRight } from "lucide-react";
// import { useState, useEffect } from "react";
// import heroBg from "../../assets/hero-bg.jpg";

// // All content in a flat sequence — each card fills the space one at a time
// const sequence = [
//   {
//     type: "ai",
//     tag: "AI Draft",
//     icon: <Cpu className="w-4 h-4" />,
//     accent: "#2289c5",
//     bg: "from-blue-500/10 to-blue-800/5",
//     border: "border-cyan-500/25",
//     badge: " Low Confidence 42%",
//     badgeColor: "#2289c5",
//     title: "Draft Report Generated",
//     body: "Region: Left Lower Lobe\nSuggested finding: 'Mild Consolidation'\nVerification required before finalization.",
//   },
//   {
//     type: "human",
//     tag: "Radiologist",
//     icon: <UserCheck className="w-4 h-4" />,
//     accent: "#2289c5",
//     bg: "from-blue-500/10 to-blue-800/5",
//     border: "border-cyan-500/25",
//     badge: "Verified",
//     badgeColor: "#2289c5",
//     title: "Correction Submitted",
//     body: "Artifact rejected — no consolidation present.\nFindings confirmed. Report marked complete.",
//   },
//   {
//     type: "system",
//     tag: "System Response",
//     icon: <Brain className="w-4 h-4" />,
//     accent: "#2289c5",
//     bg: "from-blue-500/10 to-blue-800/5",
//     border: "border-cyan-500/25",
//     badge: "Encrypted & Logged",
//     badgeColor: "#2289c5",
//     title: "Model Updated",
//     body: "Weights updated for 'Artifact Differentiation'.\nLocal instance enhanced. Reviewing Report #8842…",
//   },
//   {
//     type: "feature",
//     tag: "Confidence Flags",
//     icon: <Brain className="w-4 h-4" />,
//     accent: "#2289c5",
//     bg: "from-blue-500/10 to-blue-800/5",
//     border: "border-cyan-500/25",
//     badge: "Core Capability",
//     badgeColor: "#2289c5",
//     title: "Green / Red Indicators",
//     body: "High-confidence findings shown in green.\nLow-confidence areas flagged in red for radiologist review.",
//   },
//   {
//     type: "feature",
//     tag: "Federated Updates",
//     icon: <Zap className="w-4 h-4" />,
//     accent: "#2289c5",
//     bg: "from-blue-500/10 to-blue-800/5",
//     border: "border-cyan-500/25",
//     badge: "Core Capability",
//     badgeColor: "#2289c5",
//     title: "Global Intelligence, Local Execution",
//     body: "Model improvements propagate globally.\nYour data never leaves your local infrastructure.",
//   },
//   {
//     type: "feature",
//     tag: "Zero Leakage",
//     icon: <Shield className="w-4 h-4" />,
//     accent: "#2289c5",
//     bg: "from-blue-500/10 to-blue-800/5",
//     border: "border-cyan-500/25",
//     badge: "Core Capability",
//     badgeColor: "#2289c5",
//     title: "Only Weights Leave",
//     body: "Patient data is never transmitted.\nFederated learning ensures full HIPAA compliance.",
//   },
//   {
//     type: "feature",
//     tag: "Self-Healing",
//     icon: <CheckCircle className="w-4 h-4" />,
//     accent: "#2289c5",
//     bg: "from-blue-500/10 to-blue-800/5",
//     border: "border-cyan-500/25",
//     badge: "Core Capability",
//     badgeColor: "#2289c5",
//     title: "Accuracy Improves Automatically",
//     body: "Every correction tightens the model.\nYour daily work actively trains the system intelligence.",
//   },
// ];

// const ChatSection = () => {
//   const [active, setActive] = useState(0);
//   const [dir, setDir] = useState(1);

//   useEffect(() => {
//     const t = setInterval(() => {
//       setDir(1);
//       setActive((p) => (p + 1) % sequence.length);
//     }, 3800);
//     return () => clearInterval(t);
//   }, []);

//   const go = (i) => {
//     setDir(i > active ? 1 : -1);
//     setActive(i);
//   };

//   const item = sequence[active];

//   return (
//       /*
//         Full viewport height + width, relative so absolute children are clipped.
//         flex column centres content vertically & horizontally on every screen.
//       */
//       <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
  
//         {/* ── Background image ─────────────────────────────────── */}
//         <div className="absolute inset-0">
//           <img
//             src={heroBg}
//             alt=""
//             className="w-full h-full object-cover opacity-20"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
//         </div>
  
//         {/* ── Floating orb — top-left ───────────────────────────
//             Uses vw/vh-based sizing via inline style so it scales
//             with the viewport instead of being a fixed 500 px blob.
//         ───────────────────────────────────────────────────────── */}
//         <motion.div
//           className="absolute rounded-full opacity-20 pointer-events-none"
//           style={{
//             width: "clamp(180px, 35vw, 500px)",
//             height: "clamp(180px, 35vw, 500px)",
//             top: "5%",
//             left: "-5%",
//             background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)",
//           }}
//           animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
  
//         {/* ── Floating orb — top-right ──────────────────────────── */}
//         <motion.div
//           className="absolute rounded-full opacity-15 pointer-events-none"
//           style={{
//             width: "clamp(120px, 22vw, 300px)",
//             height: "clamp(120px, 22vw, 300px)",
//             top: "8%",
//             right: "4%",
//             background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)",
//           }}
//           animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
  
//         {/* ── Content ───────────────────────────────────────────────
//             max-w keeps it readable on ultrawide monitors.
//             px scales from tight mobile to comfortable desktop.
//             py gives breathing room so nothing clips the header / dots.
//             text-center on all sizes — adjust to text-left if needed.
//         ───────────────────────────────────────────────────────────── */}
//         <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-6 py-12 sm:py-28 text-center">
  
    
  
//           {/* Headline
//               clamp() gives smooth fluid scaling between breakpoints:
//               min 2.5 rem (mobile) → preferred 8vw → max 6 rem (desktop)
//           */}
//           <motion.h1
//             className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
//             style={{ fontSize: "clamp(2.5rem, 4vw, 6rem)" }}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//           >
//            CONTINUOUS LEARNING LOOP <span className="gradient-text">Your Expertise</span>
//             <br />
//             Smarter
//           </motion.h1>
  

//         <motion.p
//           className="text-muted-foreground mx-auto"
//           style={{
//             fontSize: "clamp(0.68rem, 1.1vw, 0.95rem)",
//             maxWidth: "min(520px, 92%)",
//             lineHeight: 1.5,
//             marginBottom: "clamp(10px, 2vh, 22px)",
//           }}
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.35, duration: 0.7 }}
//         >
//           When you correct flagged reports, our Federated Knowledge engine securely captures insights.
//           Your daily work actively enhances system intelligence.
//         </motion.p>

//         {/* ── Live step indicator strip ── */}
//         <div
//           className="flex items-center justify-center gap-1 mx-auto"
//           style={{ marginBottom: "clamp(8px, 1.5vh, 16px)" }}
//         >
//           {sequence.map((s, i) => (
//             <button
//               key={i}
//               onClick={() => go(i)}
//               style={{
//                 width: i === active ? "clamp(20px, 3vw, 32px)" : "clamp(5px, 0.7vw, 8px)",
//                 height: "clamp(5px, 0.7vw, 8px)",
//                 borderRadius: "9999px",
//                 backgroundColor: i === active ? item.accent : "hsl(var(--muted))",
//                 transition: "all 0.35s ease",
//                 border: "none",
//                 cursor: "pointer",
//                 padding: 0,
//               }}
//             />
//           ))}
//         </div>

//         {/* ── The single animated card ── */}
//         <div
//           className="relative mx-auto overflow-hidden"
//           style={{
//             height: "clamp(200px, 34vh, 340px)",
//             borderRadius: "clamp(14px, 2vw, 22px)",
//           }}
//         >
//           <AnimatePresence mode="wait" custom={dir}>
//             <motion.div
//               key={active}
//               custom={dir}
//               variants={{
//                 enter: (d) => ({ opacity: 0, x: d * 60, scale: 0.96 }),
//                 center: { opacity: 1, x: 0, scale: 1 },
//                 exit: (d) => ({ opacity: 0, x: d * -60, scale: 0.96 }),
//               }}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
//               className={`absolute inset-0 bg-gradient-to-br ${item.bg} border ${item.border} backdrop-blur-sm`}
//               style={{
//                 borderRadius: "clamp(14px, 2vw, 22px)",
//                 padding: "clamp(14px, 2.5vw, 28px)",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//               }}
//             >
//               {/* Top row: tag + badge */}
//               <div className="flex items-start justify-between gap-2">
//                 <div
//                   className="flex items-center gap-1.5 rounded-full font-semibold"
//                   style={{
//                     color: item.accent,
//                     backgroundColor: `${item.accent}18`,
//                     border: `1px solid ${item.accent}35`,
//                     padding: "clamp(3px, 0.5vw, 5px) clamp(8px, 1.2vw, 14px)",
//                     fontSize: "clamp(0.6rem, 0.85vw, 0.76rem)",
//                   }}
//                 >
//                   {item.icon}
//                   {item.tag}
//                 </div>
//                 <span
//                   className="rounded-full font-medium"
//                   style={{
//                     color: item.badgeColor,
//                     backgroundColor: `${item.badgeColor}15`,
//                     border: `1px solid ${item.badgeColor}30`,
//                     padding: "clamp(3px, 0.5vw, 5px) clamp(8px, 1.2vw, 12px)",
//                     fontSize: "clamp(0.58rem, 0.8vw, 0.72rem)",
//                   }}
//                 >
//                   {item.badge}
//                 </span>
//               </div>

//               {/* Center: title + body */}
//               <div className="text-left">
//                 <h2
//                   className="font-bold text-foreground mb-1"
//                   style={{ fontSize: "clamp(1rem, 1.8vw, 1.6rem)", lineHeight: 1.2 }}
//                 >
//                   {item.title}
//                 </h2>
//                 <p
//                   className="text-muted-foreground whitespace-pre-line leading-relaxed"
//                   style={{ fontSize: "clamp(0.68rem, 1vw, 0.88rem)" }}
//                 >
//                   {item.body}
//                 </p>
//               </div>

//               {/* Bottom: step counter + next hint */}
//               <div className="flex items-center justify-between">
//                 <span
//                   className="font-mono font-semibold"
//                   style={{ color: item.accent, fontSize: "clamp(0.6rem, 0.85vw, 0.75rem)" }}
//                 >
//                   {String(active + 1).padStart(2, "0")} / {String(sequence.length).padStart(2, "0")}
//                 </span>
//                 <div
//                   className="flex items-center gap-1 opacity-50"
//                   style={{ fontSize: "clamp(0.58rem, 0.8vw, 0.7rem)" }}
//                 >
//                   <span className="text-muted-foreground">Next</span>
//                   <ArrowRight className="w-3 h-3 text-muted-foreground" />
//                 </div>
//               </div>

//               {/* Progress bar sweeping across the bottom */}
//               <motion.div
//                 className="absolute bottom-0 left-0 h-0.5 rounded-full"
//                 style={{ backgroundColor: item.accent }}
//                 initial={{ width: "0%" }}
//                 animate={{ width: "100%" }}
//                 transition={{ duration: 3.8, ease: "linear" }}
//                 key={`bar-${active}`}
//               />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatSection;