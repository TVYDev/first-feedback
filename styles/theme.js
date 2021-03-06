import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Montserrat, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  },
  fontWeights: {
    normal: 400,
    semibold: 600,
    bold: 700,
  },
});

export default theme;
