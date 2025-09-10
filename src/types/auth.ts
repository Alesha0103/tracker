import { signInValidationSchema } from "@/schemas/auth";
import z from "zod";

export type SignInFields = z.infer<typeof signInValidationSchema>;

export type SignInDto = SignInFields;
