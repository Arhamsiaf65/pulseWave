import { Inter } from "next/font/google";
import NavBar from "@/components/navBar";
import { LoginProvider } from "@/context/login"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog site",
  description: "Depth in research and accuracy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className={`${inter.className} text-black bg-[#E7DFD8]`}>
        <LoginProvider>
          <NavBar />
          {children}
        </LoginProvider>
      </body>
    </html>
  );
}
