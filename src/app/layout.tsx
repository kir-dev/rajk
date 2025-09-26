import type {Metadata} from "next";
export const dynamic = "force-dynamic";
import "./(app)/styles/globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/app/(app)/footer";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/components/LanguageProvider";

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
    const cookieStore = cookies();
    const cookieLang = cookieStore.get("lang")?.value;
    const initialLang = cookieLang === "EN" ? "EN" : "HU";

    return (
        <html lang = {initialLang === "EN" ? "en" : "hu"}>
            <head title={"Rajk Szakkollégium"}>
                <script defer data-domain = "rajk.kir-dev.hu" src = {"https://visit.kir-dev.hu/js/script.js"}></script>
            </head>
            <body
                className = {`antialiased flex flex-col justify-between min-h-screen bg-bezs`}
            >
                <LanguageProvider initialLang={initialLang}>
                    <NavBar/>
                    {children}
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
