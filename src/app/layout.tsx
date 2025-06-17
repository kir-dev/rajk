import type {Metadata} from "next";
import "./(app)/styles/globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/app/(app)/footer";

/*const robotoCondensed = Roboto_Condensed({
    variable: "--font-roboto-condensed",
    subsets: ["latin"],
});
const openSans = Open_Sans({
    variable: "--font-open-sans",
    subsets: ["latin"],
});*/


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
            <head>
                <script defer data-domain = "rajk.kir-dev.hu" src = {"https://visit.kir-dev.hu/js/script.js"}></script>
            </head>
            <body
                className = {`antialiased flex flex-col justify-between min-h-screen`}
            >
                <NavBar/>
                {children}
                <Footer/>
            </body>
        </html>
    );
}
