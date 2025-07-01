import "./globals.css";

export const metadata = {
  title: "VinnovateIT",
  description: "Innovative Technical Club at VIT Vellore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
