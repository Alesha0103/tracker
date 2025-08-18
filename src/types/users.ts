import { addUserSchema, editUserSchema } from "@/schemas/users";
import z from "zod";

export type AddUserFields = z.infer<typeof addUserSchema>;
export type EditUserFields = z.infer<typeof editUserSchema>;

export type AddUserDto = AddUserFields;

export type EditUserDto = Omit<EditUserFields, "projects"> & {
    projects: string[] | null;
};

export interface Projects {
    name: string;
    createdAt: string;
    updatedAt: string;
    trackedHours: number;
}

export interface User {
    id: string;
    email: string;
    isActivated: boolean;
    isAdmin: boolean;
    trackedHours: number;
    projects: Projects[];
}
