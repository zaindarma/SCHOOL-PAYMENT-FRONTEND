import RouteGuard from "@/services/RouteGuard";
import "@/styles/globals.css";
import { Merriweather } from "next/font/google";
import { ToastProvider } from "@/context/ToastContext";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"], // Choose weights as needed
  style: ["normal", "italic"], // Choose styles as needed
  variable: "--font-merriweather", // Create a CSS variable
});

export default function App({ Component, pageProps }) {
  return (
    <ToastProvider>
      <RouteGuard>
        <main className={merriweather.className}>
          <Component {...pageProps} />
        </main>
      </RouteGuard>
    </ToastProvider>
  );
}
