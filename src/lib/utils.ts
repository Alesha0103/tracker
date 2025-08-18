import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const handleHoursChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
) => {
    let value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) return;
    if (/^0\d+$/.test(value)) {
        value = "0." + value.slice(1);
    }
    if (
        (value === "" || /^\d*\.?\d{0,2}$/.test(value)) &&
        (value === "" || Number(value) <= 24)
    ) {
        onChange(value);
    }
};
