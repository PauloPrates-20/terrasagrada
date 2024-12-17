import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: '#0b0a13',
				barColor: 'rgba(11,10,19,0.5)',
				textColor: '#ebcda9',
				titleColor: '#d6a659',
				barHov: '#4406067f',
				common: '#fff',
				uncommon: '#16cf05',
				rare: '#4494fd',
				veryRare: '#a555db',
				legendary: '#ff7b00',
				gold: '#ffbb33',
      },
    },
  },
  plugins: [],
} satisfies Config;
