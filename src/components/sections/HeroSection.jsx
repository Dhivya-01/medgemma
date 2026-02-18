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


import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  animate,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBg from "../../assets/hero-bg.jpg";




const cycleWords = ["Smarter", "Faster", "Safer", "Better"];
function TypeCycler() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % cycleWords.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: "inline-block", position: "relative", minWidth: "2.8em" }}>
      <AnimatePresence mode="wait">
        <motion.span key={cycleWords[idx]}
          style={{
            display: "inline-block",
            // background: "linear-gradient(135deg, hsl(162 72% 32%), hsl(210 80% 48%), hsl(162 65% 40%))",
          
          }}
          className="gradient-text"
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -22, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {cycleWords[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ══════════════════════════════════════════════════════
   MAGNETIC BUTTON
══════════════════════════════════════════════════════ */
function MagneticButton({ children, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ x: sx, y: sy, ...style }} whileTap={{ scale: 0.96 }}>
      {children}
    </motion.button>
  );
}

/* ══════════════════════════════════════════════════════
   LIVE DOT
══════════════════════════════════════════════════════ */
function LiveDot({ delay = 0 }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span style={{
      position: "absolute", top: 10, right: 10,
      width: 7, height: 7, borderRadius: "50%",
      background: active ? "hsl(192, 72%, 40%)" : "hsl(210, 25%, 78%)",
      boxShadow: active ? "0 0 0 2.5px hsl(162 72% 40% / 0.18), 0 0 10px hsl(162 72% 40% / 0.55)" : "none",
      transition: "background 0.6s, box-shadow 0.6s",
      animation: active ? "livepulse 2.8s ease-in-out infinite" : "none",
    }} />
  );
}

