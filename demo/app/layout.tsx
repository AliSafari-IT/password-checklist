import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "@asafarim/password-checklist/default.css";
import { SiteNav } from "./components/SiteNav";

export const metadata: Metadata = {
  title: "@asafarim/password-checklist — demo",
  description: "Interactive showcase of every feature in the @asafarim/password-checklist React component.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          <p>Built with <strong>@asafarim/password-checklist</strong>.</p>
          <a href="https://github.com/AliSafari-IT/password-checklist" target="_blank" rel="noreferrer">View source on GitHub</a>
        </footer>
        <Script src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-name="BMC-Widget" data-cfasync="false" data-id="asafarim" data-description="Support me on Buy me a coffee!" data-color="#5F7FFF" data-position="Right" data-x_margin="18" data-y_margin="18" strategy="afterInteractive" />
      </body>
    </html>
  );
}
