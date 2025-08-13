import React from "react";
import { TextUI } from "./typography";

export const Footer = () => {
    return (
        <footer className="border-t-2 border-white/10">
            <div className="container text-white h-10 flex items-center justify-center">
                <TextUI className="text-slate-500 text-xs">
                    © Created By Oleksii Skrebtsov
                </TextUI>
            </div>
        </footer>
    );
};
