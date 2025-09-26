import './(app)/styles/globals.css';
import ActionButton from "@/components/ActionButton";
import {ArrowRight} from "lucide-react";
import BuildingSVG from "@/components/BuildingSVG";
import { cookies } from 'next/headers';
import { t } from '@/lib/utils';
import type { Lang } from '@/components/LanguageProvider';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
    const cookieStore = cookies();
    const cookieLang = cookieStore.get('lang')?.value;
    const lang: Lang = cookieLang === 'EN' ? 'EN' : 'HU';

    return (
            <div
                className = "min-h-screen flex flex-col items-center justify-center text-center bg-foreground background">
                <BuildingSVG/>
                
                <h1 className = " mt-4 text-4xl font-bold text-black">{t(lang, '404 - Az oldal nem található', '404 - Page not found')}</h1>
                <p className = "mt-4 text-muted-foreground text-black">{t(lang, 'Elképzelhető, hogy még nem készült el.', 'It might not be ready yet.')}</p>
                <p className = "text-muted-foreground text-black">{t(lang, 'Ellenőrizd az URL-t vagy menj vissza a főoldalra.', 'Check the URL or go back to the homepage.')}</p>
                <ActionButton href = "/" className = 'mt-16'>
                    {t(lang, 'Főoldal', 'Homepage')}
                    <ArrowRight size = {20}/>
                </ActionButton>
            </div>
    );
}
