import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { store } from "@/lib/store";
import { ZustandProvider } from "zustand/react";
import { ToastContainer } from "react-hot-toast";

import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <ZustandProvider store={store}>
          <ToastContainer position="bottom-center" />
          <Component {...pageProps} />
        </ZustandProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}