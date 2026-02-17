import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["Technology", "Privacy", "Federated Learning", "Company"];

export default function MainNavbar({ onLaunch }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-[1480px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="font-display font-bold text-xl tracking-tight">
          <span className="gradient-text">RBG</span>AI
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <a
              key={item}
              className="hover:text-foreground transition-colors cursor-pointer"
              href="#"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <motion.button
            onClick={onLaunch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full font-medium text-sm
            bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
          >
            Launch Console
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {navItems.map((item) => (
                <a
                  key={item}
                  className="text-base text-muted-foreground cursor-pointer"
                >
                  {item}
                </a>
              ))}

              <button
                onClick={() => {
                  setOpen(false);
                  onLaunch();
                }}
                className="mt-4 rounded-lg py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
              >
                Launch Console
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
