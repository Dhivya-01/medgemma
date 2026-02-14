


import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const FloatingCards = () => {
  const { t } = useTranslation('login'); // Add translation hook

  // Updated showcaseItems using translation keys
  const showcaseItems = [
    {
      title: t('showcase_deed_title'),
      description: t('showcase_deed_description'),
      icon: "📜",
      gradient: "from-red-300 to-orange-300",
    },
    {
      title: t('showcase_answer_title'),
      description: t('showcase_answer_description'),
      icon: "📑",
      gradient: "from-indigo-400 to-blue-400",
    },
    {
      title: t('showcase_captcha_title'),
      description: t('showcase_captcha_description'),
      icon: "🧩",
      gradient: "from-green-400 to-teal-400",
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* LEFT-BOTTOM HALF AREA */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 hidden md:flex items-center justify-around">
        {showcaseItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="relative bg-white/30 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 w-52 p-4 space-y-2"
            animate={{
              x: [0, idx % 2 === 0 ? 120 : -120, 0],
              rotate: [0, idx % 2 === 0 ? 8 : -8, 0],
            }}
            transition={{
              duration: 6 + idx * 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-9 h-9 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center shadow`}
              >
                <span className="text-lg">{item.icon}</span>
              </div>
              <h4 className="text-gray-800 font-semibold text-sm">
                {item.title}
              </h4>
            </div>
            <p className="text-gray-700 text-xs leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* On small screens, show compact stacked cards (optional) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex flex-col items-center space-y-3 md:hidden">
        {showcaseItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/60 backdrop-blur-md rounded-lg shadow-md border border-white/20 w-64 p-3"
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-md flex items-center justify-center shadow`}
              >
                <span className="text-base">{item.icon}</span>
              </div>
              <h4 className="text-gray-800 font-semibold text-sm">
                {item.title}
              </h4>
            </div>
            <p className="text-gray-700 text-xs mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingCards;
