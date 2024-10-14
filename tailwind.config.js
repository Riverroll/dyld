module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          pixel: ['PixelFont', 'monospace'],
        },
        animation: {
          'wave': 'wave 10s linear infinite',
          'ship-bounce': 'shipBounce 45s linear infinite',
          'cloud-loop': 'cloudLoop 60s linear infinite',
        },
        keyframes: {
          wave: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          shipBounce: {
            '0%, 100%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(calc(100vw - 80px))' },
          },
          cloudLoop: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(100%)' },
          },
        },
      },
    },
    plugins: [],
  }