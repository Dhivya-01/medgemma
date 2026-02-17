// import { motion } from "framer-motion";
// import { ArrowRight, Sparkles } from "lucide-react";
// import heroBg from "../../assets/hero-bg.jpg";

// const HeroSection = () => {
//   return (
//     <div >
//       {/* Background */}
//       <div className="absolute inset-0">
//         <img
//           src={heroBg}
//           alt=""
//           className="w-full h-full object-cover opacity-20"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
//       </div>

//       {/* Floating orbs */}
//       <motion.div
//         className="absolute w-[500px] h-[500px] rounded-full opacity-20"
//         style={{
//           background:
//             "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)",
//         }}
//         animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <motion.div
//         className="absolute right-20 top-20 w-[300px] h-[300px] rounded-full opacity-15"
//         style={{
//           background:
//             "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)",
//         }}
//         animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <motion.div
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 text-sm font-medium text-muted-foreground"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             <Sparkles className="w-4 h-4 text-accent" />
//             Secure In-House Intelligence AI
//           </motion.div>
//         </motion.div>

//         <motion.h1
//           className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//         >
//           AI That <span className="gradient-text">Heals</span>
//           <br />
//           Smarter
//         </motion.h1>

//         <motion.p
//           className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           Deploy AIRNotes locally to generate confidence-coded radiology reports without your data ever leaving the hospital. Our Federated Knowledge engine learns from your radiologists' corrections, making the system smarter with every verified report.
//         </motion.p>

//         <motion.div
//           className="flex items-center justify-center gap-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.7 }}
//         >
//           <motion.button
//             className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-accent-foreground transition-all"
//             style={{ background: "var(--gradient-accent)" }}
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 0 40px hsl(175 80% 40% / 0.3)",
//             }}
//             whileTap={{ scale: 0.98 }}
//           >
//             See How It Works
//             <ArrowRight className="w-4 h-4" />
//           </motion.button>

//           <motion.button
//             className="px-8 py-4 rounded-full font-semibold text-foreground glass-card border border-border"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Schedule Demo
//           </motion.button>
//         </motion.div>

