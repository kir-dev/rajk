import type {Metadata} from "next";
import {Open_Sans, Roboto_Condensed} from "next/font/google";
import "./(app)/globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/app/(app)/footer";

const robotoCondensed = Roboto_Condensed({
    variable: "--font-roboto-condensed",
    subsets: ["latin"],
});
const openSans = Open_Sans({
    variable: "--font-open-sans",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "Rajk",
    description: "Rajk Szakkollégium",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang = "en">
            
            <body
                className = {`${robotoCondensed.variable} ${openSans.variable} antialiased font-open-sans`}
            >
                <NavBar/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}
