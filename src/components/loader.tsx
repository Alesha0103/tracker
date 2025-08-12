import React, { FC } from "react";

interface Props {
    size?: number;
    borderSize?: number;
    color?: string;
}

export const Loader: FC<Props> = ({ size = 100, borderSize=5, color }) => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
                className="animate-spin rounded-full border-light-blue border-t-white/10"
                style={{
                    width: size,
                    height: size,
                    borderWidth: borderSize,
                    borderRightColor: color,
                    borderLeftColor: color,
                    borderBottomColor: color,
                }}
                aria-label="loading"
            />
        </div>
    );
};
