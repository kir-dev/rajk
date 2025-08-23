import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/app/(app)/footer";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <NavBar/>
            {children}
            <Footer/>
        </div>
    );
}
