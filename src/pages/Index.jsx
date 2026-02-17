// import { useState, useRef, useEffect, useCallback } from "react";
// import {
//   Activity, ArrowRight, Play, Shield, Clock, CheckCircle2, Zap,
//   Lock, Brain, Server, Upload, UserCheck, AlertTriangle, RefreshCw,
//   Globe, Bot, User, Send, ShieldCheck, Network,
//   FlaskConical, Target, Ban, Monitor, Package, FileCheck,
//   CalendarCheck, FileDown, X, ChevronLeft, ChevronRight,
//   Mail, ChevronRight as CR
// } from "lucide-react";

// /* ─── INJECT STYLES ─── */
// const _s = document.createElement("style");
// _s.textContent = `
//   @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
//   :root {
//     --bg:         220 20% 97%;
//     --fg:         222 47% 11%;
//     --card:       0 0% 100%;
//     --primary:    215 90% 22%;
//     --primary-fg: 210 40% 98%;
//     --secondary:  210 30% 95%;
//     --muted:      210 25% 93%;
//     --muted-fg:   215 16% 47%;
//     --accent:     175 80% 40%;
//     --accent-fg:  0 0% 100%;
//     --border:     214 32% 91%;
//     --radius:     0.75rem;
//     --grad-hero:   linear-gradient(135deg, hsl(215 90% 22%), hsl(215 70% 12%));
//     --grad-accent: linear-gradient(135deg, hsl(175 80% 40%), hsl(195 85% 45%));
//     --shadow-card: 0 4px 32px hsl(215 90% 22% / 0.06);
//     --shadow-hover:0 8px 48px hsl(215 90% 22% / 0.12);
//     --shadow-glow: 0 0 60px hsl(175 80% 40% / 0.15);
//     --font-d: 'Space Grotesk', system-ui, sans-serif;
//     --font-b: 'Inter', system-ui, sans-serif;
//     --font-m: 'JetBrains Mono', monospace;
//   }
//   *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
//   body { overflow:hidden; font-family:var(--font-b); background:hsl(var(--bg)); color:hsl(var(--fg)); -webkit-font-smoothing:antialiased; }

//   /* ── Slide track ── */
//   .slide-track { display:flex; transition:transform 0.65s cubic-bezier(0.77,0,0.175,1); will-change:transform; height:100%; }
//   .s-panel { flex-shrink:0; height:100%; overflow:hidden; position:relative; }

//   /* ── Console sidebar slide-in ── */
//   .console-slide {
//   animation: cslideR 0.4s cubic-bezier(0.22,1,0.36,1) both;
// }

// @keyframes cslideR {
//   from { opacity:0; transform:translateX(24px) }
//   to   { opacity:1; transform:translateX(0) }
// }


//   /* ── Font utilities ── */
//   .fd { font-family:var(--font-d); }
//   .fb { font-family:var(--font-b); }
//   .fm { font-family:var(--font-m); }

//   /* ── Gradient text ── */
//   .tg  { background:var(--grad-accent); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
//   .tgp { background:var(--grad-hero);   -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

//   /* ── Grid bg ── */
//   .gbg {
//     background-image: linear-gradient(hsl(var(--primary)/0.03) 1px, transparent 1px),
//                       linear-gradient(90deg, hsl(var(--primary)/0.03) 1px, transparent 1px);
//     background-size: 40px 40px;
//   }

//   /* ── Animations ── */
//   .fu { animation: fu  0.55s cubic-bezier(0.22,1,0.36,1) both; }
//   .fi { animation: fi  0.35s ease both; }
//   .ci { animation: ci  0.4s  cubic-bezier(0.22,1,0.36,1) both; }
//   .ap { animation: ap  2s ease-in-out infinite; }
//   @keyframes fu  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes fi  { from{opacity:0} to{opacity:1} }
//   @keyframes ci  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes ap  { 0%,100%{opacity:0.4} 50%{opacity:1} }
//   .d1{animation-delay:0.07s} .d2{animation-delay:0.14s} .d3{animation-delay:0.21s}
//   .d4{animation-delay:0.28s} .d5{animation-delay:0.35s}
//   .cd1{animation-delay:0.3s} .cd2{animation-delay:0.65s} .cd3{animation-delay:1.0s}

//   /* ── Pulse dot ── */
//   .pd { width:7px;height:7px;border-radius:50%;background:hsl(var(--accent));position:relative;flex-shrink:0; }
//   .pd::before { content:'';position:absolute;inset:-3px;border-radius:50%;background:hsl(var(--accent)/0.3);animation:pr 1.5s ease-in-out infinite; }
//   @keyframes pr { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.6);opacity:0} }

//   /* ── Scrollbar ── */
//   .iscroll { overflow-y:auto; }
//   .iscroll::-webkit-scrollbar { width:4px; }
//   .iscroll::-webkit-scrollbar-track { background:transparent; }
//   .iscroll::-webkit-scrollbar-thumb { background:hsl(var(--border));border-radius:4px; }

//   /* ── Nav dot ── */
//   .ndot { height:8px;border-radius:4px;transition:all 0.35s cubic-bezier(0.22,1,0.36,1);cursor:pointer;border:none;padding:0; }

//   /* ── Card hover ── */
//   .ch { transition:transform 0.25s ease, box-shadow 0.25s ease; }
//   .ch:hover { transform:translateY(-2px);box-shadow:var(--shadow-hover); }

//   /* ── Conf bar ── */
//   .cbar { height:6px;border-radius:3px; }

//   /* ── Login button hover ── */
//   .login-btn { transition: background 0.18s ease, border-color 0.18s ease; cursor:pointer; border:none; }
//   .login-btn:hover { background:hsl(var(--secondary)) !important; }

//   /* ── Divider input focus ── */
//   .email-input:focus { border-color:hsl(var(--accent)) !important; outline:none; }
// `;
// document.head.appendChild(_s);

// /* ─── SHARED BADGE ─── */
// const B = ({ v = "muted", children, className = "" }) => {
//   const T = {
//     accent:  { bg:"hsl(var(--accent)/0.1)",  border:"1px solid hsl(var(--accent)/0.25)",  color:"hsl(var(--accent))" },
//     primary: { bg:"hsl(var(--primary)/0.08)", border:"1px solid hsl(var(--primary)/0.18)", color:"hsl(var(--primary))" },
//     muted:   { bg:"hsl(var(--muted))",        border:"1px solid hsl(var(--border))",       color:"hsl(var(--muted-fg))" },
//     emerald: { bg:"hsl(142 71% 45%/0.1)",     border:"1px solid hsl(142 71% 45%/0.25)",   color:"hsl(142 65% 35%)" },
//     red:     { bg:"hsl(0 84% 60%/0.1)",       border:"1px solid hsl(0 84% 60%/0.25)",     color:"hsl(0 72% 45%)" },
//   };
//   const t = T[v] || T.muted;
//   return (
//     <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
//       style={{ background:t.bg, border:t.border, color:t.color, fontFamily:"var(--font-b)", letterSpacing:"0.03em" }}>
//       {children}
//     </span>
//   );
// };

// /* ─── SHARED CARD ─── */
// const Card = ({ children, className = "", style: s = {} }) => (
//   <div className={`ch rounded-xl ${className}`}
//     style={{ background:"hsl(var(--card))", border:"1px solid hsl(var(--border))", boxShadow:"var(--shadow-card)", ...s }}>
//     {children}
//   </div>
// );

// /* ─── BRAND ICONS ─── */
// const GoogleIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//     <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
//     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//   </svg>
// );

// const MicrosoftIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
//     <rect x="1"  y="1"  width="9" height="9" fill="#f25022" rx="1"/>
//     <rect x="11" y="1"  width="9" height="9" fill="#7fba00" rx="1"/>
//     <rect x="1"  y="11" width="9" height="9" fill="#00a4ef" rx="1"/>
//     <rect x="11" y="11" width="9" height="9" fill="#ffb900" rx="1"/>
//   </svg>
// );

// const ShieldContainerIcon = () => (
//   <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
//     <path d="M16 2L4 7.5V15c0 6.3 4.8 12.2 12 13.8C23.2 27.2 28 21.3 28 15V7.5L16 2z"
//       fill="hsl(215 90% 22%/0.1)" stroke="hsl(215,90%,22%)" strokeWidth="1.5" strokeLinejoin="round"/>
//     <rect x="9.5"  y="12"   width="5" height="3.5" rx="0.8" fill="hsl(215,90%,22%)" opacity="0.9"/>
//     <rect x="15.5" y="12"   width="5" height="3.5" rx="0.8" fill="hsl(215,90%,22%)" opacity="0.6"/>
//     <rect x="9.5"  y="16.5" width="5" height="3.5" rx="0.8" fill="hsl(215,90%,22%)" opacity="0.55"/>
//     <rect x="15.5" y="16.5" width="5" height="3.5" rx="0.8" fill="hsl(215,90%,22%)" opacity="0.35"/>
//   </svg>
// );

