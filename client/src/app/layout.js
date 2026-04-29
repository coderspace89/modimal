import { Montserrat } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { SearchProvider } from "@/context/SearchContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Modimal - Women Clothing",
  description: "A women's clothing store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body>
        <SearchProvider>
          <FavoritesProvider>
            <CartProvider>
              <CheckoutProvider>
                <Header />
                {children}
                <Footer />
              </CheckoutProvider>
            </CartProvider>
          </FavoritesProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
