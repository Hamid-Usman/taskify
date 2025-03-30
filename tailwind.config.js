/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
	colors: {
		primary: '#F28F3B',
		accent: '#9DB4C0',
		accent_low: '#3C484E',
		secondary: '#1B2228',
		secondary_low: '#9db4c027',
		white: '#F7F7F7',
		gray: '#545454',
		primary_low: '#f2903b1e',
		black: '#010B13',
		error: '#DC143C',
		error_subtle: '#f2738e'
	},
	extend: {
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		colors: {}
	}
	},
	plugins: [tailwindcssAnimate],
}

//#5B85AA