// /* ─── FIXED HEADER ─── */
// const NAV_LINKS = ["Technology", "Privacy", "Federated Learning", "Company"];
// function Header({ onConsole }) {
//   return (
//     <header className="flex-shrink-0 flex items-center justify-between px-8 border-b"
//       style={{ height:60, background:"hsl(var(--card)/0.95)", backdropFilter:"blur(16px)", borderColor:"hsl(var(--border))", zIndex:100, position:"relative" }}>
//       <div className="flex items-center gap-2.5">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"var(--grad-hero)" }}>
//           <Activity size={14} strokeWidth={2.5} color="white"/>
//         </div>
//         <span className="fd font-bold tracking-tight text-[hsl(var(--fg))]" style={{ fontSize:"1.05rem" }}>AIRNotes</span>
//       </div>
//       <nav className="hidden md:flex items-center gap-6">
//         {NAV_LINKS.map(n => (
//           <a key={n} href="#" className="fb text-sm font-medium text-[hsl(var(--muted-fg))] hover:text-[hsl(var(--fg))] transition-colors no-underline">{n}</a>
//         ))}
//       </nav>
//       <button onClick={onConsole}
//         className="fd font-semibold px-5 py-2 rounded-[var(--radius)] text-sm text-white cursor-pointer border-none hover:opacity-90 transition-opacity"
//         style={{ background:"var(--grad-hero)" }}>
//         Launch Console
//       </button>
//     </header>
//   );
// }

// /* ─── CONSOLE LOGIN SIDEBAR (20%) ─── */
// function ConsoleSidebar({ onClose }) {
//   return (
//     <div className="console-slide flex flex-col h-full border-l"
//       style={{ background:"hsl(var(--card))", borderColor:"hsl(var(--border))", fontFamily:"var(--font-b)" }}>

//       {/* ── Top bar with gradient ── */}
//       <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
//         style={{ background:"var(--grad-hero)" }}>
//         <div className="flex items-center gap-2.5">
//           <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"rgba(255,255,255,0.15)" }}>
//             <Activity size={14} strokeWidth={2.5} color="white"/>
//           </div>
//           <div>
//             <p className="fd font-bold text-white text-sm leading-tight">AIRNotes Console</p>
//             <p className="text-white/55 text-xs mt-0.5">Secure clinical AI</p>
//           </div>
//         </div>
//         <button onClick={onClose}
//           className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-none transition-colors"
//           style={{ background:"rgba(255,255,255,0.12)" }}
//           onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
//           onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
//           <X size={13} color="white"/>
//         </button>
//       </div>

//       {/* ── Trust strip ── */}
//       <div className="flex items-center justify-between px-4 py-2 border-b flex-shrink-0"
//         style={{ background:"hsl(var(--secondary))", borderColor:"hsl(var(--border))" }}>
//         {[[Shield,"HIPAA"],[Lock,"AES-256"],[Server,"On-Prem"]].map(([Ic,l]) => (
//           <span key={l} className="fb flex items-center gap-1 text-xs font-semibold text-[hsl(var(--muted-fg))]">
//             <Ic size={10}/>{l}
//           </span>
//         ))}
//       </div>

//       {/* ── Scrollable body ── */}
//       <div className="flex-1 iscroll px-5 py-5 flex flex-col gap-4">

//         {/* Headline */}
//         <div>
//           <h2 className="fd font-bold text-[hsl(var(--fg))] text-base leading-tight tracking-tight">
//             Sign in to Console
//           </h2>
//           <p className="fb text-xs text-[hsl(var(--muted-fg))] mt-1.5 leading-relaxed">
//             Access your clinical AI workspace securely.
//           </p>
//         </div>

//         {/* OAuth buttons */}
//         <div className="flex flex-col gap-2.5">
//           {/* Google */}
//           <button className="login-btn w-full flex items-center gap-3 px-3.5 py-3 rounded-xl"
//             style={{ background:"hsl(var(--card))", border:"1px solid hsl(var(--border))" }}>
//             <GoogleIcon/>
//             <span className="fb flex-1 text-left text-sm font-semibold text-[hsl(var(--fg))]">
//               Continue with Google
//             </span>
//             <ChevronRight size={14} style={{ color:"hsl(var(--muted-fg))", flexShrink:0 }}/>
//           </button>

//           {/* Microsoft */}
//           <button className="login-btn w-full flex items-center gap-3 px-3.5 py-3 rounded-xl"
//             style={{ background:"hsl(var(--card))", border:"1px solid hsl(var(--border))" }}>
//             <MicrosoftIcon/>
//             <span className="fb flex-1 text-left text-sm font-semibold text-[hsl(var(--fg))]">
//               Continue with Microsoft
//             </span>
//             <ChevronRight size={14} style={{ color:"hsl(var(--muted-fg))", flexShrink:0 }}/>
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="flex items-center gap-2.5">
//           <div className="flex-1 h-px" style={{ background:"hsl(var(--border))" }}/>
//           <span className="fb text-xs font-medium text-[hsl(var(--muted-fg))]">or</span>
//           <div className="flex-1 h-px" style={{ background:"hsl(var(--border))" }}/>
//         </div>

//         {/* Email form */}
//         <div className="flex flex-col gap-2.5">
//           <div className="relative">
//             <Mail size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"hsl(var(--muted-fg))", pointerEvents:"none" }}/>
//             <input
//               type="email"
//               placeholder="Work email address"
//               className="email-input fb w-full rounded-xl text-sm transition-colors"
//               style={{ paddingLeft:36, paddingRight:12, paddingTop:10, paddingBottom:10, border:"1px solid hsl(var(--border))", background:"hsl(var(--secondary))", color:"hsl(var(--fg))", fontFamily:"var(--font-b)" }}
//             />
//           </div>
//           <button className="fd font-semibold w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white border-none cursor-pointer hover:opacity-90 transition-opacity"
//             style={{ background:"var(--grad-accent)" }}>
//             <Mail size={14}/>
//             Continue with Email
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="h-px flex-shrink-0" style={{ background:"hsl(var(--border))" }}/>

//         {/* What's inside */}
//         {/* <div>
//           <p className="fm text-xs font-bold uppercase tracking-widest mb-3" style={{ color:"hsl(var(--muted-fg))" }}>
//             Inside Console
//           </p>
//           <div className="flex flex-col gap-2">
//             {[
//               [CheckCircle2, "Radiology reporting dashboard"],
//               [Activity,     "Live AI confidence scores"],
//               [RefreshCw,    "Federated learning controls"],
//               [Shield,       "HIPAA audit log viewer"],
//               [Globe,        "Node network status"],
//             ].map(([Ic, label]) => (
//               <div key={label} className="flex items-center gap-2.5 fb text-xs text-[hsl(var(--fg))]">
//                 <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
//                   style={{ background:"hsl(var(--accent)/0.1)" }}>
//                   <Ic size={11} style={{ color:"hsl(var(--accent))" }} strokeWidth={2}/>
//                 </div>
//                 {label}
//               </div>
//             ))}
//           </div>
//         </div> */}

//         {/* Footer note */}
//         <p className="fb text-center text-xs text-[hsl(var(--muted-fg))] leading-relaxed mt-auto pt-2">
//           By signing in you agree to our{" "}
//           <a href="#" style={{ color:"hsl(var(--accent))" }} className="underline">Terms</a> &amp;{" "}
//           <a href="#" style={{ color:"hsl(var(--accent))" }} className="underline">Privacy</a>.<br/>
//           Patient data never leaves your premises.
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ─── NAV DOTS ─── */
// const SCREEN_NAMES = ["Vision","Workflow","Learning","Security","Deployment"];
// function NavDots({ current, total, goTo }) {
//   const bs = { background:"hsl(var(--card))", border:"1px solid hsl(var(--border))", boxShadow:"var(--shadow-card)", color:"hsl(var(--muted-fg))" };
//   return (
//     <>
//       {current > 0 && (
//         <button onClick={() => goTo(current-1)}
//           className="absolute left-3 top-1/2 z-50 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all hover:-translate-x-0.5"
//           style={{ ...bs, transform:"translateY(-50%)" }}>
//           <ChevronLeft size={17} strokeWidth={2}/>
//         </button>
//       )}
//       {current < total-1 && (
//         <button onClick={() => goTo(current+1)}
//           className="absolute right-3 top-1/2 z-50 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all hover:translate-x-0.5"
//           style={{ ...bs, transform:"translateY(-50%)" }}>
//           <ChevronRight size={17} strokeWidth={2}/>
//         </button>
//       )}
//       <div className="absolute bottom-4 left-1/2 z-50 flex flex-col items-center gap-2" style={{ transform:"translateX(-50%)" }}>
//         <div className="flex items-center gap-2">
//           {SCREEN_NAMES.map((s,i) => (
//             <button key={s} onClick={() => goTo(i)} title={s} className="ndot"
//               style={{ width:current===i?28:8, background:current===i?"var(--grad-accent)":"hsl(var(--muted-fg)/0.3)" }}/>
//           ))}
//         </div>
//         <span className="fm text-xs font-semibold tracking-widest uppercase" style={{ color:"hsl(var(--muted-fg))" }}>
//           {SCREEN_NAMES[current]} · {current+1}/{total}
//         </span>
//       </div>
//     </>
//   );
// }

// /* ═══════════════════════════════════════════════
//    SCREENS
// ═══════════════════════════════════════════════ */

