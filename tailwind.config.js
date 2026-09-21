/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090C",
        surface: "#0F1117",
        "surface-raised": "#161922",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        "metallic-silver": "#E2E8F0",
        "metallic-dark": "#94A3B8",
        csk: {
          yellow: "#FFDF00",
          gold: "#E5A823",
          dark: "#B8860B"
        },
        india: {
          blue: "#0077B6",
          navy: "#023E8A",
          saffron: "#FF9933",
          green: "#138808"
        },
        accent: {
          cyan: "#00F0FF",
          gold: "#FFD700",
          emerald: "#10B981",
          rose: "#F43F5E"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "radial-stadium": "radial-gradient(ellipse at top, rgba(0, 119, 182, 0.15) 0%, rgba(8, 9, 12, 0) 70%)",
        "radial-csk": "radial-gradient(ellipse at top, rgba(229, 168, 35, 0.15) 0%, rgba(8, 9, 12, 0) 70%)",
        "gradient-metallic": "linear-gradient(135deg, #FFFFFF 0%, #94A3B8 50%, #475569 100%)",
        "gradient-gold": "linear-gradient(135deg, #FFF066 0%, #FFDF00 50%, #B8860B 100%)",
        "gradient-blue": "linear-gradient(135deg, #60A5FA 0%, #0077B6 50%, #023E8A 100%)",
      },
      boxShadow: {
        "glow-gold": "0 0 35px -5px rgba(255, 223, 0, 0.3)",
        "glow-blue": "0 0 35px -5px rgba(0, 119, 182, 0.3)",
        "glow-cyan": "0 0 35px -5px rgba(0, 240, 255, 0.3)",
        "stadium": "0 20px 50px rgba(0, 0, 0, 0.8)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
};
