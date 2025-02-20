import type { Config } from "tailwindcss";
// import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'color-zero': '#0F1C39',
  			'color-one': '#419444',
  			'color-two': '#E4FFE2',
  			'color-three': '#FCFCFC',
  			'color-four': '#24222F',
  			'colour-five': 'rgba(15, 28, 57, 0.8)',
  			'color-six': '#21428C',
  			'color-unit': 'rgba(63, 73, 97, 1)',
  			'color-form': 'rgba(107, 115, 133, 1)',
  			'light-grey': 'rgba(252, 252, 252, 1)',
  			'inactive': '#88b489',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		screens: {
			'lxs' : '420px',
  			'xs': '375px',
  			'2xs': '320px',
  			'xlg': '1280px',
  			'2xlg': '1320px'
  		},
  		lineHeight: {
  			'base': '30px'
  		},
  		fontSize: {
  			'base': '1rem',
  			'lg-base': '28px'
  		},
  		borderRadius: {
  			common: '25px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
      require("tailwindcss-animate")
],
};
export default config;
