"use client";

import { Input } from "./input";
import { useTranslations } from "next-intl";
import { FC, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { uk } from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
import { useUserStore } from "@/store/user-store";
import { Locale } from "@/enums/auth";

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
    const { locale } = useUserStore();

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
            maxDate={new Date()}
            locale={locale === Locale.UA ? uk : ""}
        />
    );
};
