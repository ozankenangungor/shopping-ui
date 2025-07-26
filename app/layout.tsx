
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import darkTheme from "./dark.theme";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./header/header";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header/>
            <Container>
            {children}
            </Container>
            
          </ThemeProvider>

        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
