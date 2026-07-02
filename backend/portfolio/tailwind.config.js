/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		screens: {
		  'ph': { 'max': '479px' },  // custom screen size
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  