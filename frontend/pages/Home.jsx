import React from 'react';

const Home = () => {
    return (
        <div className="h-screen w-full pt-8 font-bold  flex flex-col justify-between bg-red-400">
            <img
                // src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
                alt="uber-logo"
                className="w-18"
            />
            <div className="bg-white text-2xl h-40 text-center">
                <h2>Get Started with Uber</h2>
                <button
                    className="mt-4 px-4 py-2 border-amber-950 border-2 bg-blue-500 text-white rounded"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Home;