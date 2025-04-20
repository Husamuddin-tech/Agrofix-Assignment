import { createTheme } from "@mui/material/styles";

const greeneryTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f0fdf4",
      paper: "#e9f5e1",
    },
    primary: {
      main: "#388e3c",
    },
    secondary: {
      main: "#81c784",
    },
    text: {
      primary: "#1b5e20",
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default greeneryTheme;
