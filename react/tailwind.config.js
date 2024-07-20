/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-webkit": {
                    "&::-webkit-scrollbar": {
                        width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "gray",
                        display: "none",
                        borderRadius: "40px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "darkgray",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                    ".scrollbar-hover:hover&::-webkit-scrollbar-thumb": {
                        display: "block",
                    },
                },
                ".btn-container": {
                    position: "relative",
                },
                ".icon-hidden": {
                    display: "none",
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                },
                ".btn-container:hover .icon-hidden": {
                    display: "block",
                },
                ".hidden": {
                    display: "none",
                },
                ".hover-element:hover .hidden": {
                    display: "block",
                },

                ".height-message": {
                    height: "420px",
                },
                ".width-notice": {
                    width: "350px",
                },
                ".-translate-y-10": {
                    transform: "translateY(-2.5rem)",
                },
            };
            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
};
