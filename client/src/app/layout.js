import { Montserrat } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { SearchProvider } from "@/context/SearchContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { Suspense } from "react";

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
        <Suspense fallback={null}>
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
        </Suspense>
      </body>
    </html>
  );
}
