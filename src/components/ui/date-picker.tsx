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
    placeholder?: string;
    isDisabled?: boolean;
    onChange: (date: Date | null) => void;
}

const CustomInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick, placeholder, isDisabled }, ref) => (
        <Input
            ref={ref}
            onClick={onClick}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly
        />
    )
);

CustomInput.displayName = "CustomInput";

export const FormDatePicker: FC<Props> = ({
    value,
    placeholder,
    isDisabled,
    onChange,
}) => {
    const tForms = useTranslations("forms");
    const { locale } = useUserStore();

    return (
        <DatePicker
            wrapperClassName="w-full"
            selected={value}
            onChange={onChange}
            customInput={
                <CustomInput
                    placeholder={tForms("datePlaceholder")}
                    isDisabled={isDisabled}
                />
            }
            placeholderText={placeholder || tForms("datePlaceholder")}
            dateFormat="YYYY-MM-d"
            maxDate={new Date()}
            locale={locale === Locale.UA ? uk : ""}
            disabled={isDisabled}
        />
    );
};
