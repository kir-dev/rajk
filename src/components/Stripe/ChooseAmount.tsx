import { HeartHandshake, AlertCircle, Loader2 } from "lucide-react";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface ChooseAmountProps {
    amounts: number[];
    amount: number;
    setAmount: (amount: number) => void;
    name: string;
    setName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    onContinue: (param: string) => void;
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
}

export default function ChooseAmount(props: ChooseAmountProps) {
    const isFormComplete = props.name.trim() !== '' && props.email.trim() !== '';
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Update the onContinue handler
    const handleContinueWithRecaptcha = async () => {
        // First check if recaptcha is available
        if (!executeRecaptcha) {
            console.error("reCAPTCHA not loaded yet");
            props.setError('A biztonsági ellenőrzés nem töltött be. Kérjük frissítsd az oldalt.');
            return;
        }

        try {
            console.log("Executing reCAPTCHA...");
            const token = await executeRecaptcha('checkout');

            if (!token) {
                console.error("reCAPTCHA returned empty token");
                props.setError('A biztonsági ellenőrzés sikertelen. Próbáld újra.');
                return;
            }

            console.log("reCAPTCHA token received, proceeding with payment");
            props.onContinue(token);
        } catch (error) {
            console.error("reCAPTCHA execution failed:", error);
            props.setError('A biztonsági ellenőrzés során hiba történt. Kérjük próbáld újra később.');
        }
    };

    return (
        <div className="bg-white text-black rounded-2xl border-2 border-black p-6 shadow-lg">
            <div className="flex justify-center mb-6">
                <HeartHandshake className="h-16 w-16 text-zold" />
            </div>

            <h2 className="text-xl font-bold mb-4 text-center">Válassz összeget</h2>

            <div className="mb-6">
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <button
                        onClick={() => props.setAmount(props.amounts[0])}
                        className={`py-2 px-4 rounded-2xl border-2 border-black font-medium transition-colors 
                                    ${props.amount === props.amounts[0] ? 'bg-zold text-white' : 'bg-white hover:bg-gray-100'}`}
                    >
                        {(props.amounts[0] / 100).toLocaleString('hu-HU')} Ft
                    </button>
                    <button
                        onClick={() => props.setAmount(props.amounts[1])}
                        className={`py-2 px-4 rounded-2xl border-2 border-black font-medium transition-colors 
                                    ${props.amount === props.amounts[1] ? 'bg-zold text-white' : 'bg-white hover:bg-gray-100'}`}
                    >
                        {(props.amounts[1] / 100).toLocaleString('hu-HU')} Ft
                    </button>
                    <button
                        onClick={() => props.setAmount(props.amounts[2])}
                        className={`py-2 px-4 rounded-2xl border-2 border-black font-medium transition-colors 
                                    ${props.amount === props.amounts[2] ? 'bg-zold text-white' : 'bg-white hover:bg-gray-100'}`}
                    >
                        {(props.amounts[2] / 100).toLocaleString('hu-HU')} Ft
                    </button>
                </div>

                <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">Egyéni összeg (minimum 5000 Ft):</p>
                    <div className="flex items-center">
                        <input
                            type="number"
                            min="5000"
                            step="100"
                            value={props.amount / 100}
                            onChange={(e) => props.setAmount(Math.max(5000, Number(e.target.value)) * 100)}
                            className="w-full p-2 border-2 border-black rounded-2xl mr-2"
                        />
                        <span className="text-gray-700 font-medium">Ft</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 mb-6">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm text-gray-600 mb-1">Név:</label>
                    <input
                        id="name"
                        type="text"
                        value={props.name}
                        onChange={(e) => props.setName(e.target.value)}
                        className="w-full p-2 border-2 border-black rounded-2xl"
                        placeholder="Teljes név"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email cím:</label>
                    <input
                        id="email"
                        type="email"
                        value={props.email}
                        onChange={(e) => props.setEmail(e.target.value)}
                        className="w-full p-2 border-2 border-black rounded-2xl"
                        placeholder="email@pelda.hu"
                        required
                    />
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium mb-2">Kiválasztott összeg:</h3>
                <p className="text-2xl font-bold text-zold">{(props.amount / 100).toLocaleString('hu-HU')} Ft</p>
            </div>

            {props.error && (
                <div className="mt-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{props.error}</span>
                </div>
            )}

            <div className="mt-6">
                <button
                    onClick={handleContinueWithRecaptcha}
                    disabled={!isFormComplete || props.isLoading}
                    className="w-full py-3 px-6 bg-zold hover:bg-kek text-white font-medium border-2 border-black rounded-2xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {props.isLoading ? (
                        <>
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            <span>Betöltés...</span>
                        </>
                    ) : (
                        <span>Tovább a fizetéshez</span>
                    )}
                </button>
            </div>
        </div>
    );
}