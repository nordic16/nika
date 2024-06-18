import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        nika: {
          secondary: "#141414",
          primary: "#050505",

          blue: {
            primary: "#00BDDE",
          },
          green: "#10B981",
          red: "#FF5555",
          purple: "#B380FF",

        }
      }
    },
    container: {
      padding: '2rem',
    },
  },
  plugins: [],
};
export default config;