// /* ─── SCREEN 1: HERO ─── */
// function S1({ onConsole }) {
//   const stats = [
//     { v:"99.7%", l:"Accuracy",        s:"Diagnostic precision",      I:CheckCircle2 },
//     { v:"100%",  l:"Data Sovereignty",s:"On-Prem deployment",         I:Shield },
//     { v:"< 2s",  l:"Active Loop",     s:"Human-Verified Feedback",    I:Clock },
//     { v:"HIPAA", l:"Federated",       s:"Continuous Learning",        I:Zap },
//   ];
//   const cards = [
//     { icon:"🩻", title:"Secure Radiology Reporting. Self-Correcting Intelligence.", desc:"Confidence-coded radiology drafts on local infrastructure. Every correction feeds the loop.", tag:"Zero data exfiltration" },
//     { icon:"🧠", title:"AI That Drafts. Experts Who Verify. A Model That Learns.", desc:"Federated Knowledge captures radiologist expertise — never patient data.", tag:"Federated learning" },
//   ];
//   return (
//     <div className="w-full h-full flex flex-col gbg overflow-hidden" style={{ background:"hsl(var(--bg))" }}>
//       <div className="absolute top-0 right-0 w-[520px] h-[420px] pointer-events-none"
//         style={{ background:"radial-gradient(ellipse at top right,hsl(var(--accent)/0.06),transparent 70%)" }}/>
//       <div className="flex-1 flex flex-col justify-center px-10 xl:px-14 pt-2 pb-8 min-h-0 relative z-10">
//         {/* Eyebrow */}
//         <div className="fu inline-flex items-center gap-2 self-start mb-5">
//           <B v="accent"><span className="pd"/>&nbsp;Secure In-House Intelligence AI</B>
//         </div>
//         <div className="flex gap-10 items-start flex-wrap">
//           <div className="flex-1 min-w-[260px]">
//             <h1 className="fu d1 fd font-bold leading-[1.05] tracking-tight mb-5 text-[hsl(var(--fg))]"
//               style={{ fontSize:"clamp(2.4rem,4.5vw,3.8rem)" }}>
//               AI That Heals<br/><span className="tg">Smarter.</span>
//             </h1>
//             <p className="fu d2 fb leading-relaxed mb-7 text-[hsl(var(--muted-fg))]"
//               style={{ fontSize:"clamp(0.9rem,1.2vw,1.05rem)", maxWidth:500 }}>
//               Deploy AIRNotes locally to generate confidence-coded radiology reports without your data ever leaving the hospital. Our Federated Knowledge engine learns from radiologist corrections.
//             </p>
//             <div className="fu d3 flex gap-3 flex-wrap">
//               <button className="fd font-semibold flex items-center gap-2 px-6 py-2.5 rounded-[var(--radius)] text-sm text-white border-none cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px"
//                 style={{ background:"var(--grad-hero)" }}>
//                 See How It Works <ArrowRight size={15} strokeWidth={2.5}/>
//               </button>
//               <button className="fd font-medium flex items-center gap-2 px-6 py-2.5 rounded-[var(--radius)] text-sm cursor-pointer transition-all"
//                 style={{ background:"transparent", border:"1px solid hsl(var(--border))", color:"hsl(var(--fg))" }}
//                 onMouseEnter={e=>{e.currentTarget.style.background="hsl(var(--secondary))";e.currentTarget.style.borderColor="hsl(var(--muted-fg)/0.3)"}}
//                 onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="hsl(var(--border))"}}>
//                 <Play size={14} fill="currentColor"/> Schedule Demo
//               </button>
//             </div>
//           </div>
//           <div className="flex flex-col gap-4 w-full max-w-[290px]">
//             {cards.map((c,i) => (
//               <Card key={i} className={`fu p-5 rounded-2xl d${i+3}`}>
//                 {/* <div className="text-2xl mb-3">{c.icon}</div> */}
//                 <p className="fd font-semibold text-[hsl(var(--fg))] text-sm leading-snug mb-2">{c.title}</p>
//                 <p className="fb text-xs text-[hsl(var(--muted-fg))] leading-relaxed mb-3">{c.desc}</p>
//                 <B v="accent">{c.tag}</B>
//               </Card>
//             ))}
//           </div>
//         </div>
//         {/* Stats */}
//         <div className="fu d5 grid grid-cols-4 mt-7 rounded-2xl overflow-hidden"
//           style={{ border:"1px solid hsl(var(--border))", boxShadow:"var(--shadow-card)" }}>
//           {stats.map((s,i) => (
//             <div key={i} className="px-5 py-4 transition-colors"
//               style={{ background:"hsl(var(--card))", borderRight:i<3?"1px solid hsl(var(--border))":undefined }}
//               onMouseEnter={e=>e.currentTarget.style.background="hsl(var(--secondary))"}
//               onMouseLeave={e=>e.currentTarget.style.background="hsl(var(--card))"}>
//               <div className="fd font-bold text-xl tg mb-0.5">{s.v}</div>
//               <div className="fb flex items-center gap-1 text-xs font-semibold text-[hsl(var(--fg))]">
//                 <s.I size={12} color="hsl(var(--accent))"/>{s.l}
//               </div>
//               <div className="fb text-xs text-[hsl(var(--muted-fg))] mt-0.5">{s.s}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <p className="fb text-center pb-3.5 text-xs flex-shrink-0" style={{ color:"hsl(var(--muted-fg)/0.5)" }}>
//         Scroll to navigate screens →
//       </p>
//     </div>
//   );
// }

// /* ─── SCREEN 2: WORKFLOW ─── */
// function S2() {
//   const steps = [
//     { n:"01", I:Lock,      t:"Secure Data Ingestion",    d:"Direct PACS integration or encrypted manual upload. Patient data stays isolated.", chip:"On-Prem Only" },
//     { n:"02", I:Brain,     t:"Intelligence AI Analysis", d:"Generates structured report with confidence flags for radiologist attention.", chip:"< 2s" },
//     { n:"03", I:UserCheck, t:"Human-Verified Approval",  d:"Radiologist reviews, corrects, signs off. Corrections feed the Federated loop.", chip:"Federated" },
//   ];
//   return (
//     <div className="w-full h-full flex flex-col overflow-hidden gbg" style={{ background:"hsl(var(--bg))" }}>
//       <div className="absolute top-0 left-0 w-[480px] h-[380px] pointer-events-none"
//         style={{ background:"radial-gradient(ellipse,hsl(var(--accent)/0.05),transparent 70%)" }}/>
//       <div className="relative z-10 px-10 pt-4 pb-3 flex-shrink-0">
//         <B v="primary" className="mb-3 inline-flex"><Server size={10}/>&nbsp;Intelligent Reporting Engine</B>
//         <div className="flex items-end justify-between flex-wrap gap-3 mt-2">
//           <h2 className="fd font-bold text-[hsl(var(--fg))] leading-tight" style={{ fontSize:"clamp(1.7rem,3vw,2.7rem)" }}>
//             From Local Ingestion to<br/><span className="tg">Confidence-Coded Report.</span>
//           </h2>
//           <div className="flex gap-2">
//             <B v="emerald"><span style={{ width:6,height:6,borderRadius:"50%",background:"hsl(142,71%,45%)",display:"inline-block" }}/>PACS Active</B>
//             <B v="primary"><Server size={10}/>&nbsp;Local Server</B>
//           </div>
//         </div>
//       </div>
//       <div className="relative z-10 flex-1 px-10 pb-5 flex gap-5 min-h-0">
//         <div className="flex flex-col gap-2.5 w-60 flex-shrink-0">
//           {steps.map((s,i) => (
//             <Card key={i} className={`fu d${i+1} p-3.5 flex gap-3 cursor-default rounded-xl`}>
//               <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"hsl(var(--primary)/0.08)" }}>
//                 <s.I size={16} strokeWidth={2} color="hsl(215,90%,22%)"/>
//               </div>
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="fm text-xs text-[hsl(var(--muted-fg))]">#{s.n}</span>
//                   <span className="fd font-semibold text-xs text-[hsl(var(--fg))]">{s.t}</span>
//                 </div>
//                 <p className="fb text-xs text-[hsl(var(--muted-fg))] leading-relaxed mb-2">{s.d}</p>
//                 <B v="muted">{s.chip}</B>
//               </div>
//             </Card>
//           ))}
//         </div>
//         <div className="flex-1 flex flex-col gap-3 min-h-0">
//           <div className="fu d1 rounded-xl p-5 text-center cursor-pointer flex-shrink-0 transition-all"
//             style={{ border:"2px dashed hsl(var(--border))", background:"hsl(var(--secondary))", borderRadius:"var(--radius)" }}
//             onMouseEnter={e=>e.currentTarget.style.borderColor="hsl(var(--accent))"}
//             onMouseLeave={e=>e.currentTarget.style.borderColor="hsl(var(--border))"}>
//             <Upload size={26} strokeWidth={1.5} style={{ margin:"0 auto 8px", color:"hsl(var(--muted-fg))" }}/>
//             <p className="fd font-semibold text-sm text-[hsl(var(--fg))] mb-1">Import DICOM / X-Ray Source</p>
//             <p className="fb text-xs text-[hsl(var(--muted-fg))]">DICOM · PNG · JPG · Encrypted · On-premise only</p>
//             <div className="flex justify-center gap-2 mt-3">{["DICOM","PNG","JPG"].map(f=><B key={f} v="muted" className="fm">{f}</B>)}</div>
//           </div>
//           <Card className="fu d3 flex-1 rounded-xl p-5 flex flex-col max-h-[200px]">
//             <div className="flex items-center justify-between mb-3 flex-wrap gap-2 flex-shrink-0">
//               <div>
//                 <p className="fd font-bold text-sm text-[hsl(var(--fg))]">AI Draft Report — Chest X-Ray #8842</p>
//                 <p className="fm text-xs text-[hsl(var(--muted-fg))] mt-0.5">Generated 10:51:34 · On-Prem · v2.4.1</p>
//               </div>
//               <div className="flex gap-2">
//                 <B v="emerald"><CheckCircle2 size={10}/>&nbsp;91% High</B>
//                 <B v="red"><AlertTriangle size={10}/>&nbsp;42% Low</B>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-3 flex-1 ">
//               {[
//                 { label:"High Confidence", conf:91, border:"hsl(142,71%,45%)", bg:"hsl(142,71%,45%/0.05)", ic:"hsl(142,65%,35%)", I:CheckCircle2, txt:"Bilateral lung fields clear. No pneumothorax. Cardiac silhouette normal." },
//                 { label:"Verify Required",  conf:42, border:"hsl(0,84%,60%)",   bg:"hsl(0,84%,60%/0.05)",   ic:"hsl(0,72%,45%)",   I:AlertTriangle, txt:"Region: Left Lower Lobe. Suggested: 'Mild Consolidation'. Possible artifact." },
//               ].map((x,i) => (
//                 <div key={i} className="rounded-xl p-3.5" style={{ borderLeft:`3px solid ${x.border}`, background:x.bg, border:`1px solid ${x.border}30`, borderLeftWidth:3 }}>
//                   <div className="flex items-center gap-1.5 mb-2"><x.I size={12} color={x.ic}/><p className="fb text-xs font-bold uppercase tracking-wider" style={{ color:x.ic }}>{x.label}</p></div>
//                   <p className="fb text-xs text-[hsl(var(--fg))] leading-relaxed mb-3">{x.txt}</p>
//                   <div>
//                     <div className="flex justify-between text-xs mb-1">
//                       <span className="fb text-[hsl(var(--muted-fg))]">Confidence</span>
//                       <span className="fb font-bold" style={{ color:x.ic }}>{x.conf}%</span>
//                     </div>
//                     <div className="cbar" style={{ background:"hsl(var(--muted))", position:"relative" }}>
//                       <div className="cbar" style={{ width:`${x.conf}%`, background:x.border, position:"absolute", top:0, left:0 }}/>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── SCREEN 3: LEARNING ─── */
// function S3() {
//   const feats = [
//     { I:CheckCircle2, t:"Confidence Flags",  d:"Green/Red indicators guide radiologist focus.",     v:"accent" },
//     { I:Globe,        t:"Federated Updates", d:"Global intelligence, local execution.",              v:"primary" },
//     { I:Lock,         t:"Zero Leakage",      d:"Only model weights leave. Zero PHI transmitted.",    v:"accent" },
//     { I:RefreshCw,    t:"Self-Healing",      d:"Accuracy improves with every radiologist correction.", v:"primary" },
//   ];
//   const msgs = [
//     { role:"ai",   delay:"cd1", content:<>Draft for <strong>#8842</strong>.<br/><br/><span style={{ color:"hsl(38,92%,50%)",fontWeight:600,display:"flex",alignItems:"center",gap:4 }}><AlertTriangle size={12}/>Low Confidence (42%)</span> in <strong>Left Lower Lobe</strong>. Suggested: <span style={{ color:"hsl(0,72%,45%)",fontWeight:600 }}>'Mild Consolidation'</span>. Verify?</> },
//     { role:"human",delay:"cd2", content:<><strong>Correction:</strong> Artifact rejected. Beam-hardening from GE scanner — not pathology. Verified.</> },
//     { role:"sys",  delay:"cd3", content:<><span style={{ display:"flex",alignItems:"center",gap:6,fontWeight:700,marginBottom:6,color:"hsl(var(--accent))",fontFamily:"var(--font-d)" }}><Lock size={12}/>Feedback Encrypted &amp; Logged</span><span style={{ fontFamily:"var(--font-m)",fontSize:"0.75rem",color:"hsl(var(--muted-fg))",lineHeight:"1.6",display:"block" }}>Updated: <span style={{ color:"hsl(var(--accent))" }}>Artifact Differentiation</span><br/>Weight delta: 0.0024 · PHI: 0 bytes</span></> },
//   ];
//   return (
//     <div className="w-full h-full flex flex-col overflow-hidden" style={{ background:"hsl(var(--bg))" }}>
//       <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse at 70% 0%,hsl(var(--accent)/0.05),transparent 60%)" }}/>
//       <div className="relative z-10 px-10 pt-4 pb-3 flex-shrink-0">
//         <B v="accent" className="mb-3 inline-flex"><RefreshCw size={10}/>&nbsp;Continuous Learning Loop</B>
//         <h2 className="fd font-bold text-[hsl(var(--fg))] leading-tight mt-2" style={{ fontSize:"clamp(1.7rem,3vw,2.7rem)" }}>
//           Your Expertise<br/><span className="tg">Trains the Model.</span>
//         </h2>
//       </div>
      
