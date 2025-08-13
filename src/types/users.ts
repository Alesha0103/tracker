import { signInValidationSchema } from "@/schemas/auth";
import { addUserSchema } from "@/schemas/users";
import z from "zod";

export type AddUserFields = z.infer<typeof addUserSchema>;

export type AddUserDto = AddUserFields;
