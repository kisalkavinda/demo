import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-cormorant'
});

export const metadata: Metadata = {
  title: "GemHaven | Sri Lanka's Gem Trade, Digitally Transformed",
  description: "A digital transformation platform for Sri Lankan gem mining and trading based in Ratnapura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased bg-[#1a1a0e]`}>
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
          {/* SVG Noise Texture */}
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="w-full h-full opacity-[0.8]">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}
