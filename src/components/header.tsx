import Image from "next/image";
import React from "react";

import Logo from "../assets/images/logo.png";

export const Header = () => {
    return (
        <div className="border-b-2 border-white/10 py-2 px-6">
            <div className="flex gap-x-2 items-center">
                <Image width={25} height={25} src={Logo} alt="logo" />
                <span className="text-white font-fantasy">Time Tracker</span>
            </div>
        </div>
    );
};
