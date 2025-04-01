import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div
            className="h-screen flex flex-col justify-between bg-[url(./assets/jana-muller-tjDHhOfGAIY-unsplash.jpg)] bg-no-repeat bg-center bg-cover">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
                alt="uber-logo"
                className="w-[80px] mt-8 ml-8"
            />
            <div className="bg-white px-4 py-8 flex flex-col gap-5">
                <h2 className="font-bold text-3xl">Get Started with Uber</h2>
                <Link
                    to='/login'
                    className="self-center bg-black w-[80%] text-white px-2 py-2 rounded-lg text-center"
                >
                    Continue
                </Link>
                <div className="bg-black w-32 h-1 self-center rounded-2xl"></div>
            </div>
        </div>
    );
};

export default Start;
