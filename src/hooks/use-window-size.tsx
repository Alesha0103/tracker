"use client";

import { useEffect, useState } from "react";

export const useWindowSize = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const getSize = () =>
            setSize({ width: window.innerWidth, height: window.innerHeight });

        getSize();
        window.addEventListener("resize", getSize);

        return () => window.removeEventListener("resize", getSize);
    }, []);

    return { ...size, isMobile: size.width < 768 };
};
