import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const PRIMARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  darkerEven: "#13005A",
  contrastText: "#FFF",
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      mode: "dark",
      primary: PRIMARY,
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: "'Work Sans', sans-serif",
      h5: {
        fontWeight: 800,
        letterSpacing: 3,
      },
      h6: {
        fontSize: "28px",
        fontWeight: 600,
      },
      body: {
        fontSize: "18px",
        fontWeight: 300,
      },
      body1: {
        fontWeight: 600,
      },
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
