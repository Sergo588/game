// eslint-disable-next-line import/no-extraneous-dependencies
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Rubik'],
      body: ['Rubik'],
    },
    maxWidth: {
      'desktop-full': '1366px',
      'desktop-left-bar': '246px',
      'desktop-reg-info-card': '415px',
      'desktop-reg-status': '280px',
      'desktop-reg-gold-status': '546px',
      'desktop-main': '1042px', // used
      'main-page': '1180px', // used
      'desktop-invite': '1180px', // used
      '5px': '5px', // used
      '45px': '45px', // used
      '49px': '49px', // used
      '98px': '98px', // used
      '114px': '114px', // used
      '116px': '116px', // used
      '171px': '171px', // used
      '184px': '184px', // used
      '500px': '500px',
      '250px': '250px', // used
      '217px': '217px', // used
      '270px': '270px',
      '300px': '300px',
      '320px': '320px',
      '381px': '381px', // used
      '255px': '255px',
      '265px': '265px', // used
      '380px': '380px',
      '470px': '470px', // used
      '580px': '580px', // used
      '600px': '600px',
      '685px': '685px', // used
      '700px': '700px',
      '760px': '760px',
      '850px': '850px', // used
      full: '100%',
      '100px': '100px',
      '140px': '140px', // used
      '142px': '142px', // used
      '158px': '158px', // used
      '160px': '160px',
      '180px': '180px',
      '190px': '190px',
      '200px': '200px',
      '220px': '220px',
      '309px': '309px', // used
      '375px': '375px', // used
      '50%': '50%',
      '90%': '90%',
      'desktop-content': '1120px',
      'desktop-preview-bar': '1286px',
    },
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }
      lg: { max: '1121px' },
      sm: { max: '767px' },
    },
    extend: {
      linearBorderGradients: {
        directions: {
          tr: 'to top right',
          r: 'to right',
        },
        colors: {
          'blue-pink': ['#27B0E6', '#FA52A0'],
          'pink-red-light-brown': ['#FE5A75', '#FEC464'],
        },
        background: {
          'white-200': 'rgba(255, 255, 255, 0.2)',
          'dark-1000': '#0D0415',
          'dark-900': '#161522',
          'dark-800': '#202231',
          'dark-pink-red': '#4e3034',
          'black-light': '#242526',
          black: '#000000',
          'green-light': '#2CFF4E',
          purple: '#6439D0',
          'gradient-gold': 'linear-gradient(45deg, #A67D01 0%, #CFAB38 48.23%, #F8F0C9 100%)',
        },
        border: {
          1: '1px',
          2: '2px',
          3: '3px',
          4: '4px',
        },
      },
      borderColor: {
        'light-blue': '#2CD9FF',
      },
      rotate: {
        60: '60deg',
        '-60': '-60deg',
        120: '120deg',
        '-120': '-120deg',
        75: '75deg',
        '-75': '-75deg',
      },
      width: {
        3.25: '0.813rem',
        3.75: '0.938rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        13: '3.25rem',
        15: '3.75rem',
        30: '7.5rem',
        '1px': '1px', // used
        '12px': '12px',
        '15px': '15px',
        '18px': '18px',
        '26px': '26px',
        '40px': '40px',
        '50px': '50px', // used
        '52px': '52px',
        '60px': '60px',
        '70px': '70px', // used
        '80px': '80px',
        '88px': '88px',
        '98px': '98px',
        '100px': '100px', // used
        '114px': '114px', // used
        '118px': '118px',
        '120px': '120px',
        '130px': '130px',
        '158px': '158px',
        '159px': '159px', // used
        '170px': '170px', // used
        '180px': '180px', // used
        '204px': '204px', // used
        '210px': '210px', // used
        '300px': '300px',
        '320px': '320px',
        '386px': '386px',
        '417px': '417px', // used
        '450px': '450px',
        '510px': '510px',
        '540px': '540px',
        '720px': '720px',
        '900px': '900px',
        '50%': '50%', // used
        '75%': '75%', // used
        '90%': '90%',
        '100%': '100%', // used
      },
      margin: {
        '7px': '7px', // used
        '15px': '15px', // used
        '18px': '18px', // used
        '26px': '26px', // used
        '36px': '36px', // used
        12: '3rem',
        13: '3.125rem',
        15: '3.75rem',
        18: '4.375rem', // used
        7.5: '1.875rem', // used
        25: '6.25rem',
      },
      height: {
        3.25: '0.813rem',
        6.5: '1.625rem',
        7.5: '1.875rem', // used
        13: '3.25rem',
        15: '3.75rem',
        30: '7.5rem',
        '12px': '12px',
        '15px': '15px',
        '18px': '18px',
        '22px': '22px', // used
        '26px': '26px',
        '28px': '28px', // used
        '34px': '34px', // used
        '40px': '40px',
        '43px': '43px',
        '44px': '44px', // used
        '45px': '45px', // used
        '50px': '50px', // used
        '52px': '52px',
        '54px': '54px', // used
        '60px': '60px',
        '70px': '70px', // used
        '75px': '75px', // used
        '80px': '80px',
        '88px': '88px',
        '90px': '90px',
        '98px': '98px',
        '100px': '100px', // used
        '113px': '113px', // used
        '120px': '120px',
        '126px': '126px', // used
        '133px': '133px', // used
        '147px': '147px', // used
        '153px': '153px', // used
        '158px': '158px',
        '170px': '170px', // used
        '180px': '180px', // used
        '184px': '184px', // used
        '187px': '187px', // used
        '190px': '190px', // used
        '200px': '200px',
        '205px': '205px', // used
        '220px': '220px', // used
        '240px': '240px',
        '260px': '260px', // used
        '300px': '300px',
        '370px': '370px',
        '325px': '325px', // used
        '350px': '350px',
        '363px': '363px', // used
        '375px': '375px', // used
        '400px': '400px', // used
        '424px': '424px', // used
        '450px': '450px',
        '470px': '470px', // used
        '510px': '510px',
        '550px': '550px', // used
        '720px': '720px',
        '815px': '815px', // used
        '830px': '830px', // used
        '850px': '850px', // used
        '900px': '900px',
      },
      gridTemplateColumns: {
        '5-mc': 'repeat(5, minmax(0, max-content))',
      },
      colors: {
        blue: '#406AFF', // used
        lightBlue: '#4599EF',
        'lightBlue-200': 'rgba(69, 153, 239, 0.2)',
        'main-blue': '#406AFF', // used
        'blue-space': '#4bb1f7', // used
        'pink-space': '#FF6CAF', // used
        'dark-charcoal': '#323232', // used
        'main-blue-200': 'rgba(64, 106, 255, 0.2)',
        'main-blue-300': 'rgba(64, 106, 255, 0.3)',
        'main-blue-500': 'rgba(64, 106, 255, 0.5)',
        'hover-main-blue': '#547EFF',
        'active-main-blue': '#2C56EB',
        'blue-100': 'rgba(64, 106, 255, 0.1)',
        'dark-blue-100': 'rgba(64, 106, 255, 0.1)',
        'dark-blue-500': '#00567B',
        'dark-blue-900': '#1E262D',
        pink: '#f338c3',
        'dark-pink': '#D03A94',
        'dark-pink-200': 'rgba(208, 58, 148, 0.2)',
        'dark-pink-400': 'rgba(208, 58, 148, 0.4)',
        'active-pink': '#BB3485',
        'hover-pink': '#D54E9F',
        'light-pink': '#AF3395',
        green: '#2CFF4E',
        'green-100': 'rgba(44, 255, 78, 0.1)',
        'green-200': 'rgba(44, 255, 78, 0.2)',
        'green-650': 'rgba(44, 255, 78, 0.65);',
        'green-350': '#21B914',
        'green-700': '#00A38C',
        'hover-green': '#4dc742',
        'active-green': '#2FB697', // used
        'light-green': '#3D8C86', // used
        'light-green-200': 'rgba(0, 255, 209, 0.2)',
        red: '#E1444D',
        'red-200': 'rgba(225, 68, 77, 0.2)',
        'red-500': 'rgba(225, 68, 77, 0.5)',
        'red-700': 'rgba(225, 68, 77, 0.7)',
        'hover-red': '#E4575F',
        'active-red': '#CA3D45',
        'dark-grey': '#242526', // used
        'dark-grey-900': '#242525', // used
        'dark-grey-800': '#232425', // used
        'dark-grey-700': '#383838', // used
        'dark-grey-500': '#393A3B', // used
        'hover-dark-gray': '#2F3031', // used
        'active-dark-gray': '#161717', // used
        'gray-950': '#1D1D1D',
        'gray-900': '#1C1D1D',
        'gray-800': '#1E1F1F', // used
        'gray-850': '#252525',
        'gray-700': '#1E1F20', // used
        'gray-650': '#363636', // used
        'gray-550': '#49494A', // used
        yellow: '#F0B90B', // used
        'light-yellow': '#FFD84D', // used
        'preview-yellow': '#F6CC45', // used
        'active-yellow': '#E6AF01', // used
        'light-yellow-700': '#FFCA43', // used
        'yellow-100': 'rgba(255, 215, 1, .1)', // used
        'yellow-200': 'rgba(255, 215, 1, .2)', // used
        'yellow-250': 'rgba(240, 185, 11, 0.2)', // used
        orange: '#E9973D',
        'hover-orange': '#FFAB56',
        'active-orange': '#E6923C',
        'orange-100': 'rgba(255, 162, 67, .1)',
        'orange-200': 'rgba(255, 162, 67, .2)',
        peach: '#FF8282', // used
        'pink-xxx': '#D03A94',
        'light-blue': '#69D4FA',
        'light-blue-100': 'rgba(45, 215, 255, 0.1)',
        'light-blue-200': 'rgba(45, 215, 255, 0.2)',
        'light-blue-900': '#2F6F96',
        'light-blue-800': '#227B93',
        'dark-blue': '#0F182A',
        'dark-1000': '#0D0415',
        'dark-950': '#1E1E1F',
        'dark-900': '#161522',
        'dark-850': '#1d1e2c',
        'dark-800': '#202231',
        'dark-700': '#2E3348',
        'dark-600': '#1C2D49',
        'dark-500': '#223D5E',
        'black-light': 'rgba(36, 37, 38, 1)',
        black: '#000000',
        'black-2': '#0D0E0F',
        'black-500': 'rgba(24, 25, 26, 0.5)',
        'gray-500': '#464748',
        'gray-400': '#343434', // used
        'grey-160': 'rgba(120, 120, 128, 0.16)', // used
        'grey-900': 'rgba(27, 28, 29, 0.9)', // used
        'active-gray': '#202122',
        'shadow-gray': 'rgba(58, 59, 60, 1)',
        'green-light': '#2CFF4E',
        'main-bg': '#18191A',
        'main-bg-200': 'rgba(24, 25, 26, 0.2)',
        'gold-900': '#A67D01',
        'gold-500': '#CFAB38',
        'gold-100': '#F8F0C9',
        'line-gray': '#3A3B3C',
        'light-grey': '#C4C4C4',
        white: '#FFFFFF',
        'light-gray': '#929498', // used
        'gray-600': '#888F96', // used
        gray: '#25262B', // used
        darkGray: 'rgba(36, 37, 38, 0.85)',
        'black-100': 'rgba(0, 0, 0, 0.1)', // used
        'black-700': 'rgba(0, 0, 0, 0.7)',
        'black-870': 'rgba(0, 0, 0, 0.87)', // used
        'white-50': 'rgba(255, 255, 255, 0.05)', // used
        'white-100': 'rgba(255, 255, 255, 0.1)', // used
        'white-200': 'rgba(255, 255, 255, 0.2)',
        'white-300': 'rgba(255, 255, 255, 0.3)',
        'white-350': 'rgba(255, 255, 255, 0.35)', // used
        'white-500': 'rgba(255, 255, 255, 0.5)',
        'white-600': 'rgba(255, 255, 255, 0.6)',
        'white-700': 'rgba(255, 255, 255, 0.7)',
        'white-900': 'rgba(255, 255, 255, 0.9)',
        silver: '#DBE4EB',
        purple: '#925FFF',
        'light-purple': '#6169D5', // used
        'dark-purple': '#292D49', // used
        gold: '#F3BA2F', // used
      },
      lineHeight: {
        '7px': '7px', // used
        '9px': '9px', // used
        '10px': '10px', // used
        '11px': '11px', // used
        '12px': '12px', // used
        '14px': '14px', // used
        '17px': '17px', // used
        '19px': '19px', // used
        '22px': '22px', // used
        '30px': '30px', // used
        '36px': '36px', // used
        '48px': '48px', // used
        '72px': '72px', // used
        '8rem': '8rem', // used
      },
      fill: {
        purple: '#6439D0',
      },
      fontSize: {
        'two-half': '2.5rem',
        'sup-xs': '.5rem',
        'quarter-2xl': '1.575rem', // used
        '8px': '8px', // used
        '10px': '10px', // used
        '12px': '12px', // used
        '15px': '15px', // used
        '18px': '18px', // used
        '20px': '20px', // used
        '21px': '21px', // used
        '22px': '22px', // used
        '26px': '26px', // used
        '34px': '34px', // used
        '40px': '40px', // used
        '42px': '42px', // used
        '64px': '64px', // used
        '80px': '80px', // used
        mini: '.625rem', // used
        '8rem': '8rem', // used
        '5px': '0.313rem',
        h2: [
          '2.25rem',
          {
            lineHeight: '36px', // used
            fontWeight: 400,
          },
        ],
        hero: [
          '48px',
          {
            letterSpacing: '-0.02em;',
            lineHeight: '96px',
            fontWeight: 700,
          },
        ],
        '3.5xl': [
          '2rem',
          {
            lineHeight: '2.8rem',
            fontWeight: 700,
          },
        ], // used
      },
      borderRadius: {
        none: '0',
        px: '1px',
        '3px': '3px', // used
        '5px': '5px', // used
        '7px': '7px', // used
        DEFAULT: '20px',
        mini: '10px', // used
        small: '15px',
        large: '60px',
        '50%': '50%', // used
      },
      boxShadow: {
        swap: '0px 50px 250px -47px rgba(39, 176, 230, 0.29)',
        liquidity: '0px 50px 250px -47px rgba(123, 97, 255, 0.23)',
        'pink-glow': '0px 57px 90px -47px rgba(250, 82, 160, 0.15)',
        'blue-glow': '0px 57px 90px -47px rgba(39, 176, 230, 0.17)',
        'pink-glow-hovered': '0px 57px 90px -47px rgba(250, 82, 160, 0.30)',
        'blue-glow-hovered': '0px 57px 90px -47px rgba(39, 176, 230, 0.34)',
        'preview-bar': '0px 13.1936px 19.7904px rgba(0, 0, 0, 0.2)',
        'notification-header': '0px 30px 30px #18191A',
        'freeze-program': 'inset 0px 0px 15px rgba(0, 0, 0, 0.75)',
      },
      ringWidth: {
        DEFAULT: '1px',
      },
      padding: {
        '6px': '6px', // used
        '8px': '8px', // used
        '12px': '12px', // used
        '18px': '18px', // used
        4.5: '1.125rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        px: '1px',
        '3px': '3px',
        '15px': '15px',
        13: '3.125rem',
        15: '3.75rem',
        18: '4.375rem',
        22: '5.625rem', // used
        25: '6.25rem',
        '470px': '470px', // used
      },
      minWidth: {
        '5px': '5px', // used
        '114px': '114px', // used
        '171px': '171px', // used
        '30px': '30px',
        '49px': '49px', // used
        '75px': '75px', // used
        '44px': '44px', // used
        '32px': '32px',
        '100px': '100px',
        '103px': '103px', // used
        '130px': '130px',
        '140px': '140px',
        '142px': '142px', // used
        '158px': '158px',
        '160px': '160px', // used
        '180px': '180px',
        '200px': '200px', // used
        '210px': '210px', // used
        '220px': '220px',
        '290px': '290px', // used
        '320px': '320px',
        '928px': '928px', // used
        '1040px': '1040px', // used
      },
      minHeight: {
        programDashboard: '200px',
        programDashboardMobile: '164px',
        empty: '128px',
        cardContent: '230px',
        fitContent: 'fit-content',
        '5px': '5px', // used
        '18x': '18px', // used
        '24px': '24px', // used
        '64px': '64px', // used
        '50px': '50px',
        '100px': '100px',
        '103px': '103px', // used
        '158px': '158px',
        '180px': '180px',
        '200px': '200px',
        '228px': '228px', // used
        '240px': '240px',
        '280px': '280px',
        '290px': '290px',
        '318px': '318px', // used
        '330px': '330px',
        '340px': '340px',
        '380px': '380px',
        '363px': '363px', // used
        '600px': '600px',
        90: '370px',
        '550px': '550px',
        '1/2': '50vh',
      },
      maxHeight: {
        '3/4': '75vh',
        '75%': '75%', // used
        '5px': '5px', // used
        '18px': '18px', // used
        '24px': '24px', // used
        '30px': '30px', // used
        '40px': '40px', // used
        '47px': '47px', // used
        '55px': '55px', // used
        '85px': '85px', // used
        '100px': '100px',
        '118px': '118px',
        '128px': '128px', // used
        '140px': '140px',
        '180px': '180px',
        '200px': '200px', // used
        '220px': '220px', // used
        '225px': '225px', // used
        '250px': '250px',
        '300px': '300px',
        '350px': '350px',
        '363px': '363px', // used
        '370px': '370px',
        '423px': '423px', // used
        '450px': '450px',
        '500px': '500px', // used
        '550px': '550px', // used
        '650px': '650px', // used
        7.5: '1.875rem',
      },
      blur: {
        '190px': '190px',
        '400px': '400px',
        '500px': '500px',
        '800px': '800px',
      },
      gap: {
        '16px': '16px', // usd
        '26px': '26px', // used
        '30px': '30px',
      },
      inset: {
        '-45px': '-45px', // used
        '34px': '34px', // used
        '39px': '39px', // used
        '40px': '40px', // used
        '78px': '78px', // used
        '84px': '84px',
        '110px': '110px',
        '132px': '132px',
        '135px': '135px', // used
        '184px': '184px',
        '210px': '210px',
      },
      spacing: {
        7.5: '1.875rem',
        13: '3.125rem',
        18: '4.375rem', // used
        25: '6.25rem',
        34: '8.5rem',
        '400px': '400px', // used
        '450px': '450px', // used
      },
      translate: {
        '-120%': '-120%',
      },
      scale: {
        85: '.85',
      },
      zIndex: {
        one: '1', // used
        two: '2', // used
        three: '3', // used
        3: '3',
        999999: '999999',
        1999999: '1999999',
      },
    },
  },
  variants: {
    linearBorderGradients: ['responsive', 'hover', 'dark'], // defaults to ['responsive']
    extend: {
      backgroundColor: ['checked', 'disabled'],
      backgroundImage: ['hover', 'focus'],
      borderColor: ['checked', 'disabled'],
      cursor: ['disabled'],
      opacity: ['hover', 'disabled'],
      placeholderColor: ['hover', 'active'],
      ringWidth: ['disabled'],
      ringColor: ['disabled'],
      height: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwindcss-border-gradient-radius'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.desktop-progtam-item': {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '1.25rem',
          borderRadius: '15px',
          height: '180px',
          width: '180px',
        },
        '.gradient-main-card': {
          background: 'linear-gradient(126.1deg, #8000FF 23.19%, #FFA800 137.16%)',
        },
        '.gradient-main': {
          background: 'linear-gradient(126.1deg, #8000FF 23.19%, #F0B90B 137.16%)', // used
        },
        '.gradient-second': {
          background: 'linear-gradient(134.1deg, #F0B90B 7.95%, #D358A9 86.39%)', // used
        },
        '.wallet-gradient-main': {
          background: 'linear-gradient(180deg, #406AFF 0%, rgba(64, 106, 255, 0) 100%)',
        },
        '.round1_big_tab': {
          background: 'linear-gradient(180deg, #9B29BC -99.29%, #242526 92.87%)', // used
        },
        '.round2_big_tab': {
          background: 'linear-gradient(180deg, #FFA234 -99.29%, #242526 92.87%)', // used
        },
        '.banner-gradient-xgold': {
          background: 'linear-gradient(87.35deg, #E16620 0%, #FFA243 100%)',
        },
        '.banner-gradient-xgold-mobile': {
          background: 'linear-gradient(169.68deg, #E16620 0%, #FFA243 100%)',
        },
        '.card-gold': {
          background: 'linear-gradient(134.1deg, #F0B90B 7.95%, #D358A9 86.39%)',
        },
        '.card-purple': {
          background: 'linear-gradient(82.55deg, #8000FF 6.34%, #F0B90B 221.54%)',
        },
        '.desktop-infoblock-base': {
          minWidth: '140px',
          minHeight: '140px',
        },
        '.desktop-infoblock-chart-base': {
          maxWidth: '500px',
        },
        '.mobile-infoblock-base': {
          minWidth: '118px',
          minHeight: '118px',
        },
        '.min-height-events-table': {
          minHeight: '403px',
        },
        '.flex-1-1-0': {
          flex: '1 1 0',
        },
        '.header-dialog-content': {
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'center',
          margin: '4rem 0.5rem',
          padding: '0px',
          boxShadow: 'rgb(0 0 0 / 5%) 0px 4px 8px 0px',
          width: '100vw',
          maxWidth: '480px',
          maxHeight: '100vh',
          outline: 'none',
        },
        '.header-dialog-overlay': {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 9998,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#18191A',
        },
      });
    }),
  ],
};
