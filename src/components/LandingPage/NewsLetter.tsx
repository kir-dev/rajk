export default function NewsLetter() {
    return (
        <div className="bg-zold p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Iratkozz fel hírlevelünkre!</h2>
            <p className="text-rajk-cream mb-6 text-center">Legyél naprakész a legfrissebb hírekkel és eseményekkel!</p>
            <form className="flex flex-col space-y-4">
                <input
                    type="email"
                    placeholder="Email címed"
                    className="p-3 border border-rajk-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-rajk-blue"
                    required
                />
                <button
                    type="submit"
                    className="bg-lila text-white py-3 rounded-lg hover:bg-rajk-blue hover:scale-105 duration-400 transition"
                >
                    Feliratkozás
                </button>
            </form>
        </div>
    )
}