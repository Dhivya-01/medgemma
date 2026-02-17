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

import { motion, AnimatePresence } from "framer-motion";
import { Brain, Shield, Zap, CheckCircle, Cpu, UserCheck, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import heroBg from "../../assets/hero-bg.jpg";

// All content in a flat sequence — each card fills the space one at a time
const sequence = [
  {
    type: "ai",
    tag: "AI Draft",
    icon: <Cpu className="w-4 h-4" />,
    accent: "#2289c5",
    bg: "from-blue-500/10 to-blue-800/5",
    border: "border-cyan-500/25",
    badge: " Low Confidence 42%",
    badgeColor: "#2289c5",
    title: "Draft Report Generated",
    body: "Region: Left Lower Lobe\nSuggested finding: 'Mild Consolidation'\nVerification required before finalization.",
  },
  {
    type: "human",
    tag: "Radiologist",
    icon: <UserCheck className="w-4 h-4" />,
    accent: "#2289c5",
    bg: "from-blue-500/10 to-blue-800/5",
    border: "border-cyan-500/25",
    badge: "Verified",
    badgeColor: "#2289c5",
    title: "Correction Submitted",
    body: "Artifact rejected — no consolidation present.\nFindings confirmed. Report marked complete.",
  },
  {
    type: "system",
    tag: "System Response",
    icon: <Brain className="w-4 h-4" />,
    accent: "#2289c5",
    bg: "from-blue-500/10 to-blue-800/5",
    border: "border-cyan-500/25",
    badge: "Encrypted & Logged",
    badgeColor: "#2289c5",
    title: "Model Updated",
    body: "Weights updated for 'Artifact Differentiation'.\nLocal instance enhanced. Reviewing Report #8842…",
  },
  {
    type: "feature",
    tag: "Confidence Flags",
    icon: <Brain className="w-4 h-4" />,
    accent: "#2289c5",
    bg: "from-blue-500/10 to-blue-800/5",
    border: "border-cyan-500/25",
    badge: "Core Capability",
    badgeColor: "#2289c5",
    title: "Green / Red Indicators",
    body: "High-confidence findings shown in green.\nLow-confidence areas flagged in red for radiologist review.",
  },
  {
    type: "feature",
    tag: "Federated Updates",
    icon: <Zap className="w-4 h-4" />,
    accent: "#2289c5",
    bg: "from-blue-500/10 to-blue-800/5",
    border: "border-cyan-500/25",
    badge: "Core Capability",
    badgeColor: "#2289c5",
    title: "Global Intelligence, Local Execution",
    body: "Model improvements propagate globally.\nYour data never leaves your local infrastructure.",
  },
  {
    type: "feature",
    tag: "Zero Leakage",
    icon: <Shield className="w-4 h-4" />,
    accent: "#2289c5",
    bg: "from-blue-500/10 to-blue-800/5",
    border: "border-cyan-500/25",
    badge: "Core Capability",
    badgeColor: "#2289c5",
    title: "Only Weights Leave",
    body: "Patient data is never transmitted.\nFederated learning ensures full HIPAA compliance.",
  },
  {
    type: "feature",
    tag: "Self-Healing",
    icon: <CheckCircle className="w-4 h-4" />,
    accent: "#2289c5",
    bg: "from-blue-500/10 to-blue-800/5",
    border: "border-cyan-500/25",
    badge: "Core Capability",
    badgeColor: "#2289c5",
    title: "Accuracy Improves Automatically",
    body: "Every correction tightens the model.\nYour daily work actively trains the system intelligence.",
  },
];

const ChatSection = () => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setActive((p) => (p + 1) % sequence.length);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  const go = (i) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  const item = sequence[active];

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
           CONTINUOUS LEARNING LOOP <span className="gradient-text">Your Expertise</span>
            <br />
            Trains the Model.
          </motion.h1>
  

        <motion.p
          className="text-muted-foreground mx-auto"
          style={{
            fontSize: "clamp(0.68rem, 1.1vw, 0.95rem)",
            maxWidth: "min(520px, 92%)",
            lineHeight: 1.5,
            marginBottom: "clamp(10px, 2vh, 22px)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          When you correct flagged reports, our Federated Knowledge engine securely captures insights.
          Your daily work actively enhances system intelligence.
        </motion.p>

        {/* ── Live step indicator strip ── */}
        <div
          className="flex items-center justify-center gap-1 mx-auto"
          style={{ marginBottom: "clamp(8px, 1.5vh, 16px)" }}
        >
          {sequence.map((s, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === active ? "clamp(20px, 3vw, 32px)" : "clamp(5px, 0.7vw, 8px)",
                height: "clamp(5px, 0.7vw, 8px)",
                borderRadius: "9999px",
                backgroundColor: i === active ? item.accent : "hsl(var(--muted))",
                transition: "all 0.35s ease",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* ── The single animated card ── */}
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            height: "clamp(200px, 34vh, 340px)",
            borderRadius: "clamp(14px, 2vw, 22px)",
          }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * 60, scale: 0.96 }),
                center: { opacity: 1, x: 0, scale: 1 },
                exit: (d) => ({ opacity: 0, x: d * -60, scale: 0.96 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className={`absolute inset-0 bg-gradient-to-br ${item.bg} border ${item.border} backdrop-blur-sm`}
              style={{
                borderRadius: "clamp(14px, 2vw, 22px)",
                padding: "clamp(14px, 2.5vw, 28px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Top row: tag + badge */}
              <div className="flex items-start justify-between gap-2">
                <div
                  className="flex items-center gap-1.5 rounded-full font-semibold"
                  style={{
                    color: item.accent,
                    backgroundColor: `${item.accent}18`,
                    border: `1px solid ${item.accent}35`,
                    padding: "clamp(3px, 0.5vw, 5px) clamp(8px, 1.2vw, 14px)",
                    fontSize: "clamp(0.6rem, 0.85vw, 0.76rem)",
                  }}
                >
                  {item.icon}
                  {item.tag}
                </div>
                <span
                  className="rounded-full font-medium"
                  style={{
                    color: item.badgeColor,
                    backgroundColor: `${item.badgeColor}15`,
                    border: `1px solid ${item.badgeColor}30`,
                    padding: "clamp(3px, 0.5vw, 5px) clamp(8px, 1.2vw, 12px)",
                    fontSize: "clamp(0.58rem, 0.8vw, 0.72rem)",
                  }}
                >
                  {item.badge}
                </span>
              </div>

              {/* Center: title + body */}
              <div className="text-left">
                <h2
                  className="font-bold text-foreground mb-1"
                  style={{ fontSize: "clamp(1rem, 1.8vw, 1.6rem)", lineHeight: 1.2 }}
                >
                  {item.title}
                </h2>
                <p
                  className="text-muted-foreground whitespace-pre-line leading-relaxed"
                  style={{ fontSize: "clamp(0.68rem, 1vw, 0.88rem)" }}
                >
                  {item.body}
                </p>
              </div>

              {/* Bottom: step counter + next hint */}
              <div className="flex items-center justify-between">
                <span
                  className="font-mono font-semibold"
                  style={{ color: item.accent, fontSize: "clamp(0.6rem, 0.85vw, 0.75rem)" }}
                >
                  {String(active + 1).padStart(2, "0")} / {String(sequence.length).padStart(2, "0")}
                </span>
                <div
                  className="flex items-center gap-1 opacity-50"
                  style={{ fontSize: "clamp(0.58rem, 0.8vw, 0.7rem)" }}
                >
                  <span className="text-muted-foreground">Next</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>

              {/* Progress bar sweeping across the bottom */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 rounded-full"
                style={{ backgroundColor: item.accent }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.8, ease: "linear" }}
                key={`bar-${active}`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;