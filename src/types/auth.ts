import { signInValidationSchema } from "@/schemas/auth";
import z from "zod";

export type SignInFields = z.infer<typeof signInValidationSchema>;

export type SignInDto = SignInFields;

export interface User {
    id: string;
    email: string;
    isActivated: boolean;
    isAdmin: boolean;
}