//         {/* Stats */}
//         <motion.div
//           className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 0.8 }}
//         >
//           {[
//             { value: "100% On-Prem", label: "Data Sovereignty" },
//             { value: "Active Loop", label: "Human-Verified Feedback" },
//             { value: "Federated", label: "Continuous Learning" },
//           ].map((stat, i) => (
//             <motion.div
//               key={stat.label}
//               className="text-center"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.1 + i * 0.15 }}
//             >
//               <div className="text-2xl md:text-3xl font-bold gradient-text">
//                 {stat.value}
//               </div>
//               <div className="text-sm text-muted-foreground mt-1">
//                 {stat.label}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "../../assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    /*
      Full viewport height + width, relative so absolute children are clipped.
      flex column centres content vertically & horizontally on every screen.
    */
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

      {/* ── Floating orb — top-left ───────────────────────────
          Uses vw/vh-based sizing via inline style so it scales
          with the viewport instead of being a fixed 500 px blob.
      ───────────────────────────────────────────────────────── */}
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

  

        {/* Headline
            clamp() gives smooth fluid scaling between breakpoints:
            min 2.5 rem (mobile) → preferred 8vw → max 6 rem (desktop)
        */}
        <motion.h1
          className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
          style={{ fontSize: "clamp(2.5rem, 4vw, 6rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          AI That <span className="gradient-text">Heals</span>
          <br />
          Smarter
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Deploy AIRNotes locally to generate confidence-coded radiology reports
          without your data ever leaving the hospital. Our Federated Knowledge engine
          learns from your radiologists' corrections, making the system smarter with
          every verified report.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <motion.button
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-accent-foreground transition-all w-full sm:w-auto justify-center"
            style={{ background: "var(--gradient-accent)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(175 80% 40% / 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            See How It Works
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-foreground glass-card border border-border w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule Demo
          </motion.button>
        </motion.div>

        {/* Stats
            On mobile: single column → 3-col on sm and up.
            mt scales from snug (mt-10) on small screens to spacious (mt-20) on large.
        */}
        <motion.div
          className="mt-10 sm:mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[
            { value: "100% On-Prem", label: "Data Sovereignty" },
            { value: "Active Loop", label: "Human-Verified Feedback" },
            { value: "Federated", label: "Continuous Learning" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-3 sm:py-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.15 }}
            >
              {/* Fluid font size: 1.25 rem mobile → 1.75 rem desktop */}
              <div
                className="font-bold gradient-text"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";

// /* ─────────────────────────────────────────────────────
//    HeroSection — same design as before, colors now use
//    your CSS variable tokens instead of dark hardcodes.
//    Props: isAuthOpen (bool)
//    ─────────────────────────────────────────────────── */
// const HeroSection = ({ isAuthOpen = false }) => {
//   const [activeCard, setActiveCard] = useState(0);
//   const intervalRef = useRef(null);

//   const cards = [
//     {
//       id: 0,
//       eyebrow: "SECURE IN-HOUSE INTELLIGENCE AI",
//       headline: "Secure Radiology Reporting.",
//       headlineAccent: "Self-Correcting Intelligence.",
//       body: "Deploy AIRNotes locally to generate confidence-coded radiology reports without your data ever leaving the hospital. Our Federated Knowledge engine learns from your radiologists' corrections, making the system smarter with every verified report.",
//     },
//     {
//       id: 1,
//       eyebrow: "HUMAN-VERIFIED FEDERATED LEARNING",
//       headline: "AI That Drafts.",
//       headlineAccent: "Experts Who Verify. A Model That Learns.",
//       body: "Your radiologists' expertise never leaves your walls. Every correction feeds a federated loop that continuously sharpens confidence scoring — turning institutional knowledge into compounding clinical advantage.",
//     },
//   ];

//   /* ── Auto-rotate cards every 5s ── */
//   const startRotation = () => {
//     intervalRef.current = setInterval(() => {
//       setActiveCard((prev) => (prev + 1) % cards.length);
//     }, 5000);
//   };

//   useEffect(() => {
//     startRotation();
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   const handleCardClick = (idx) => {
//     clearInterval(intervalRef.current);
//     setActiveCard(idx);
//     startRotation();
//   };

//   const stats = [
//     { label: "100% On-Prem", sub: "Data Sovereignty" },
//     { label: "Active Loop",  sub: "Human-Verified Feedback" },
//     { label: "Federated",    sub: "Continuous Learning" },
//   ];

//   const compact = isAuthOpen;
//   const card = cards[activeCard];

//   return (
//     <section
//       className="section-container grid-bg"
//       style={{ position: "relative", overflow: "hidden" }}
//     >
//       {/* ── Ambient background blobs ── */}
//       <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
//         <motion.div
//           animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.65, 0.45] }}
//           transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute"
//           style={{
//             width: compact ? "420px" : "620px",
//             height: compact ? "420px" : "620px",
//             top: "-10%",
//             right: compact ? "-5%" : "8%",
//             background: "radial-gradient(circle, hsl(var(--accent) / 0.18) 0%, transparent 70%)",
//             filter: "blur(60px)",
//           }}
//         />
//         <motion.div
//           animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
//           transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//           className="absolute"
//           style={{
//             width: compact ? "340px" : "500px",
//             height: compact ? "340px" : "500px",
//             bottom: "-5%",
//             left: compact ? "-5%" : "2%",
//             background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
//             filter: "blur(70px)",
//           }}
//         />
//       </div>

//       {/* ── Main content wrapper ── */}
//       <motion.div
//         className="relative z-10 w-full h-full flex flex-col justify-center"
//         style={{
//           padding: compact ? "80px 20px 24px" : "88px clamp(20px, 5vw, 80px) 24px",
//           maxWidth: compact ? "100%" : "1320px",
//           margin: "0 auto",
//         }}
//         layout
//         transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//       >
//         <div className="flex flex-col" style={{ gap: compact ? "20px" : "clamp(16px, 2.5vh, 32px)" }}>

//           {/* ── Card selector pills ── */}
//           <motion.div
//             className="flex gap-2"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             {cards.map((c, i) => (
//               <button
//                 key={c.id}
//                 onClick={() => handleCardClick(i)}
//                 className="relative flex items-center gap-2 rounded-full px-3 py-1 font-semibold transition-all"
//                 style={{
//                   background: activeCard === i
//                     ? "hsl(var(--accent) / 0.1)"
//                     : "hsl(var(--muted))",
//                   border: `1px solid ${activeCard === i ? "hsl(var(--accent) / 0.4)" : "hsl(var(--border))"}`,
//                   color: activeCard === i
//                     ? "hsl(var(--accent))"
//                     : "hsl(var(--muted-foreground))",
//                   fontSize: compact ? "9px" : "10px",
//                   fontFamily: "var(--font-display)",
//                   letterSpacing: "0.04em",
//                   boxShadow: activeCard === i ? "var(--shadow-glow)" : "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 <span
//                   className="w-1.5 h-1.5 rounded-full"
//                   style={{
//                     background: activeCard === i
//                       ? "hsl(var(--accent))"
//                       : "hsl(var(--muted-foreground) / 0.4)",
//                     boxShadow: activeCard === i
//                       ? "0 0 6px hsl(var(--accent) / 0.8)"
//                       : "none",
//                   }}
//                 />
//                 {i === 0 ? "Radiology AI" : "Federated Loop"}
//               </button>
//             ))}
//           </motion.div>

//           {/* ── Animated card content ── */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeCard}
//               initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
//               animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
//               exit={{   opacity: 0, y: -14, filter: "blur(4px)" }}
//               transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
//             >
//               {/* Eyebrow */}
//               <p
//                 className="font-mono tracking-widest uppercase mb-3"
//                 style={{
//                   color: "hsl(var(--accent))",
//                   fontSize: compact ? "9px" : "clamp(9px, 1vw, 11px)",
//                   letterSpacing: "0.18em",
//                 }}
//               >
//                 {card.eyebrow}
//               </p>

//               {/* Main headline */}
//               <h1
//                 className="font-display font-black leading-none tracking-tight"
//                 style={{
//                   fontSize: compact
//                     ? "clamp(26px, 5.5vw, 38px)"
//                     : "clamp(32px, 5.5vw, 72px)",
//                   color: "hsl(var(--foreground))",
//                   lineHeight: 1.05,
//                 }}
//               >
//                 {card.headline}
//                 <br />
//                 <span className="gradient-text">{card.headlineAccent}</span>
//               </h1>

//               {/* Body copy */}
//               <p
//                 className="mt-4 leading-relaxed max-w-2xl font-body"
//                 style={{
//                   color: "hsl(var(--muted-foreground))",
//                   fontSize: compact
//                     ? "clamp(12px, 1.6vw, 14px)"
//                     : "clamp(13px, 1.4vw, 16px)",
//                   display: compact ? "-webkit-box" : "block",
//                   WebkitLineClamp: compact ? 3 : "unset",
//                   WebkitBoxOrient: "vertical",
//                   overflow: compact ? "hidden" : "visible",
//                 }}
//               >
//                 {card.body}
//               </p>
//             </motion.div>
//           </AnimatePresence>

//           {/* ── CTA Buttons ── */}
//           <motion.div
//             className="flex flex-wrap items-center gap-3"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.45 }}
//           >
//             <motion.button
//               whileHover={{ scale: 1.04, filter: "brightness(1.07)" }}
//               whileTap={{ scale: 0.97 }}
//               className="flex items-center gap-2 rounded-full font-semibold"
//               style={{
//                 background: "var(--gradient-accent)",
//                 color: "hsl(var(--accent-foreground))",
//                 padding: compact ? "10px 22px" : "13px 28px",
//                 fontSize: compact ? "13px" : "14px",
//                 fontFamily: "var(--font-display)",
//                 fontWeight: 700,
//                 border: "none",
//                 cursor: "pointer",
//                 boxShadow: "var(--shadow-glow)",
//               }}
//             >
//               See How It Works
//               <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
//                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M1 7h12M8 2l5 5-5 5" />
//               </svg>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.04, background: "hsl(var(--secondary))" }}
//               whileTap={{ scale: 0.97 }}
//               className="rounded-full font-semibold"
//               style={{
//                 background: "hsl(var(--card))",
//                 border: "1px solid hsl(var(--border))",
//                 color: "hsl(var(--foreground))",
//                 padding: compact ? "10px 22px" : "13px 28px",
//                 fontSize: compact ? "13px" : "14px",
//                 fontFamily: "var(--font-display)",
//                 fontWeight: 600,
//                 cursor: "pointer",
//                 boxShadow: "var(--shadow-card)",
//               }}
//             >
//               Schedule Demo
//             </motion.button>
//           </motion.div>

//           {/* ── Progress bar ── */}
//           <div
//             className="relative overflow-hidden rounded-full"
//             style={{
//               height: "2px",
//               width: compact ? "120px" : "160px",
//               background: "hsl(var(--border))",
//             }}
//           >
//             <motion.div
//               key={activeCard}
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: 5, ease: "linear" }}
//               className="absolute inset-0 origin-left rounded-full"
//               style={{ background: "var(--gradient-accent)" }}
//             />
//           </div>

//           {/* ── Stats row ── */}
//           <motion.div
//             className="flex flex-wrap gap-x-8 gap-y-3 mt-1"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//           >
//             {stats.map((s, i) => (
//               <div key={i} className="flex flex-col">
//                 <span
//                   className="font-display font-bold"
//                   style={{
//                     color: "hsl(var(--accent))",
//                     fontSize: compact ? "13px" : "clamp(14px, 1.4vw, 16px)",
//                   }}
//                 >
//                   {s.label}
//                 </span>
//                 <span
//                   className="font-mono"
//                   style={{
//                     color: "hsl(var(--muted-foreground))",
//                     fontSize: compact ? "10px" : "11px",
//                     letterSpacing: "0.06em",
//                   }}
//                 >
//                   {s.sub}
//                 </span>
//               </div>
//             ))}
//           </motion.div>
//         </div>

//         {/* ── Floating card thumbnails (desktop, auth closed only) ── */}
//         {!compact && (
//           <motion.div
//             className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-4"
//             style={{ width: "min(36%, 380px)" }}
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.7, duration: 0.6 }}
//           >
//             {cards.map((c, i) => (
//               <motion.div
//                 key={c.id}
//                 onClick={() => handleCardClick(i)}
//                 className="cursor-pointer rounded-2xl p-5"
//                 whileHover={{ scale: 1.025, x: -4 }}
//                 animate={{
//                   opacity: activeCard === i ? 1 : 0.42,
//                   scale:   activeCard === i ? 1 : 0.97,
//                   borderColor: activeCard === i
//                     ? "hsl(var(--accent) / 0.4)"
//                     : "hsl(var(--border))",
//                   boxShadow: activeCard === i
//                     ? "var(--shadow-glow), var(--shadow-card-hover)"
//                     : "var(--shadow-card)",
//                 }}
//                 transition={{ duration: 0.3 }}
//                 style={{
//                   background: activeCard === i
//                     ? "linear-gradient(135deg, hsl(var(--accent) / 0.07), hsl(var(--card)))"
//                     : "hsl(var(--card))",
//                   border: `1px solid ${activeCard === i ? "hsl(var(--accent) / 0.35)" : "hsl(var(--border))"}`,
//                 }}
//               >
//                 {/* dot + eyebrow */}
//                 <div className="flex items-center gap-2 mb-2">
//                   <span
//                     className="w-2 h-2 rounded-full"
//                     style={{
//                       background: "hsl(var(--accent))",
//                       boxShadow: activeCard === i
//                         ? "0 0 8px hsl(var(--accent) / 0.6)"
//                         : "none",
//                     }}
//                   />
//                   <span
//                     className="font-mono tracking-widest uppercase"
//                     style={{
//                       color: activeCard === i
//                         ? "hsl(var(--accent))"
//                         : "hsl(var(--muted-foreground))",
//                       fontSize: "9px",
//                     }}
//                   >
//                     {i === 0 ? "01 / Radiology" : "02 / Federated"}
//                   </span>
//                 </div>

//                 <p
//                   className="font-display font-bold leading-snug"
//                   style={{
//                     color: activeCard === i
//                       ? "hsl(var(--foreground))"
//                       : "hsl(var(--muted-foreground))",
//                     fontSize: "13px",
//                   }}
//                 >
//                   {c.headline}
//                 </p>
//                 <p
//                   className="mt-1 gradient-text font-display font-semibold"
//                   style={{
//                     fontSize: "12px",
//                     opacity: activeCard === i ? 1 : 0.45,
//                   }}
//                 >
//                   {c.headlineAccent}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;