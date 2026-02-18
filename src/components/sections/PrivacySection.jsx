// import { motion } from "framer-motion";
// import { Shield, WifiOff, Lock, Server, Eye } from "lucide-react";
// import heroBg from "../../assets/hero-bg.jpg";

// const PrivacySection = () => {
//   return (
//     <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
//        <div className="absolute inset-0">
//               <img
//                 src={heroBg}
//                 alt=""
//                 className="w-full h-full object-cover opacity-20"
//               />
//               <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
//             </div>
//              <motion.div
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
//       <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-6 py-12 sm:py-28 text-center">
//   <motion.h1
//           className="font-bold tracking-tight leading-[0.95] mb-4 sm:mb-6 mt-4"
//           style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//         >
//          ENTERPRISE DEPLOYMENT <span className="gradient-text">Seamless Integration. </span>
        //   <br />
        //   Total Control.
        // </motion.h1>

//         {/* Subheading */}
        // <motion.p
        //   className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-7 sm:mb-10 leading-relaxed"
        //   initial={{ opacity: 0, y: 30 }}
        //   animate={{ opacity: 1, y: 0 }}
        //   transition={{ delay: 0.5, duration: 0.8 }}
        // >
//           Deploy AIRNotes locally to generate confidence-coded radiology reports
//           without your data ever leaving the hospital. Our Federated Knowledge engine
//           learns from your radiologists' corrections, making the system smarter with
//           every verified report.
//         </motion.p>
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
//       <div className="relative z-10 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         {/* Left - Visual */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="relative flex items-center justify-center"
//         >
//           {/* Shield graphic */}
//           <div className="relative">
//             <motion.div
//               className="w-64 h-64 rounded-full border-2 border-accent/20 flex items-center justify-center"
//               animate={{ rotate: 360 }}
//               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//             >
//               {[0, 60, 120, 180, 240, 300].map((deg) => (
//                 <motion.div
//                   key={deg}
//                   className="absolute w-3 h-3 rounded-full bg-accent/30"
//                   style={{
//                     top: `${50 - 45 * Math.cos((deg * Math.PI) / 180)}%`,
//                     left: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
//                   }}
//                   animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
//                   transition={{
//                     duration: 2,
//                     delay: deg / 360,
//                     repeat: Infinity,
//                   }}
//                 />
//               ))}
//             </motion.div>

//             <div className="absolute inset-0 flex items-center justify-center">
//               <motion.div
//                 className="w-28 h-28 rounded-2xl bg-accent/10 flex items-center justify-center glow-ring"
//                 animate={{ scale: [1, 1.05, 1] }}
//                 transition={{ duration: 3, repeat: Infinity }}
//               >
//                 <Shield className="w-14 h-14 text-accent" />
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Right */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           {/* <div className="text-sm font-semibold text-accent tracking-wide uppercase mb-4">
//             ENTERPRISE DEPLOYMENT
//           </div>

//           <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
//             Seamless Integration. <span className="gradient-text">Total Control.</span>
//           </h2>

//           <p className="text-muted-foreground text-lg leading-relaxed mb-10">
//             AIRNotes isn't just software; it's a secure appliance. We deploy directly within your hospital's firewall, integrating with your existing PACS/RIS systems. You get state-of-the-art AI that operates with full offline capability and zero data exfiltration.
//           </p> */}

//           <div className="space-y-4">
//             {[
//               {
//                 icon: WifiOff,
//                 title: "Local Inference Engine",
//                 desc: "Runs entirely on your hardware (Docker/On-prem). No internet needed for reporting.",
//               },
//               {
//                 icon: Lock,
//                 title: "Encrypted Model Shipping",
//                 desc: "Receive smarter model updates securely without opening inbound ports.",
//               },
//               {
//                 icon: Server,
//                 title: "PACS Interoperability",
//                 desc: "Native integration with HL7, FHIR, and standard hospital databases.",
//               },
//               {
//                 icon: Eye,
//                 title: "Audit-Ready Compliance",
//                 desc: "ull logging of every AI suggestion and human edit for HIPAA verification.",
//               },
//             ].map((item, i) => {
//               const Icon = item.icon; // JSX-safe dynamic component
//               return (
//                 <motion.div
//                   key={item.title}
//                   className="flex items-start gap-4 p-4 rounded-xl glass-card"
//                   initial={{ opacity: 0, x: 20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
//                   viewport={{ once: true }}
//                   whileHover={{ x: 4 }}
//                 >
//                   <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
//                     <Icon className="w-5 h-5 text-accent" />
//                   </div>

