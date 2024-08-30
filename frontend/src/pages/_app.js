import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClientNav from "@/components/clients/ClientNav";
import VolunteerNav from "@/components/volunteer/VolunteerNav";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

// Load Inter font
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F9EF1F",
      },
      secondary: {
        main: "#01A9FF",
      },
      text: {
        primary: "#585858",
      },
      red: {
        main: "#B23239",
      },
      gray: {
        main: "#EFEFEF",
      },
    },
  });

  const router = useRouter();
  var userType = "";
  if (router.pathname.includes("client")) userType = "client";
  else if (router.pathname.includes("volunteer")) userType = "volunteer";
  else if (router.pathname.includes("admin")) userType = "admin";

  return (
    <ThemeProvider theme={theme}>
      <div className={inter.className}>
        {userType === "client" && <ClientNav />}
        {userType === "volunteer" && <VolunteerNav />}
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
