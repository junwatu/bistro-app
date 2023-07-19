import { createCustomTheme } from '@roq/nextjs';

export const roqThemeLight = createCustomTheme({
  name: 'ROQ Custom Theme',
  base: {
    primary: '#00B5D8',
    secondary: '#03001C',
    // primary: "#00B5D8",
    // secondary: "#0A4D68",
  },
  typography: {
    family: "'Lato', sans-serif",
  },
});
