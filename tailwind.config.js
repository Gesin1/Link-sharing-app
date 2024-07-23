/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        email: "url('/src/img/mail-icon.svg')",
        lock: "url('/src/img/lock-icon.svg')",
      },
      backgroundPosition: {
        "email-10px-center": "20px center",
        "lock-20px-center": "20px center",
      },
      backgroundSize: {
        "email-50px": "15px",
        "lock-50px": "13px",
      },
    },
  },
  plugins: [],
};