//                   <div>
//                     <div className="text-sm font-semibold">{item.title}</div>
//                     <div className="text-xs text-muted-foreground">
//                       {item.desc}
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default PrivacySection;

import { motion } from "framer-motion";
import { Shield, WifiOff, Lock, Server, Eye } from "lucide-react";
import heroBg from "../../assets/hero-bg.jpg";

const features = [
  { icon: WifiOff, title: "Local Inference Engine",   tag: "COMPUTE",     desc: "Runs on your hardware. No internet needed for reporting.", id: "SYS-01" },
  { icon: Lock,    title: "Encrypted Model Shipping", tag: "SECURITY",    desc: "Secure updates without opening inbound ports.",           id: "SYS-02" },
  { icon: Server,  title: "PACS Interoperability",    tag: "INTEGRATION", desc: "Native HL7, FHIR & hospital database support.",           id: "SYS-03" },
  { icon: Eye,     title: "Audit-Ready Compliance",   tag: "HIPAA",       desc: "Full AI suggestion & human edit logging.",                id: "SYS-04" },
];

const PrivacySection = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      </div>

     
      {/* Diagonal accent line top-left */}
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

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 flex flex-col gap-4 py-6">

        {/* ── HEADLINE ── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top label bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "10px" }}>
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.5))" }} />
            <span style={{ fontSize: "9px", letterSpacing: "3px", fontWeight: 700, color: "rgba(14,165,233,0.7)", fontFamily: "monospace" }}>
              ENTERPRISE DEPLOYMENT
            </span>
            <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, rgba(14,165,233,0.5), transparent)" }} />
          </div>

          <h1 className="font-bold tracking-tight leading-none mb-2" style={{ fontSize: "clamp(1.9rem, 4.2vw, 4rem)" }}>
            <span className="gradient-text">Seamless Integration.</span>{" "}
            <span style={{ color: "#0f172a" }}>Total Control.</span>
          </h1>
          <p className="text-muted-foreground mx-auto" style={{ fontSize: "clamp(11px, 1.15vw, 13.5px)", maxWidth: "500px", lineHeight: 1.6 }}>
            Deploy AIRNotes locally — confidence-coded radiology reports, zero data exfiltration,
            federated learning from every verified correction.
          </p>
        </motion.div>

        {/* ── BODY: Left radar panel + Right scan list ── */}
        <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "16px", alignItems: "stretch" }}>

          {/* ══ LEFT: Radial security panel ══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(14,165,233,0.2)",
              borderRadius: "18px",
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
              boxShadow: "0 4px 32px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Corner bracket top-left */}
            <div style={{ position: "absolute", top: "10px", left: "10px", width: "14px", height: "14px", borderTop: "1.5px solid rgba(14,165,233,0.4)", borderLeft: "1.5px solid rgba(14,165,233,0.4)" }} />
            <div style={{ position: "absolute", top: "10px", right: "10px", width: "14px", height: "14px", borderTop: "1.5px solid rgba(14,165,233,0.4)", borderRight: "1.5px solid rgba(14,165,233,0.4)" }} />
            <div style={{ position: "absolute", bottom: "10px", left: "10px", width: "14px", height: "14px", borderBottom: "1.5px solid rgba(14,165,233,0.4)", borderLeft: "1.5px solid rgba(14,165,233,0.4)" }} />
            <div style={{ position: "absolute", bottom: "10px", right: "10px", width: "14px", height: "14px", borderBottom: "1.5px solid rgba(14,165,233,0.4)", borderRight: "1.5px solid rgba(14,165,233,0.4)" }} />

            {/* Radial pulse diagram */}
            <div style={{ position: "relative", width: "150px", height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Concentric rings */}
              {[100, 72, 46].map((size, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    width: size, height: size,
                    borderRadius: "50%",
                    border: `1px solid rgba(14,165,233,${0.15 - i * 0.04})`,
                    background: i === 2 ? "rgba(14,165,233,0.04)" : "transparent",
                  }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                />
              ))}
              {/* Rotating sweep line */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "50px", height: "1px",
                  background: "linear-gradient(90deg, rgba(14,165,233,0.7), transparent)",
                  transformOrigin: "0% 50%",
                  left: "50%", top: "50%",
                  transform: "translateY(-50%)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              {/* Center shield */}
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(16,185,129,0.15))",
                border: "1px solid rgba(14,165,233,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2,
              }}>
                <Shield size={16} color="#0369ad" strokeWidth={1.5} />
              </div>
              {/* Blip dots on rings */}
              {[[0, 35], [120, 22], [240, 30]].map(([angle, r], i) => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <motion.div key={i}
                    style={{
                      position: "absolute",
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "#1083b9",
                      left: `calc(50% + ${r * Math.cos(rad)}px - 2px)`,
                      top: `calc(50% + ${r * Math.sin(rad)}px - 2px)`,
                      boxShadow: "0 0 6px #1067b9",
                    }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  />
                );
              })}
            </div>

            {/* Status label */}
            <div style={{ textAlign: "center"  , marginBottom: "6px"}}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", marginBottom: "3px" }}>
                <motion.div
                  style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1089b9", boxShadow: "0 0 6px #1075b9" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2px", color: "#1067b9", fontFamily: "monospace" }}>SECURE ACTIVE</span>
              </div>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontFamily: "monospace" }}>Appliance · On-Premise</span>
            </div>

            {/* 3 stat bars */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { label: "Data Exfiltration", value: "ZERO",   fill: 3,   color: "#0ea5e9" },
                { label: "Offline Uptime",    value: "100%",   fill: 100, color: "#1089b9" },
                { label: "PACS Coverage",     value: "NATIVE", fill: 88,  color: "#1a63eb" },
              ].map((s, i) => (
                <div key={s.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "10.5px", color: "#94a3b8", fontFamily: "monospace" }}>{s.label}</span>
                    <span style={{ fontSize: "10.5px", fontWeight: 800, color: s.color, fontFamily: "monospace" }}>{s.value}</span>
                  </div>
                  <div style={{ height: "2px", background: "rgba(0,0,0,0.06)", borderRadius: "99px", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.fill}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                      style={{
                        height: "100%", borderRadius: "99px",
                        background: s.fill <= 4
                          ? `repeating-linear-gradient(90deg,${s.color} 0,${s.color} 2px,transparent 2px,transparent 5px)`
                          : `linear-gradient(90deg, ${s.color}99, ${s.color})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ══ RIGHT: Feature scan lines ══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.75)",
                    borderLeft: "2px solid rgba(14,165,233,0.35)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    display: "grid",
                    gridTemplateColumns: "26px 36px 1fr auto",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "0 1px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
                    cursor: "default",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    flex: 1,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle scan shimmer on hover */}
                  <motion.div
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(90deg, transparent 0%, rgba(14,165,233,0.04) 50%, transparent 100%)",
                      pointerEvents: "none",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
                  />

                  {/* ID */}
                  <span style={{ fontSize: "8px", fontWeight: 700, color: "rgba(14,165,233,0.35)", fontFamily: "monospace", letterSpacing: "0.5px", lineHeight: 1.3 }}>
                    {item.id}
                  </span>

                  {/* Icon pill */}
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "9px",
                    background: "rgba(3,105,173,0.07)",
                    border: "1px solid rgba(14,165,233,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={15} color="#0369ad" strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "2px" }}>
                      <h3 style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a", margin: 0, whiteSpace: "nowrap" }}>
                        {item.title}
                      </h3>
                      <span style={{
                        fontSize: "7px", fontWeight: 700, letterSpacing: "1.5px",
                        color: "rgba(3,105,173,0.55)", fontFamily: "monospace",
                        background: "rgba(3,105,173,0.06)",
                        border: "1px solid rgba(3,105,173,0.14)",
                        borderRadius: "3px", padding: "1px 5px", flexShrink: 0,
                      }}>
                        {item.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Live status dot */}
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                    <motion.div
                      style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 5px #10b981" }}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                    <span style={{ fontSize: "8px", color: "#10b981", fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.5px" }}>ON</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default PrivacySection;