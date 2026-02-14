

export const appConfig = {
    name: "MedGemma",

  color: {
    primary:
      String(import.meta.env.VITE_PRIMARY_COLOR) , 
    secondary: String(import.meta.env.VITE_SECONDARY_COLOR) || "#e06666", // Fallback color
    // info: String(import.meta.env.VITE_INFO_COLOR) || "", // Fallback color
    info: String(import.meta.env.VITE_INFO_COLOR) || "white", // Fallback color
  },
  enableJsonEditor: String(import.meta.env.VITE_ENABLE_JSON) === "true",
  embeddedUrl: String(import.meta.env.VITE_EMBEDDED_URL),
};
