"use client";

import { Button } from "@/components/ui/button";
import { Input } from "./input";
import { useTranslations } from "next-intl";
import { FC, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {
    value: Date | null;
    onChange: (date: Date | null) => void;
}

const CustomInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick, placeholder }, ref) => (
        <Input
            ref={ref}
            onClick={onClick}
            value={value}
            placeholder={placeholder}
            readOnly
        />
    )
);

CustomInput.displayName = "CustomInput";

export const FormDatePicker: FC<Props> = ({ value, onChange }) => {
    const tForms = useTranslations("forms");
    const [date, setDate] = useState<Date | null>(new Date());

    return (
        <DatePicker
            wrapperClassName="w-full"
            selected={value}
            onChange={onChange}
            customInput={
                <CustomInput placeholder={tForms("datePlaceholder")} />
            }
            placeholderText={tForms("datePlaceholder")}
            dateFormat="YYYY-d-MM"
        />
    );
};
