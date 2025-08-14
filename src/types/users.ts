import { addUserSchema } from "@/schemas/users";
import z from "zod";

export type AddUserFields = z.infer<typeof addUserSchema>;

export type AddUserDto = AddUserFields;

export interface User {
    id: string;
    email: string;
    isActivated: boolean;
    isAdmin: boolean;
}
