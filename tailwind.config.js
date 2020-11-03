const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // purge: ['./dist/**/*.css'],
  experimental: {
    darkModeVariant: true,
  },
  dark: 'class',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/typography'),
  ],
};
