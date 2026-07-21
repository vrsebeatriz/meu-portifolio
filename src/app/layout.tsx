import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import { Github, Linkedin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Ana Beatriz | Software Engineer Student & Researcher",
  description: "Portfolio de Ana Beatriz Araújo Silva, estudante de Ciência da Computação na UERN, desenvolvedora Full-Stack e pesquisadora em IA e Cibersegurança.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-[#0a0f1d] text-beige selection:bg-prime selection:text-white`}>
        <Preloader />
        <CustomCursor />
        {/* Sidebar Socials */}
        <div className="fixed left-6 bottom-0 hidden md:flex flex-col items-center gap-6 z-50">
          <div className="flex flex-col gap-4">
            <a href="https://github.com/vrsebeatriz" target="_blank" className="text-muted hover:text-prime transition-all hover:-translate-y-1">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/beatriz-araújo-381b2b249" target="_blank" className="text-muted hover:text-prime transition-all hover:-translate-y-1">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anabaraujo009@gmail.com&su=Contato via Portfolio" target="_blank" className="text-muted hover:text-prime transition-all hover:-translate-y-1">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <div className="w-[2px] h-32 bg-beige-dark" />
        </div>

        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