//       <div className="relative z-10 flex-1 flex pb-5 min-h-0">
          
//         {feats.map((f,i) => (
//             <Card key={i} className={`fu d${i+1} rounded-xl p-3.5  max-h-[150px] cursor-default grid grid-cols-1 gap-2.5 content-start  flex-shrink-0 `}>
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5" style={{ background:`hsl(var(--${f.v})/0.1)` }}>
//                 <f.I size={15} color={`hsl(var(--${f.v}))`} strokeWidth={2}/>
//               </div>
//               <p className="fd font-semibold text-xs text-[hsl(var(--fg))] mb-1">{f.t}</p>
//               <p className="fb text-xs text-[hsl(var(--muted-fg))] leading-relaxed">{f.d}</p>
//             </Card>
//           ))}
//         <div className="rounded-xl overflow-hidden max-h-[500px]" style={{ background:"hsl(var(--card))", border:"1px solid hsl(var(--border))", boxShadow:"var(--shadow-card)" }}>
//           <div className="flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0" style={{ borderColor:"hsl(var(--border))", background:"hsl(var(--secondary))" }}>
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:"var(--grad-hero)" }}>
//                 <Bot size={14} strokeWidth={2} color="white"/>
//               </div>
//               <div>
//                 <p className="fd font-bold text-xs text-[hsl(var(--fg))]">AIRNotes Learning Engine</p>
//                 <div className="flex items-center gap-1.5 mt-0.5"><span className="pd" style={{ width:5,height:5 }}/><span className="fb text-xs text-[hsl(var(--muted-fg))]">Active · Report #8842 · Federated</span></div>
//               </div>
//             </div>
//             <B v="muted" className="fm"><Lock size={9}/>&nbsp;Encrypted</B>
//           </div>
//           <div className="flex-1 p-4 flex flex-col gap-3 iscroll">
//             {msgs.map((m,i) => {
//               if (m.role==="ai") return (
//                 <div key={i} className={`ci ${m.delay} flex gap-2.5 items-start`}>
//                   <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"var(--grad-hero)" }}><Bot size={12} color="white"/></div>
//                   <div className="max-w-[75%]">
//                     <p className="fb text-xs text-[hsl(var(--muted-fg))] mb-1 font-medium">AIRNotes Engine</p>
//                     <div className="rounded-2xl p-3 text-xs text-[hsl(var(--fg))] leading-relaxed" style={{ background:"hsl(var(--secondary))", border:"1px solid hsl(var(--border))", borderTopLeftRadius:4 }}>{m.content}</div>
//                   </div>
//                 </div>
//               );
//               if (m.role==="human") return (
//                 <div key={i} className={`ci ${m.delay} flex gap-2.5 items-start flex-row-reverse`}>
//                   <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"hsl(var(--primary)/0.15)" }}><User size={12} color="hsl(var(--primary))"/></div>
//                   <div className="max-w-[75%]">
//                     <p className="fb text-xs text-[hsl(var(--muted-fg))] mb-1 font-medium text-right">Dr. Meena — Radiologist</p>
//                     <div className="rounded-2xl p-3 text-xs text-[hsl(var(--fg))] leading-relaxed" style={{ background:"hsl(var(--primary)/0.07)", border:"1px solid hsl(var(--primary)/0.15)", borderTopRightRadius:4 }}>{m.content}</div>
//                   </div>
//                 </div>
//               );
//               return (
//                 <div key={i} className={`ci ${m.delay} mx-1`}>
//                   <div className="rounded-xl p-3.5" style={{ background:"hsl(var(--accent)/0.06)", border:"1px solid hsl(var(--accent)/0.2)" }}>{m.content}</div>
//                 </div>
//               );
//             })}
//           </div>
         
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── SCREEN 4: SECURITY ─── */
// function S4() {
//   const stats = [
//     { I:FlaskConical, v:"2.4M+",   l:"Compound Library",  s:"Molecules screened" },
//     { I:Target,       v:"98.5%",   l:"Binding Analysis",  s:"Prediction accuracy" },
//     { I:ShieldCheck,  v:"100%",    l:"Data Sovereignty",  s:"On-Prem guaranteed" },
//     { I:Lock,         v:"AES-256", l:"Encrypted Storage", s:"Military-grade local" },
//     { I:Ban,          v:"0",       l:"PHI Exposure",      s:"Zero transmitted" },
//     { I:Globe,        v:"47",      l:"Global Nodes",      s:"Federated network" },
//   ];
//   const Arrow = ({ delay=0 }) => (
//     <div className="flex flex-col items-center gap-1 flex-shrink-0 ap" style={{ animationDelay:`${delay}s` }}>
//       <svg width="44" height="22" viewBox="0 0 44 22" fill="none">
//         <path d="M2 11H40M32 4L40 11L32 18" stroke="hsl(var(--accent))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//       <p className="fb text-xs font-bold text-center leading-tight" style={{ color:"hsl(142,65%,35%)" }}>Weights ✓</p>
//       <p className="fb text-xs font-semibold text-center" style={{ color:"hsl(0,72%,45%)" }}>No PHI</p>
//     </div>
//   );
//   return (
//     <div className="w-full h-full flex flex-col overflow-hidden" style={{ background:"hsl(var(--bg))" }}>
//       <div className="absolute top-0 right-0 w-[560px] h-[420px] pointer-events-none" style={{ background:"radial-gradient(ellipse at top right,hsl(var(--primary)/0.05),transparent 70%)" }}/>
//       <div className="relative z-10 px-10 pt-4 pb-3 flex-shrink-0">
//         <B v="primary" className="mb-3 inline-flex"><ShieldCheck size={10}/>&nbsp;Federated Security Architecture</B>
//         <h2 className="fd font-bold text-[hsl(var(--fg))] leading-tight mt-2" style={{ fontSize:"clamp(1.7rem,3vw,2.7rem)" }}>
//           Global Intelligence.<br/><span className="tgp">Zero Privacy Compromise.</span>
//         </h2>
//       </div>
//       <div className="relative z-10 flex-1 flex flex-col gap-3.5 px-10 pb-5 min-h-0">
//         <Card className="fu rounded-xl p-4 flex-shrink-0">
//           <p className="fm text-xs text-[hsl(var(--muted-fg))] uppercase tracking-widest text-center mb-4">Federated Learning Architecture</p>
//           <div className="flex items-center justify-between gap-2">
//             {[
//               { I:Server, t:"Hospital Node A",     d:"Local inference. Patient data stays on-prem.", tag:"Isolated", center:false },
//               { I:Globe,  t:"AIRNotes Central Hub",d:"Aggregates weight deltas. Zero patient data stored.", tag:"AES-256", center:true },
//               { I:Server, t:"Hospital Node B",     d:"Independent deploy. Benefits from global aggregation.", tag:"Isolated", center:false },
//             ].map((n,idx) => (
//               <div key={idx} className="contents">
//                 <div className="flex-1 rounded-xl p-3.5 text-center border" style={{ background:n.center?"hsl(var(--accent)/0.04)":"hsl(var(--secondary))", borderColor:n.center?"hsl(var(--accent)/0.3)":"hsl(var(--border))", borderWidth:n.center?2:1 }}>
//                   <n.I size={22} style={{ margin:"0 auto 8px", color:n.center?"hsl(var(--accent))":"hsl(var(--primary))" }} strokeWidth={1.5}/>
//                   <p className="fd font-semibold text-xs text-[hsl(var(--fg))]">{n.t}</p>
//                   <p className="fb text-xs text-[hsl(var(--muted-fg))] mt-1 leading-relaxed">{n.d}</p>
//                   <B v={n.center?"accent":"primary"} className="mt-2">{n.tag}</B>
//                 </div>
//                 {idx<2 && <Arrow delay={idx*0.5}/>}
//               </div>
//             ))}
//           </div>
//         </Card>
//         <div className="grid grid-cols-6 gap-2.5 flex-shrink-0">
//           {stats.map((s,i) => (
//             <Card key={i} className={`fu d${i+1} rounded-xl p-3 text-center cursor-default`}>
//               <s.I size={15} style={{ margin:"0 auto 8px", color:"hsl(var(--accent))" }} strokeWidth={1.8}/>
//               <div className="fd font-bold text-base tg">{s.v}</div>
//               <div className="fd font-semibold text-[hsl(var(--fg))] mt-0.5" style={{ fontSize:"0.65rem" }}>{s.l}</div>
//               <div className="fb text-[hsl(var(--muted-fg))] mt-0.5 leading-tight" style={{ fontSize:"0.65rem" }}>{s.s}</div>
//             </Card>
//           ))}
//         </div>
//         <div className="grid grid-cols-2 gap-2.5">
//           {[
//             { I:Lock,  t:"Local-First, Always", d:"Every inference, every analysis runs entirely on your hardware. Internet never required." },
//             { I:Globe, t:"Global Model Aggregation", d:"Hospitals contribute encrypted weight deltas. Collective expertise, zero data sharing." },
//           ].map((p,i) => (
//             <Card key={i} className={`fu d${i+4} rounded-xl p-4 flex gap-3 items-start cursor-default`}>
//               <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"hsl(var(--primary)/0.08)" }}>
//                 <p.I size={16} color="hsl(215,90%,22%)" strokeWidth={2}/>
//               </div>
//               <div>
//                 <p className="fd font-bold text-sm text-[hsl(var(--fg))] mb-1">{p.t}</p>
//                 <p className="fb text-xs text-[hsl(var(--muted-fg))] leading-relaxed">{p.d}</p>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── SCREEN 5: DEPLOYMENT ─── */
// function S5() {
//   const feats = [
//     { CustomIcon:ShieldContainerIcon, Icon:null,      t:"Local Inference Engine",   d:"Runs entirely on your hardware via Docker containers. Full AI, fully offline.", chips:["Docker / On-Prem","No Internet"] },
//     { CustomIcon:null, Icon:Package,                  t:"Encrypted Model Shipping", d:"Receive smarter model updates without opening inbound ports. AES-256 encrypted.", chips:["No Inbound Ports","Verified Updates"] },
//     { CustomIcon:null, Icon:Network,                  t:"PACS Interoperability",    d:"Native HL7, FHIR, and standard hospital database integration. Zero rework.", chips:["HL7 / FHIR","Zero Rework"] },
//     { CustomIcon:null, Icon:FileCheck,                t:"Audit-Ready Compliance",   d:"Full immutable logging of every AI suggestion and human edit. Zero-knowledge.", chips:["HIPAA","Full Audit Trail"] },
//   ];
//   const checklist = ["Full offline capability","PACS/RIS integration","AES-256 encryption","Dedicated onboarding","Federated learning"];
//   const cantSee   = ["Patient names","Medical images","Report content","Radiologist edits"];
//   const comp      = ["HIPAA","HL7 FHIR","DICOM","AES-256","Zero-KA","On-Prem"];
//   return (
//     <div className="w-full h-full flex flex-col overflow-hidden gbg" style={{ background:"hsl(var(--bg))" }}>
//       <div className="absolute bottom-0 left-0 w-[480px] h-[380px] pointer-events-none" style={{ background:"radial-gradient(ellipse at bottom left,hsl(var(--accent)/0.06),transparent 70%)" }}/>
//       <div className="relative z-10 px-10 pt-4 pb-3 flex-shrink-0">
//         <B v="accent" className="mb-3 inline-flex"><Monitor size={10}/>&nbsp;Enterprise Deployment</B>
//         <h2 className="fd font-bold text-[hsl(var(--fg))] leading-tight mt-2" style={{ fontSize:"clamp(1.7rem,3vw,2.7rem)" }}>
//           Seamless Integration.<br/><span className="tg">Total Control.</span>
//         </h2>
//       </div>
//       <div className="relative z-10 flex-1 flex gap-4 px-10 pb-5 min-h-0">
//         <div className="flex flex-col gap-2.5 flex-1 min-h-0 iscroll">
//           {feats.map((f,i) => (
//             <Card key={i} className={`fu d${i+1} rounded-xl p-4 flex gap-3.5 items-start cursor-default`}>
//               <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:"hsl(var(--primary)/0.07)", border:"1px solid hsl(var(--primary)/0.12)" }}>
//                 {f.CustomIcon ? <f.CustomIcon/> : <f.Icon size={18} color="hsl(215,90%,22%)" strokeWidth={1.8}/>}
//               </div>
//               <div className="flex-1">
//                 <p className="fd font-bold text-sm text-[hsl(var(--fg))] mb-1">{f.t}</p>
//                 <p className="fb text-xs text-[hsl(var(--muted-fg))] leading-relaxed mb-2.5">{f.d}</p>
//                 <div className="flex gap-2 flex-wrap">{f.chips.map(c=><B key={c} v="primary">{c}</B>)}</div>
//               </div>
//             </Card>
//           ))}
//         </div>
//         <div className="w-60 flex-shrink-0 flex flex-col gap-2.5">
//           <Card className="fu d2 rounded-xl p-4 flex flex-col" style={{ borderColor:"hsl(var(--accent)/0.3)", boxShadow:"var(--shadow-glow)" }}>
//             <p className="fd font-bold text-[hsl(var(--fg))] text-sm mb-1">Deploy AIRNotes Today</p>
//             <p className="fb text-xs text-[hsl(var(--muted-fg))] leading-relaxed mb-3">2–4 weeks from contract to go-live.</p>
//             <div className="flex flex-col gap-2 mb-3">
//               {checklist.map(c => (
//                 <div key={c} className="flex items-center gap-2 text-xs text-[hsl(var(--fg))] fb">
//                   <CheckCircle2 size={12} strokeWidth={2.5} style={{ color:"hsl(var(--accent))", flexShrink:0 }}/>{c}
//                 </div>
//               ))}
//             </div>
//             <button className="fd font-semibold w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs text-white border-none cursor-pointer hover:opacity-90 transition-opacity" style={{ background:"var(--grad-accent)" }}><CalendarCheck size={13}/>Schedule Demo</button>
//             <button className="fd font-medium w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs cursor-pointer transition-all mt-2" style={{ background:"transparent", border:"1px solid hsl(var(--border))", color:"hsl(var(--fg))" }}><FileDown size={12}/>Download Brief</button>
//           </Card>
//           <Card className="fu d3 rounded-xl p-4">
//             <p className="fm text-xs font-bold text-[hsl(var(--muted-fg))] uppercase tracking-widest mb-2.5">What We Can't See</p>
//             {cantSee.map(x=>(
//               <div key={x} className="flex items-center gap-2 py-0.5 fb text-xs text-[hsl(var(--muted-fg))]">
//                 <X size={11} strokeWidth={2.5} style={{ color:"hsl(0,72%,45%)", flexShrink:0 }}/>{x}
//               </div>
//             ))}
//           </Card>
//           <Card className="fu d4 rounded-xl p-4">
//             <p className="fm text-xs font-bold text-[hsl(var(--muted-fg))] uppercase tracking-widest mb-2.5">Certified & Compliant</p>
//             <div className="grid grid-cols-2 gap-1.5">
//               {comp.map(b=>(
//                 <div key={b} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg" style={{ background:"hsl(var(--accent)/0.07)", border:"1px solid hsl(var(--accent)/0.18)" }}>
//                   <CheckCircle2 size={9} strokeWidth={2.5} style={{ color:"hsl(var(--accent))", flexShrink:0 }}/>
//                   <span className="fb text-xs font-bold" style={{ color:"hsl(var(--accent))" }}>{b}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ─── HOOK: HORIZONTAL SCROLL ─── */
// function useHScroll(total, current, setCurrent) {
//   const isAnim = useRef(false);
//   const goTo = useCallback(idx => {
//     if (isAnim.current) return;
//     const c = Math.max(0, Math.min(total-1, idx));
//     if (c === current) return;
//     isAnim.current = true;
//     setCurrent(c);
//     setTimeout(() => { isAnim.current = false; }, 700);
//   }, [current, total, setCurrent]);

