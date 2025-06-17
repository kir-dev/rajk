import './(app)/globals.css';
import ActionButton from "@/components/ActionButton";
import {ArrowRight} from "lucide-react";
import BuildingSVG from "@/components/BuildingSVG";

export default function NotFound() {
    return (
            <div
                className = "min-h-screen flex flex-col items-center justify-center text-center bg-foreground background">
                <BuildingSVG/>
                
                <h1 className = " mt-4 text-4xl font-bold text-black">404 - Az oldal nem található</h1>
                <p className = "mt-4 text-muted-foreground text-black">Elképzelhető, hogy még nem készült el.</p>
                <p className = "text-muted-foreground text-black">Ellenőrizd az URL-t vagy menj vissza a főoldalra.</p>
                <ActionButton href = "/" className = 'mt-16'>
                    Főoldal
                    <ArrowRight size = {20}/>
                </ActionButton>
            </div>
    );
}
