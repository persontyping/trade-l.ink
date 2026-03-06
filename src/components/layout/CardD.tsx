

export default function CardD() {
    return (
        <section className="atom-card shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6">
            <div className="flex items-center min-h-screen">
                <div className=" b-card">
                    <h1 className="text-center">
                        Join the Directory
                    </h1>

                    <div className="rounded-xl p-6 flex flex-col gap-4 ">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600" />
                        

                        <button type="submit" className="mt-2 px-4 py-2 btn-b rounded-lg">
                    
                            
                        </button>
              
                </div>
            </div>
            </div>

        </section>
    );
}

