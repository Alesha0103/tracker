import { signInValidationSchema } from "@/schemas/auth";
import z from "zod";
import { User } from "./users";

export type SignInFields = z.infer<typeof signInValidationSchema>;

export type SignInDto = SignInFields;

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}
