/** @type {import('tailwindcss').Config} */
export default {
      content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
            "./src/**/*.{html,js}",
            "./node_modules/tw-elements/dist/js/**/*.js",
            "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
      ],
      theme: {
            extend: {},
      },
      plugins: [require("tw-elements/dist/plugin.cjs")],
}
