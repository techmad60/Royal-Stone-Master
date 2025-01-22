import type { Config } from "tailwindcss";
// import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // General Colors
        "color-zero": "#0F1C39",
        "color-one": "#419444", 
        "color-two": "#E4FFE2", 
        "color-three": "#FCFCFC", 
        "color-four": "#24222F",
        "colour-five": "rgba(15, 28, 57, 0.8)",
        "color-six" : "#21428C",
        "color-unit": "rgba(63, 73, 97, 1)",
        "color-form" : "rgba(107, 115, 133, 1)",
        "light-grey" : "rgba(252, 252, 252, 1)",
        "inactive" : "#88b489"
      },
      screens: {
        "xs": '375px',
        "2xs": '320px',
        "xlg": '1280px',
        "2xlg": "1320px",
      },
      lineHeight: {
        "base": "30px",
      },
      fontSize: {
        "base": "1rem",
        "lg-base": "28px",
      },
      borderRadius: {
        'common': "25px",
      }
    },
  },
  plugins: [
    
  ],
};
export default config;