//   useEffect(() => {
//     const h = e => { e.preventDefault(); const d = Math.abs(e.deltaY)>Math.abs(e.deltaX)?e.deltaY:e.deltaX; if(d>35)goTo(current+1); else if(d<-35)goTo(current-1); };
//     window.addEventListener("wheel", h, { passive:false });
//     return () => window.removeEventListener("wheel", h);
//   }, [current, goTo]);

//   useEffect(() => {
//     const h = e => { if(e.key==="ArrowRight"||e.key==="ArrowDown")goTo(current+1); if(e.key==="ArrowLeft"||e.key==="ArrowUp")goTo(current-1); };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [current, goTo]);

//   return goTo;
// }

// /* ─── APP ROOT ─── */
// const SCREENS = [S1, S2, S3, S4, S5];

// export default function App() {
//   const [cur, setCur]         = useState(0);
//   const [sidebarOpen, setSidebar] = useState(false);
//   const [pw, setPw]           = useState(0);
//   const contentRef            = useRef(null);
//   const goTo                  = useHScroll(SCREENS.length, cur, setCur);

//   /* Measure the content panel width (changes when sidebar opens/closes) */
//   useEffect(() => {
//     const m = () => { if(contentRef.current) setPw(contentRef.current.offsetWidth); };
//     m();
//     const ro = new ResizeObserver(m);
//     if(contentRef.current) ro.observe(contentRef.current);
//     return () => ro.disconnect();
//   }, [sidebarOpen]);

