import { Montserrat } from "next/font/google";
import "./globals.css";
import ThemeProviderClient from "@/components/ThemeProviderClient";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Renata Dev Task",
  description: "Created By Nihan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        <ThemeProviderClient>
          {children}
        </ThemeProviderClient>
      </body>
    </html>
  );
}
