import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { RECRUITMENT_RELEASE_DATE } from '@/config/recruitment';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    if (Date.now() < RECRUITMENT_RELEASE_DATE.getTime()) {
        return new Response(null, { status: 404 });
    }
    const filePath = path.join(process.cwd(), 'private', '2026_Rajk-kerdoiv.docx');
    const file = await readFile(filePath);
    return new Response(new Uint8Array(file), {
        headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': 'attachment; filename="2026_Rajk-kerdoiv.docx"',
            'Cache-Control': 'no-store',
        },
    });
}
