import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const defautTheme = createTheme({
  palette: {
    primary: {
      light: "#3a4bcd",
      dark: "#1f31b4",
      main: "#1f31b4",
      light2: "#ffb83c",
    },
  },
});

export default function ExamTheme({ children, theme = defautTheme }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