//   return (
//     <div className="w-screen h-screen overflow-hidden flex flex-col" style={{ background:"hsl(var(--bg))" }}>

//       {/* ── Fixed header (full width) ── */}
//       <Header onConsole={() => setSidebar(true)}/>

//       {/* ── Body row: sidebar + content ── */}
//       <div className="flex flex-1 overflow-hidden">

//         {/* ── Console Login Sidebar (20%) ── */}
//         {/* {sidebarOpen && (
//           <div className="h-full flex-shrink-0" style={{ width:"20%", minWidth:260 }}>
//             <ConsoleSidebar onClose={() => setSidebar(false)}/>
//           </div>
//         )} */}
         

//         {/* ── Slide content area (80% or 100%) ── */}
//         <div ref={contentRef} className="flex-r h-full overflow-hidden relative">
//           <div className="slide-track" style={{ transform:`translateX(-${cur * pw}px)` }}>
//             {SCREENS.map((SC, i) => (
//               <div key={i} className="s-panel" style={{ width:pw||"100%", minWidth:pw||"100%" }}>
//                 <SC onConsole={() => setSidebar(true)}/>
//               </div>
//             ))}
//           </div>
//           <NavDots current={cur} total={SCREENS.length} goTo={goTo}/>
//         </div>
//  {sidebarOpen && (
//           <div className="h-full flex-shrink-0" style={{ width:"20%", minWidth:260 }}>
//             <ConsoleSidebar onClose={() => setSidebar(false)}/>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import DiagnosticsSection from "@/components/sections/DiagnosticsSection";
import ChatSection from "@/components/sections/ChatSection";
import DrugDiscoverySection from "@/components/sections/DrugDiscoverySection";
import PrivacySection from "@/components/sections/PrivacySection";
import NavigationDots from "@/components/NavigationDots";
import AuthPanel from "../pages/Login";

