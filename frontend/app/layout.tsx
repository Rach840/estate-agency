import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
});
const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Веб-приложение агентства недвижимости",
    description: "Портал для сотрудников по управлению агентством недвижимости",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased dark`}
            >
                <SidebarProvider>
                    <div className="flex h-screen flex-1">
                        <Sidebar />
                        <main className="flex-1 overflow-y-auto p-8">
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}
