export const EmailReg = async (email: string) => {
    try {
        const response = await fetch(`/api/applicants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error(`Hiba: ${response.status}`);
        }

        const data = await response.json();
        console.log('Sikeres mentés:', data);
    } catch (error) {
        console.error('Hiba történt:', error);
    }
};