const sections = [
  HeroSection,
  DiagnosticsSection,
  ChatSection,
  DrugDiscoverySection,
  PrivacySection,
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const Index = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const isAnimating = useRef(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  const navigate = useCallback(
    (newPage) => {
      if (isAnimating.current || newPage === page) return;
      if (newPage < 0 || newPage >= sections.length) return;
      isAnimating.current = true;
      setPage([newPage, newPage > page ? 1 : -1]);
    },
    [page]
  );

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 20) return;
      if (e.deltaY > 0) navigate(page + 1);
      else navigate(page - 1);
    };

    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(page + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(page - 1);
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) {
        if (delta > 0) navigate(page + 1);
        else navigate(page - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [page, navigate]);

  const CurrentSection = sections[page];

  return (
    // Root: full-screen flex row. Children grow/shrink to fill.
    <div className="h-screen w-full flex overflow-hidden">

      {/* ── MAIN CONTENT PANE ──────────────────────────────────────
          When auth is closed  → flex: 1 1 100%  (fills everything)
          When auth is open    → flex: 0 0 90%   (takes exactly 90%)
          Transition is handled by motion + CSS flex-basis change.
      ──────────────────────────────────────────────────────────── */}
      <motion.div
        className="relative h-full min-w-0 flex-shrink-0"
        animate={{ flexBasis: showAuth ? "80%" : "100%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ flexGrow: 0 }}
      >
        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between
                     px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5
                     bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Logo */}
          <div className="font-display font-bold text-lg sm:text-xl tracking-tight">
            <span className="gradient-text">RBG</span>AI
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm text-muted-foreground">
              {["Technology", "Privacy", "Federated Learning", "Company"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-foreground transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Launch Console */}
            <motion.button
              className="hidden md:block px-5 py-2 rounded-full text-accent-foreground text-sm font-medium ml-4"
              style={{ background: "var(--gradient-accent)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAuth((v) => !v)}
            >
              {showAuth ? "Close" : "Launch Console"}
            </motion.button>

            {/* Mobile Hamburger */}
            <motion.button
              className="p-1.5 rounded-lg hover:bg-accent/50 lg:hidden"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <motion.span
                  className="block w-5 h-0.5 rounded bg-foreground origin-left"
                  animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-5 h-0.5 rounded bg-foreground"
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-5 h-0.5 rounded bg-foreground origin-left"
                  animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.button>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="lg:hidden fixed top-[80px] right-4 w-48 bg-background/95 backdrop-blur-xl
                           border border-border rounded-xl shadow-2xl py-2 z-[70]"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {["Technology", "Privacy", "Federated Learning", "Company"].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="block px-6 py-3 text-sm text-foreground hover:bg-accent/50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item}
                  </motion.a>
                ))}

                {/* Mobile Launch Console inside menu */}
                <div className="border-t border-border mt-1 pt-1">
                  <motion.button
                    className="w-full text-left px-6 py-3 text-sm font-medium text-accent-foreground"
                    style={{ background: "transparent" }}
                    onClick={() => {
                      setShowAuth((v) => !v);
                      setIsMobileMenuOpen(false);
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {showAuth ? "Close Console" : "Launch Console"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* Slide Content */}
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
          onExitComplete={() => { isAnimating.current = false; }}
        >
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full flex items-center justify-center absolute top-0 left-0"
          >
            <CurrentSection />
          </motion.div>
        </AnimatePresence>

        {/* Page Counter */}
        <motion.div
          className="fixed bottom-8 left-8 z-40 text-sm tabular-nums text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {String(page + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </motion.div>

        {/* Navigation Dots */}
        <NavigationDots
          className="right-4 md:right-6 lg:right-10"
          count={sections.length}
          active={page}
          onNavigate={navigate}
          isAuthOpen={showAuth}
        />
      </motion.div>

      {/* ── AUTH PANEL ─────────────────────────────────────────────
          When closed → flex: 0 0 0%     (zero width, hidden)
          When open   → flex: 0 0 10%   (takes exactly 10%)
          overflow-hidden ensures nothing bleeds out during animation.
      ──────────────────────────────────────────────────────────── */}
      <motion.div
        className="h-full flex-shrink-0 overflow-hidden border-l border-border bg-background/95 backdrop-blur-xl z-30"
        animate={{ flexBasis: showAuth ? "20%" : "0%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ flexGrow: 0 }}
      >
        {showAuth && <AuthPanel onClose={() => setShowAuth(false)} />}
      </motion.div>

    </div>
  );
};

export default Index

// export default Index;
// import { useState, useCallback, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import HeroSection from "@/components/sections/HeroSection";
// import DiagnosticsSection from "@/components/sections/DiagnosticsSection";
// import ChatSection from "@/components/sections/ChatSection";
// import DrugDiscoverySection from "@/components/sections/DrugDiscoverySection";
// import PrivacySection from "@/components/sections/PrivacySection";
// import NavigationDots from "@/components/NavigationDots";

// import AuthPanel from "../pages/Login";


// const sections = [
//   HeroSection,
//   DiagnosticsSection,
//   ChatSection,
//   DrugDiscoverySection,
//   PrivacySection,
// ];

// const slideVariants = {
//   enter: (direction) => ({
//     x: direction > 0 ? "100%" : "-100%",
//     opacity: 0,
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//   },
//   exit: (direction) => ({
//     x: direction < 0 ? "100%" : "-100%",
//     opacity: 0,
//   }),
// };
// //  <motion.button
// //       className="hidden md:block px-5 py-2 rounded-full text-accent-foreground text-sm font-medium ml-4"
// //       style={{ background: "var(--gradient-accent)" }}
// //       whileHover={{ scale: 1.05 }}
// //       whileTap={{ scale: 0.95 }}
// //       onClick={() => setShowAuth((v) => !v)}
// //     >
// //       Launch Console
// //     </motion.button>
// const Index = () => {
  
//   const [[page, direction], setPage] = useState([0, 0]);
//   const isAnimating = useRef(false);
//   const [showAuth, setShowAuth] = useState(false);
// const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


//   const navigate = useCallback(
//     (newPage) => {
//       if (isAnimating.current || newPage === page) return;
//       if (newPage < 0 || newPage >= sections.length) return;

//       isAnimating.current = true;
//       setPage([newPage, newPage > page ? 1 : -1]);
//     },
//     [page]
//   );

// const mainVariants = {
//   expanded: {
//     scale: 1,
//     x: 0,
//     transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
//   },
//   shrunk: {
//     // Responsive scaling based on screen size
//     scale: showAuth 
//       ? (window.innerWidth >= 1280 ? 0.92 : window.innerWidth >= 768 ? 0.95 : 1)
//       : 1,
//     x: showAuth && window.innerWidth >= 768 
//       ? (window.innerWidth < 1280 ? "-2%" : "-4%") 
//       : 0,
//     transition: { duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }
//   }
// };


//   useEffect(() => {
//     const handleWheel = (e) => {
//       e.preventDefault();
//       if (Math.abs(e.deltaY) < 20) return;

//       if (e.deltaY > 0) navigate(page + 1);
//       else navigate(page - 1);
//     };

//     const handleKey = (e) => {
//       if (e.key === "ArrowRight" || e.key === "ArrowDown")
//         navigate(page + 1);
//       if (e.key === "ArrowLeft" || e.key === "ArrowUp")
//         navigate(page - 1);
//     };

//     let touchStartY = 0;

//     const handleTouchStart = (e) => {
//       touchStartY = e.touches[0].clientY;
//     };

//     const handleTouchEnd = (e) => {
//       const delta = touchStartY - e.changedTouches[0].clientY;

//       if (Math.abs(delta) > 50) {
//         if (delta > 0) navigate(page + 1);
//         else navigate(page - 1);
//       }
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });
//     window.addEventListener("keydown", handleKey);
//     window.addEventListener("touchstart", handleTouchStart);
//     window.addEventListener("touchend", handleTouchEnd);

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//       window.removeEventListener("keydown", handleKey);
//       window.removeEventListener("touchstart", handleTouchStart);
//       window.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [page, navigate]);

//   const CurrentSection = sections[page];

//   return (
//   <div className="h-screen w-full flex overflow-hidden relative">
//   <motion.div
//   variants={mainVariants}
//   animate={showAuth ? "shrunk" : "expanded"}
//   className="
//     relative h-full w-full min-w-0 top-0

//     sm-laptop:max-w-[1000px]
//     md-laptop:max-w-[1180px]
//     lg-desktop:max-w-[1320px]
//     xl-wide:max-w-[1480px]

//     mx-auto
//   "
// >

//   <motion.header 
//   className="
//     fixed top-0 left-0 right-0 z-[60] flex items-center justify-between
//     px-4 sm:px-6 md:px-8 lg:px-12
//     py-3 sm:py-4 md:py-5
//     bg-background/95 backdrop-blur-sm
//   "
//   initial={{ opacity: 0, y: -20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.5 }}
// >
//   {/* Logo */}
//   <div className="font-display font-bold text-lg sm:text-xl tracking-tight">
//     <span className="gradient-text">RBG</span>AI
//   </div>

//   <div className="flex items-center gap-3">
//     {/* Desktop Nav + Console Button */}
//     <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm text-muted-foreground">
//       {["Technology", "Privacy", "Federated Learning", "Company"].map((item) => (
//         <motion.a
//           key={item}
//           href="#"
//           className="hover:text-foreground transition-colors"
//           whileHover={{ y: -1 }}
//         >
//           {item}
//         </motion.a>
//       ))}
//     </nav>

//     {/* Always visible Launch Console Button */}
//     <motion.button
//       className="hidden md:block px-5 py-2 rounded-full text-accent-foreground text-sm font-medium ml-4"
//       style={{ background: "var(--gradient-accent)" }}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={() => setShowAuth((v) => !v)}
//     >
//       {showAuth ? "Close" : "Launch Console"}
//     </motion.button>

//     {/* Mobile/Desktop Hamburger - shows when console open OR mobile */}
//     {(showAuth || window.innerWidth < 1024) && (
//       <motion.button
//         className="p-1.5 rounded-lg hover:bg-accent/50 lg:hidden"
//         onClick={() => {
//           setIsMobileMenuOpen((v) => !v);
//           // Close auth if menu opened
//           if (isMobileMenuOpen) setShowAuth(false);
//         }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <div className="w-5 h-5 flex flex-col justify-center gap-1 bg-transparent p-0">
//           <motion.span
//             className="block w-5 h-0.5 rounded bg-foreground origin-left"
//             animate={{ 
//               rotate: isMobileMenuOpen ? 45 : 0, 
//               y: isMobileMenuOpen ? 1 : 0 
//             }}
//             transition={{ duration: 0.2 }}
//           />
//           <motion.span
//             className="block w-5 h-0.5 rounded bg-foreground"
//             animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
//             transition={{ duration: 0.2 }}
//           />
//           <motion.span
//             className="block w-5 h-0.5 rounded bg-foreground origin-left"
//             animate={{ 
//               rotate: isMobileMenuOpen ? -45 : 0, 
//               y: isMobileMenuOpen ? -1 : 0 
//             }}
//             transition={{ duration: 0.2 }}
//           />
//         </div>
//       </motion.button>
//     )}
//   </div>
//   {isMobileMenuOpen && (
//   <motion.div
//     className="lg:hidden fixed top-[80px] right-4 w-48 bg-background/95 backdrop-blur-xl 
//                border border-border rounded-xl shadow-2xl py-2 z-[70]"
//     initial={{ opacity: 0, scale: 0.95, y: -10 }}
//     animate={{ opacity: 1, scale: 1, y: 0 }}
//     exit={{ opacity: 0, scale: 0.95, y: -10 }}
//     transition={{ duration: 0.15 }}
//   >
//     {["Technology", "Privacy", "Federated Learning", "Company"].map((item) => (
//       <motion.a
//         key={item}
//         href="#"
//         className="block px-6 py-3 text-sm text-foreground hover:bg-accent/50 transition-colors"
//         onClick={() => setIsMobileMenuOpen(false)}
//         whileHover={{ x: 4 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         {item}
//       </motion.a>
//     ))}
//   </motion.div>
// )}

// </motion.header>


//       <AnimatePresence 
//         initial={false}
//         custom={direction}
//         mode="wait"
//         onExitComplete={() => { isAnimating.current = false; }}
//       >
//         <motion.div
//           key={page}
//           custom={direction}
//           variants={slideVariants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//           className="h-full w-full flex items-center justify-center absolute top-0 left-0"
//         >
//           <CurrentSection />
//         </motion.div>
//       </AnimatePresence>

//       {/* Single page counter - bottom-left */}
//       <motion.div
//         className="fixed bottom-8 left-8 z-40"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         {String(page + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
//       </motion.div>

//       {/* NavigationDots - shrinks/moves with main content */}
//      <NavigationDots
//   className="
//     right-4
//     md-laptop:right-6
//     lg-desktop:right-10
//   "
//   count={sections.length}
//   active={page}
//   onNavigate={navigate}
//   isAuthOpen={showAuth}
// />

//     </motion.div>

//     {/* Auth Panel */}
//    <motion.div
//   initial={{ width: 0, x: "100%" }}
//   animate={{
//     width: showAuth
//       ? window.innerWidth < 768 
//         ? "100vw"  // Full screen overlay on mobile
//         : window.innerWidth < 1200
//         ? 320      // Small laptops
//         : window.innerWidth < 1500
//         ? 380      // Medium  
//         : 440      // Large
//       : 0,
//     x: showAuth ? 0 : "100%",
//   }}
//   transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
//   className="h-screen md:h-full md:border-l md:border-border bg-background/95 backdrop-blur-xl flex-shrink-0 overflow-hidden z-30"
// >
//   {showAuth && <AuthPanel onClose={() => setShowAuth(false)} />}
// </motion.div>

//   </div>
// );

// };

// export default Index;




// import { useState, useCallback, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import HeroSection from "@/components/sections/HeroSection";
// import DiagnosticsSection from "@/components/sections/DiagnosticsSection";
// import ChatSection from "@/components/sections/ChatSection";
// import DrugDiscoverySection from "@/components/sections/DrugDiscoverySection";
// import PrivacySection from "@/components/sections/PrivacySection";
// import NavigationDots from "@/components/NavigationDots";
// import AuthPanel from "../pages/Login";

// const sections = [
//   HeroSection,
//   DiagnosticsSection,
//   ChatSection,
//   DrugDiscoverySection,
//   PrivacySection,
// ];

// const slideVariants = {
//   enter: (direction) => ({
//     x: direction > 0 ? "100%" : "-100%",
//     opacity: 0,
//     scale: 0.95,
//     filter: "blur(10px)",
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//     scale: 1,
//     filter: "blur(0px)",
//   },
//   exit: (direction) => ({
//     x: direction < 0 ? "100%" : "-100%",
//     opacity: 0,
//     scale: 0.95,
//     filter: "blur(10px)",
//   }),
// };

// const Index = () => {
//   const [[page, direction], setPage] = useState([0, 0]);
//   const isAnimating = useRef(false);
//   const [showAuth, setShowAuth] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   const navigate = useCallback(
//     (newPage) => {
//       if (isAnimating.current || newPage === page) return;
//       if (newPage < 0 || newPage >= sections.length) return;

//       isAnimating.current = true;
//       setPage([newPage, newPage > page ? 1 : -1]);
//     },
//     [page]
//   );

//   // Responsive scaling calculation
//   const getMainVariants = () => {
//     const width = window.innerWidth;
    
//     return {
//       expanded: {
//         scale: 1,
//         x: 0,
//         opacity: 1,
//         filter: "blur(0px) brightness(1)",
//         borderRadius: "0px",
//         transition: { 
//           duration: 0.9, 
//           ease: [0.22, 1, 0.36, 1],
//           opacity: { duration: 0.6 }
//         }
//       },
//       shrunk: {
//         scale: width < 768 ? 0.88 : width < 1024 ? 0.90 : width < 1280 ? 0.92 : width < 1536 ? 0.94 : 0.95,
//         x: width < 768 ? "-6%" : width < 1024 ? "-5%" : width < 1280 ? "-4%" : width < 1536 ? "-3%" : "-2.5%",
//         opacity: 0.95,
//         // filter: "blur(1px) brightness(0.95)",
//         borderRadius: width < 768 ? "16px" : width < 1024 ? "20px" : "24px",
//         transition: { 
//           duration: 0.9, 
//           ease: [0.68, -0.55, 0.265, 1.55],
//           opacity: { duration: 0.5 }
//         }
//       }
//     };
//   };

//   // Mouse move effect for subtle parallax
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 20,
//         y: (e.clientY / window.innerHeight - 0.5) * 20,
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   useEffect(() => {
//     const handleWheel = (e) => {
//       e.preventDefault();
//       if (Math.abs(e.deltaY) < 20) return;

//       if (e.deltaY > 0) navigate(page + 1);
//       else navigate(page - 1);
//     };

//     const handleKey = (e) => {
//       if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(page + 1);
//       if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(page - 1);
//     };

//     let touchStartY = 0;

//     const handleTouchStart = (e) => {
//       touchStartY = e.touches[0].clientY;
//     };

//     const handleTouchEnd = (e) => {
//       const delta = touchStartY - e.changedTouches[0].clientY;

//       if (Math.abs(delta) > 50) {
//         if (delta > 0) navigate(page + 1);
//         else navigate(page - 1);
//       }
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });
//     window.addEventListener("keydown", handleKey);
//     window.addEventListener("touchstart", handleTouchStart);
//     window.addEventListener("touchend", handleTouchEnd);

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//       window.removeEventListener("keydown", handleKey);
//       window.removeEventListener("touchstart", handleTouchStart);
//       window.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [page, navigate]);

//   const CurrentSection = sections[page];

//   return (
//     <div className="h-screen w-full flex overflow-hidden relative ">
//       {/* Animated background gradient orbs */}
//       {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full "
//           animate={{
//             x: mousePosition.x * 2,
//             y: mousePosition.y * 2,
//             scale: [1, 1.2, 1],
//           }}
//           transition={{
//             x: { duration: 0.3 },
//             y: { duration: 0.3 },
//             scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
//           }}
//         />
//         <motion.div
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full "
//           animate={{
//             x: -mousePosition.x * 2,
//             y: -mousePosition.y * 2,
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             x: { duration: 0.3 },
//             y: { duration: 0.3 },
//             scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 },
//           }}
//         />
//       </div> */}

//       {/* Main content area */}
//       <motion.div
//         variants={getMainVariants()}
//         animate={showAuth ? "shrunk" : "expanded"}
//         className="relative h-full w-full min-w-0 top-0 mx-auto overflow-hidden "
//         style={{
//           maxWidth: showAuth 
//             ? window.innerWidth < 768 ? "100%" : window.innerWidth < 1024 ? "90%" : "85%"
//             : "100%",
//         }}
//       >
//         {/* Vignette overlay when auth is open */}
//         <AnimatePresence>
//           {showAuth && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="absolute inset-0  pointer-events-none z-30"
//             />
//           )}
//         </AnimatePresence>

//         {/* Enhanced Header */}
//         <motion.header
//           className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-4 md:py-5"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ 
//             opacity: 1, 
//             y: 0,
//             backdropFilter: page > 0 ? "blur(0px)" : "blur(0px)"
//           }}
//           transition={{ delay: 0.5 }}
//           style={{
//             background: page > 0 
//               ? "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)"
//               : "transparent"
//           }}
//         >
//           <motion.div 
//             className="font-display font-bold text-xl md:text-2xl tracking-tight"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 400 }}
//           >
//             <div className="font-display font-bold text-xl tracking-tight">
//           <span className="gradient-text">AIR</span>Notes
//         </div>
//           </motion.div>

//           <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
//             {["Technology", "Privacy", "Federated Learning", "Company"].map((item, i) => (
//               <motion.a
//                 key={item}
//                 href="#"
//                 className="text-muted-foreground hover:text-foreground transition-colors relative group"
//                 whileHover={{ y: -2 }}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 + i * 0.1 }}
//               >
//                 {item}
//                 <motion.span
//                   className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-text group-hover:w-full transition-all duration-300"
//                 />
//               </motion.a>
//             ))}

//             <motion.button
//               className="px-5 py-2.5 rounded-full text-white text-sm font-medium relative overflow-hidden group"
//               style={{ 
//                 background: "linear-gradient(135deg, #66eadf 0%, #4b78a2 100%)",
//               }}
//               whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setShowAuth(true)}
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.8 }}
//             >
//               <span className="relative z-10">Launch Console</span>
//               <motion.div
//                 className="absolute inset-0 bg-gradient opacity-0 group-hover:opacity-100 transition-opacity"
//               />
//             </motion.button>
//           </nav>

