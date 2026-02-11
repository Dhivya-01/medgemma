import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Mic } from "lucide-react";
import { useState } from "react";

const sampleMessages = [
  { role: "user" as const, text: "What are the potential drug interactions for my current prescriptions?" },
  { role: "bot" as const, text: "Based on your medication list, I've identified one moderate interaction between Lisinopril and Potassium supplements. I recommend discussing dosage adjustments with your physician. Here's a detailed breakdown..." },
  { role: "user" as const, text: "Can you explain that interaction in simpler terms?" },
  { role: "bot" as const, text: "Of course! Both Lisinopril (your blood pressure medication) and potassium supplements can raise your potassium levels. Too much potassium can cause irregular heartbeat. Your doctor may want to monitor your levels more closely." },
];

const ChatSection = () => {
  const [visibleCount, setVisibleCount] = useState(2);
  const [inputValue, setInputValue] = useState("");

  const showMore = () => {
    if (visibleCount < sampleMessages.length) {
      setVisibleCount((v) => Math.min(v + 1, sampleMessages.length));
    }
  };

  return (
    <div className="section-container">
      <div className="absolute inset-0" style={{ background: "var(--gradient-subtle)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-sm font-semibold text-accent tracking-wide uppercase mb-4">
            Patient Assistant
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Your AI
            <br />
            <span className="gradient-text">health companion</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Natural conversation with deep medical knowledge. Ask about symptoms,
            medications, or treatment plans — always with evidence-based responses.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "24/7 Available", desc: "Always on assistance" },
              { label: "Multi-language", desc: "120+ languages" },
              { label: "Evidence-based", desc: "Peer-reviewed sources" },
              { label: "Empathetic", desc: "Contextual tone" },
            ].map((feat, i) => (
              <motion.div
                key={feat.label}
                className="glass-card p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className="text-sm font-semibold">{feat.label}</div>
                <div className="text-xs text-muted-foreground">{feat.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Chat */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-3xl overflow-hidden flex flex-col h-[480px]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold">MedAssist AI</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {sampleMessages.slice(0, visibleCount).map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {msg.role === "bot" && (
                      <div className="w-7 h-7 rounded-full bg-accent/10 flex-shrink-0 flex items-center justify-center mt-1">
                        <Bot className="w-3.5 h-3.5 text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-secondary text-secondary-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                        <User className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <motion.button
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mic className="w-4 h-4" />
                </motion.button>
                <input
                  className="flex-1 px-4 py-2.5 rounded-full bg-secondary text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Ask about your health..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && showMore()}
                />
                <motion.button
                  className="w-10 h-10 rounded-full flex items-center justify-center text-accent-foreground"
                  style={{ background: "var(--gradient-accent)" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={showMore}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatSection;
