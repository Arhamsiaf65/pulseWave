import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import SessionWrapper from "./components/sessionProvider"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me a chai",
  description: "Get a chai here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className="min-h-screen text-white  bg-blue-950 bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]" >
        <SessionWrapper>
          <NavBar />
          {
            <div className="min-h-screen text-white  bg-blue-950 bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
              {children}
            </div>
          }
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