//           {/* Mobile menu button */}
//           <motion.button
//             className="md:hidden p-2 rounded-lg bg-accent/20 "
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setShowAuth(true)}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </motion.button>
//         </motion.header>

//         {/* Sections with enhanced transitions */}
//         <AnimatePresence
//           initial={false}
//           custom={direction}
//           mode="wait"
//           onExitComplete={() => {
//             isAnimating.current = false;
//           }}
//         >
//           <motion.div
//             key={page}
//             custom={direction}
//             variants={slideVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ 
//               duration: 0.5, 
//               ease: [0.22, 1, 0.36, 1],
//               opacity: { duration: 0.3 },
//               filter: { duration: 0.3 }
//             }}
//             className="h-full w-full flex items-center justify-center absolute top-0 left-0"
//           >
//             <CurrentSection />
//           </motion.div>
//         </AnimatePresence>

//         {/* Enhanced page counter */}
//         <motion.div
//           className="fixed bottom-6 md:bottom-8 left-4 md:left-8 z-40 text-sm md:text-base font-mono"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 1 }}
//         >
//           <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/60  border border-border/50 shadow-lg">
//             <motion.span
//               key={page}
//               initial={{ y: 10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="text-lg font-bold gradient-text"
//             >
//               {String(page + 1).padStart(2, "0")}
//             </motion.span>
//             <span className="text-muted-foreground">/</span>
//             <span className="text-muted-foreground">
//               {String(sections.length).padStart(2, "0")}
//             </span>
//           </div>
//         </motion.div>

//         {/* Enhanced NavigationDots */}
//         <NavigationDots
//           className="right-4 md:right-6 lg:right-10"
//           count={sections.length}
//           active={page}
//           onNavigate={navigate}
//           isAuthOpen={showAuth}
//         />

//         {/* Progress bar */}
//         <motion.div
//           className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-800 z-50"
//           initial={{ width: "0%" }}
//           animate={{ width: `${((page + 1) / sections.length) * 100}%` }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//         />
//       </motion.div>

//       {/* Enhanced Auth Panel */}
//       <motion.div
//         initial={{ width: 0, x: "100%", opacity: 0 }}
//         animate={{
//           width: showAuth
//             ? window.innerWidth < 768
//               ? 280
//               : window.innerWidth < 1024
//               ? 340
//               : window.innerWidth < 1280
//               ? 380
//               : window.innerWidth < 1536
//               ? 420
//               : 460
//             : 0,
//           x: showAuth ? 0 : "100%",
//           opacity: showAuth ? 1 : 0,
//         }}
//         transition={{ 
//           duration: 0.9, 
//           ease: [0.68, -0.55, 0.265, 1.55],
//           opacity: { duration: 0.5 }
//         }}
//         className="h-full border-l border-border/50  flex-shrink-0 overflow-hidden z-40 shadow-2xl"
//       >
//         {showAuth && (
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="h-full"
//           >
//             <AuthPanel onClose={() => setShowAuth(false)} />
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Scroll indicator */}
//       <AnimatePresence>
//         {page === 0 && !showAuth && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ delay: 2 }}
//             className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
//           >
//             <span className="text-xs text-muted-foreground">Scroll to explore</span>
//             <motion.div
//               animate={{ y: [0, 8, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//               className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
//             >
//               <motion.div className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Index;