/* ══════════════════════════════════════════════════════
   STAT CARD  (3D tilt + spotlight + scan line + shimmer)
══════════════════════════════════════════════════════ */
function StatCard({ stat, index, enterDelay }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [scanY, setScanY] = useState(50);
  const rX = useSpring(0, { stiffness: 220, damping: 22 });
  const rY = useSpring(0, { stiffness: 220, damping: 22 });

  const onMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rX.set(((y - rect.height / 2) / rect.height) * -10);
    rY.set(((x - rect.width / 2) / rect.width) * 10);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    setScanY((y / rect.height) * 100);
  };
  const onLeave = () => { rX.set(0); rY.set(0); setHovered(false); };

  return (
    <motion.div ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 700)}
      style={{
        rotateX: rX, rotateY: rY,
        transformStyle: "preserve-3d",
        position: "relative", display: "flex", flexDirection: "column",
        alignItems: "flex-start", gap: 5,
        padding: "clamp(14px,2.5vw,20px) clamp(16px,2.8vw,22px) clamp(12px,2vw,16px)",
        background: hovered ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.84)",
        border: `1px solid ${hovered ? "hsl(162 60% 56% / 0.55)" : "hsl(170 50% 72% / 0.35)"}`,
        borderRadius: 10, overflow: "hidden",
        backdropFilter: "blur(18px)",
        boxShadow: hovered
          ? "0 12px 48px hsl(162 60% 40% / 0.16), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)"
          : "0 2px 14px rgba(0,0,0,0.055), inset 0 1px 0 rgba(255,255,255,0.9)",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        cursor: "default", willChange: "transform",
      }}
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: enterDelay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Spotlight */}
      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 10,
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, hsl(162 70% 55% / 0.1) 0%, transparent 62%)`,
            }} />
        )}
      </AnimatePresence>

      {/* Scan line */}
      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "absolute", left: 0, right: 0, height: 1,
              top: `${scanY}%`, transform: "translateY(-50%)",
              background: "linear-gradient(90deg, transparent, hsl(162 72% 50% / 0.45), transparent)",
              pointerEvents: "none",
            }} />
        )}
      </AnimatePresence>

      {/* Entry shimmer sweep */}
      <motion.div
        style={{
          position: "absolute", top: 0, height: "100%", width: "60%",
          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.38) 50%, transparent 70%)",
          pointerEvents: "none",
        }}
        initial={{ left: "-60%" }}
        animate={{ left: "160%" }}
        transition={{ delay: enterDelay + 0.15, duration: 0.85, ease: "easeInOut" }}
      />

      {/* Brackets */}
      <span style={{ position:"absolute",top:7,left:7,width:11,height:11,
        borderTop:`1.5px solid hsl(197, 65%, 42%)`, borderLeft:`1.5px solid hsl(192, 65%, 42%)`,
        opacity: hovered ? 0.9 : 0.42, transition:"opacity 0.3s" }} />
      <span style={{ position:"absolute",bottom:7,right:7,width:11,height:11,
        borderBottom:`1.5px solid hsl(199, 65%, 42%)`, borderRight:`1.5px solid hsl(212, 65%, 42%)`,
        opacity: hovered ? 0.9 : 0.42, transition:"opacity 0.3s" }} />

      {/* <LiveDot delay={800 + index * 180} /> */}

      {/* Icon */}
      {/* <motion.div
        style={{ fontSize:"clamp(15px,2vw,19px)", lineHeight:1, color:"hsl(189, 65%, 32%)", marginBottom:2 }}
        animate={{ opacity: hovered ? 0.7 : 0.32 }}
        transition={{ duration: 0.25 }}
      >
        {stat.icon}
      </motion.div> */}

      {/* Value */}
      <div   className="gradient-text" style={{
        fontFamily:"'DM Mono','Courier New',monospace",
        fontSize:"clamp(0.88rem,1.6vw,1.15rem)", fontWeight:600, letterSpacing:"-0.02em"
        // background:"linear-gradient(135deg,hsl(202, 71%, 26%),hsl(210 80% 44%))",
        // WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        // backgroundClip:"text", lineHeight:1.1,
       
      }}>{stat.value}</div>

      {/* Label */}
      <div style={{
        fontFamily:"'DM Mono','Courier New',monospace",
        fontSize:"clamp(0.5rem,0.8vw,0.62rem)", letterSpacing:"0.1em",
        textTransform:"uppercase", color:"hsl(215 18% 52%)",
        whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"100%",
      }}>{stat.label}</div>

      {/* Progress bar */}
      <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:8, width:"100%" }}>
        <div style={{ flex:1, height:2, background:"hsl(170 40% 88%)", borderRadius:2, position:"relative", overflow:"hidden" }}>
          <motion.div
            style={{
              position:"absolute", left:0, top:0, bottom:0,
              // background:"linear-gradient(90deg,hsl(194, 65%, 36%),hsl(210 78% 50%))",
              borderRadius:2,
            }}
            initial={{ width:0 }}
            animate={{ width: stat.barW }}
            transition={{ delay: enterDelay + 0.5, duration: 1.4, ease:"easeOut" }}
          />
          {/* Bar shimmer */}
          <motion.div
            style={{
              position:"absolute", top:0, bottom:0, width:"30%",
              background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)",
            }}
            animate={{ left:["-30%","130%"] }}
            transition={{ delay: enterDelay + 2, duration: 1.1, repeat: Infinity, repeatDelay:3.5 }}
          />
        </div>
        <span style={{
          fontFamily:"'DM Mono','Courier New',monospace",
          fontSize:"0.48rem", letterSpacing:"0.14em",
          color:"hsl(162 45% 40% / 0.6)", flexShrink:0,
        }}>SYS OK</span>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════════════════ */
const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stats = [
    { value: "100% On-Prem", label: "Data Sovereignty",        icon: "⬡", barW: "90%" },
    { value: "Active Loop",  label: "Human-Verified Feedback", icon: "◎", barW: "75%" },
    { value: "Federated",    label: "Continuous Learning",     icon: "⊕", barW: "85%" },
  ];

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

     
       

        {/* ── Content ──────────────────────────────────── */}
              <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-6 py-12 sm:py-28 text-center">


         

          {/* Headline — word-by-word stagger */}
          <div 
            className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        
          >
            {["AI", "That"].map((word, wi) => (
              <motion.span key={word}
                style={{ display:"inline-block", marginRight:"0.28em" }}
                initial={{ opacity:0, y:44, filter:"blur(6px)" }}
                animate={{ opacity:1, y:0, filter:"blur(0px)" }}
                transition={{ delay:0.3 + wi * 0.12, duration:0.8, ease:[0.22,1,0.36,1] }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              style={{ display:"inline-block" }}
              initial={{ opacity:0, y:44, filter:"blur(6px)" }}
              animate={{ opacity:1, y:0, filter:"blur(0px)" }}
              transition={{ delay:0.54, duration:0.8, ease:[0.22,1,0.36,1] }}
            >
              <TypeCycler />
            </motion.span>
          </div>

          {/* Subheading */}
          <motion.p
            style={{
              fontSize:"clamp(0.82rem,1.55vw,1.12rem)",
              color:"hsl(215 18% 48%)", lineHeight:1.72,
              maxWidth:"min(44rem,92vw)", margin:"0 auto",
              marginBottom:"clamp(1.6rem,3.5vw,2.8rem)",
              fontWeight:300,
            }}
            initial={{ opacity:0, y:28 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.65, duration:0.85 }}
          >
            Deploy AIRNotes locally to generate confidence-coded radiology reports
            without your data ever leaving the hospital. Our{" "}
            <motion.span
              style={{
                fontWeight:600,
                background:"linear-gradient(135deg,hsl(162 65% 30%),hsl(210 75% 44%))",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay:1.1, duration:0.6 }}
            >
              Federated Knowledge engine
            </motion.span>{" "}
            learns from your radiologists' corrections, making the system smarter with every verified report.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            style={{
              display:"flex", flexWrap:"wrap",
              alignItems:"center", justifyContent:"center",
              gap:"clamp(0.6rem,1.5vw,1rem)",
            }}
            initial={{ opacity:0, y:22 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.82, duration:0.75 }}
          >
            <MagneticButton style={{
              display:"inline-flex", alignItems:"center", gap:9,
              padding:"clamp(0.68rem,1.6vw,1.05rem) clamp(1.5rem,3.2vw,2.2rem)",
              borderRadius:9999, fontWeight:700,
              fontFamily:"'Sora',sans-serif",
              fontSize:"clamp(0.8rem,1.2vw,1rem)", color:"#fff",
              background: "var(--gradient-accent)" ,
              border:"none", cursor:"pointer",
              boxShadow:"0 4px 24px hsl(162 65% 38% / 0.32), inset 0 1px 0 rgba(255,255,255,0.2)",
              whiteSpace:"nowrap", position:"relative", overflow:"hidden",
            }}>
              {/* Button shimmer */}
              <motion.span style={{
                position:"absolute", inset:0,
                background:"linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.22) 50%,transparent 65%)",
                pointerEvents:"none",
              }}
                animate={{ left:["-100%","200%"] }}
                transition={{ duration:2.4, repeat:Infinity, repeatDelay:2, ease:"easeInOut" }}
              />
              See How It Works
              <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.6, repeat:Infinity, ease:"easeInOut" }}>
                <ArrowRight style={{ width:"clamp(14px,1.2vw,16px)", height:"clamp(14px,1.2vw,16px)" }} />
              </motion.span>
            </MagneticButton>

            <MagneticButton style={{
              padding:"clamp(0.68rem,1.6vw,1.05rem) clamp(1.5rem,3.2vw,2.2rem)",
              borderRadius:9999, fontWeight:600,
              fontFamily:"'Sora',sans-serif",
              fontSize:"clamp(0.8rem,1.2vw,1rem)",
              color:"hsl(215 28% 28%)",
              background:"rgba(255,255,255,0.88)",
              border:"1px solid hsl(170 40% 74% / 0.5)",
              cursor:"pointer", boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
              whiteSpace:"nowrap", backdropFilter:"blur(10px)",
            }}>
              Schedule Demo
            </MagneticButton>
          </motion.div>

          {/* Trust tags */}
          <motion.div
            style={{
              display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center",
              gap:"clamp(4px,1vw,8px)", marginTop:"clamp(1.4rem,3vw,2.2rem)",
            }}
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:1.15, duration:0.8 }}
          >
            {["HIPAA Ready", "SOC 2 Aligned", "HL7 FHIR Native"].map((tag, ti) => (
              <motion.span key={tag}
                style={{
                  fontFamily:"'DM Mono',monospace",
                  fontSize:"clamp(0.46rem,0.72vw,0.56rem)",
                  letterSpacing:"0.12em", textTransform:"uppercase",
                  color:"hsl(215 18% 52%)",
                  padding:"3px 9px", borderRadius:4,
                  background:"rgba(255,255,255,0.72)",
                  border:"1px solid hsl(170 35% 80% / 0.5)",
                }}
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                transition={{ delay:1.2 + ti * 0.1, duration:0.5 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Stat Cards */}
          <motion.div
            style={{ marginTop:"clamp(2rem,5vw,4.5rem)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:1.0, duration:0.6 }}
          >
            {/* SYSTEM STATUS header */}
            <motion.div
              style={{
                display:"flex", alignItems:"center", gap:10,
                width:"100%", maxWidth:"min(44rem,95vw)",
                margin:"0 auto clamp(8px,1.5vw,14px)",
              }}
              initial={{ opacity:0, scaleX:0.7 }}
              animate={{ opacity:1, scaleX:1 }}
              transition={{ delay:1.05, duration:0.7, ease:"easeOut" }}
            >
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,hsl(162 60% 55% / 0.28),transparent)" }} />
              <span style={{
                fontFamily:"'DM Mono','Courier New',monospace",
                fontSize:"clamp(0.48rem,0.7vw,0.56rem)",
                letterSpacing:"0.22em", textTransform:"uppercase",
                color:"hsl(162 45% 38% / 0.6)", whiteSpace:"nowrap",
              }}>SYSTEM STATUS</span>
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg,hsl(162 60% 55% / 0.28),transparent)" }} />
            </motion.div>

            {/* Cards grid */}
            <div style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(clamp(148px,26vw,198px),1fr))",
              gap:"clamp(8px,1.4vw,13px)",
              width:"100%", maxWidth:"min(44rem,95vw)",
              margin:"0 auto",
            }}>
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} enterDelay={1.1 + i * 0.13} />
              ))}
            </div>
          </motion.div>

        </div>
      
    </div>
  );
};

export default HeroSection;



// import { useState,useEffect } from "react";
// import { motion } from "framer-motion";
// import { ArrowRight, Sparkles } from "lucide-react";
// import heroBg from "../../assets/hero-bg.jpg";


// function LiveDot({ delay }) {
//   const [active, setActive] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setActive(true), delay);
//     return () => clearTimeout(t);
//   }, [delay]);
//   return (
//     <span style={{
//       position: "absolute", top: 10, right: 10,
//       width: 6, height: 6, borderRadius: "50%",
//       background: active ? "hsl(175 70% 42%)" : "hsl(175 30% 75%)",
//       boxShadow: active ? "0 0 6px hsl(175 70% 42% / 0.7)" : "none",
//       transition: "background 0.5s, box-shadow 0.5s",
//       animation: active ? "pdot 2.5s infinite" : "none",
//     }} />
//   );
// }



// const HeroSection = () => {

//    const stats = [
//     { value: "100% On-Prem", label: "Data Sovereignty",        icon: "⬡", barW: "90%" },
//     { value: "Active Loop",  label: "Human-Verified Feedback", icon: "◎", barW: "75%" },
//     { value: "Federated",    label: "Continuous Learning",     icon: "⊕", barW: "85%" },
//   ]
//   return (
//     /*
//       Full viewport height + width, relative so absolute children are clipped.
//       flex column centres content vertically & horizontally on every screen.
//     */
    // <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

    //   {/* ── Background image ─────────────────────────────────── */}
    //   <div className="absolute inset-0">
    //     <img
    //       src={heroBg}
    //       alt=""
    //       className="w-full h-full object-cover opacity-20"
    //     />
    //     <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
    //   </div>

    //   {/* ── Floating orb — top-left ───────────────────────────
    //       Uses vw/vh-based sizing via inline style so it scales
    //       with the viewport instead of being a fixed 500 px blob.
    //   ───────────────────────────────────────────────────────── */}
    //   <motion.div
    //     className="absolute rounded-full opacity-20 pointer-events-none"
    //     style={{
    //       width: "clamp(180px, 35vw, 500px)",
    //       height: "clamp(180px, 35vw, 500px)",
    //       top: "5%",
    //       left: "-5%",
    //       background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)",
    //     }}
    //     animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
    //     transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    //   />

    //   {/* ── Floating orb — top-right ──────────────────────────── */}
    //   <motion.div
    //     className="absolute rounded-full opacity-15 pointer-events-none"
    //     style={{
    //       width: "clamp(120px, 22vw, 300px)",
    //       height: "clamp(120px, 22vw, 300px)",
    //       top: "8%",
    //       right: "4%",
    //       background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)",
    //     }}
    //     animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
    //     transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    //   />

//       {/* ── Content ───────────────────────────────────────────────
//           max-w keeps it readable on ultrawide monitors.
//           px scales from tight mobile to comfortable desktop.
//           py gives breathing room so nothing clips the header / dots.
//           text-center on all sizes — adjust to text-left if needed.
//       ───────────────────────────────────────────────────────────── */}
      // <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-6 py-12 sm:py-28 text-center">

  

//         {/* Headline
//             clamp() gives smooth fluid scaling between breakpoints:
//             min 2.5 rem (mobile) → preferred 8vw → max 6 rem (desktop)
//         */}
//         <motion.h1
        //   className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
        //   style={{ fontSize: "clamp(2.5rem, 4vw, 6rem)" }}
        //   initial={{ opacity: 0, y: 40 }}
        //   animate={{ opacity: 1, y: 0 }}
        //   transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        // >
//           AI That <span className="gradient-text">Heals</span>  Smarter
         
//         </motion.h1>

//         {/* Subheading */}
//         <motion.p
//           className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           Deploy AIRNotes locally to generate confidence-coded radiology reports
//           without your data ever leaving the hospital. Our Federated Knowledge engine
//           learns from your radiologists' corrections, making the system smarter with
//           every verified report.
//         </motion.p>

//         {/* CTA Buttons */}
//         <motion.div
//           className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7, duration: 0.7 }}
//         >
//           <motion.button
//             className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-accent-foreground transition-all w-full sm:w-auto justify-center"
//             style={{ background: "var(--gradient-accent)" }}
//             whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(175 80% 40% / 0.3)" }}
//             whileTap={{ scale: 0.98 }}
//           >
//             See How It Works
//             <ArrowRight className="w-4 h-4" />
//           </motion.button>

//           <motion.button
//             className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-foreground glass-card border border-border w-full sm:w-auto"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Schedule Demo
//           </motion.button>
//         </motion.div>

//         {/* Stats
//             On mobile: single column → 3-col on sm and up.
//             mt scales from snug (mt-10) on small screens to spacious (mt-20) on large.
//         */}
//         <div style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//         gap: 12,
//         width: "100%",
//         maxWidth: 680,
//       }}>
//         {stats.map((stat, i) => (
//           <motion.div
//             key={stat.label}
//             style={{
//               position: "relative",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-start",
//               gap: 5,
//               padding: "18px 20px 14px",
//               background: "rgba(255,255,255,0.88)",
//               border: "1px solid hsl(175 60% 70% / 0.35)",
//               borderRadius: 6,
//               overflow: "hidden",
//               backdropFilter: "blur(12px)",
//               boxShadow: "0 2px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
//             }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 + i * 0.13, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//             whileHover={{
//               borderColor: "hsl(175 60% 55% / 0.6)",
//               boxShadow: "0 4px 28px hsl(175 60% 50% / 0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
//               background: "rgba(255,255,255,0.98)",
//             }}
//           >
//             {/* Brackets */}
//             <span style={{ position:"absolute",top:7,left:7,width:10,height:10,
//               borderTop:"1.5px solid hsl(175 65% 45%)",borderLeft:"1.5px solid hsl(175 65% 45%)",opacity:0.55 }} />
//             <span style={{ position:"absolute",bottom:7,right:7,width:10,height:10,
//               borderBottom:"1.5px solid hsl(175 65% 45%)",borderRight:"1.5px solid hsl(175 65% 45%)",opacity:0.55 }} />

//             <LiveDot delay={600 + i * 200} />

           

//             {/* Value */}
//             <div style={{
//               fontFamily:"'DM Mono','Courier New',monospace",
//               fontSize:"clamp(0.9rem,1.8vw,1.15rem)",
//               fontWeight:600,
//               letterSpacing:"-0.02em",
//               background:"linear-gradient(135deg,hsl(175 70% 28%),hsl(215 80% 45%))",
//               WebkitBackgroundClip:"text",
//               WebkitTextFillColor:"transparent",
//               backgroundClip:"text",
//               lineHeight:1.1,
//             }}>{stat.value}</div>

//             {/* Label */}
//             <div style={{
//               fontFamily:"'DM Mono','Courier New',monospace",
//               fontSize:"clamp(0.52rem,0.85vw,0.63rem)",
//               letterSpacing:"0.1em",
//               textTransform:"uppercase",
//               color:"hsl(215 20% 52%)",
//               whiteSpace:"nowrap",
//             }}>{stat.label}</div>

//             {/* Progress bar */}
//             <div style={{ display:"flex",alignItems:"center",gap:7,marginTop:7,width:"100%" }}>
//               <div style={{ flex:1,height:2,background:"hsl(175 40% 87%)",borderRadius:2,position:"relative",overflow:"hidden" }}>
//                 <motion.div
//                   style={{
//                     position:"absolute",left:0,top:0,bottom:0,
//                     background:"linear-gradient(90deg,hsl(175 65% 38%),hsl(215 80% 52%))",
//                     borderRadius:2,
//                   }}
//                   initial={{ width:0 }}
//                   animate={{ width: stat.barW }}
//                   transition={{ delay: 0.8 + i * 0.15, duration:1.2, ease:"easeOut" }}
//                 />
//               </div>
//               <span style={{
//                 fontFamily:"'DM Mono','Courier New',monospace",
//                 fontSize:"0.5rem",letterSpacing:"0.12em",
//                 color:"hsl(175 50% 42% / 0.6)",
//               }}>SYS OK</span>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//         {/* <motion.div
//           className="mt-10 sm:mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-xl mx-auto"
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
//               className="text-center py-3 sm:py-0"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.1 + i * 0.15 }}
//             >
              
//               <div
//                 className="font-bold gradient-text"
//                 style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)" }}
//               >
//                 {stat.value}
//               </div>
//               <div className="text-xs sm:text-sm text-muted-foreground mt-1">
//                 {stat.label}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div> */}
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
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