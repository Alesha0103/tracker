import { addUserSchema, editUserSchema, trackingSchema } from "@/schemas/users";
import z from "zod";

export type AddUserFields = z.infer<typeof addUserSchema>;
export type EditUserFields = z.infer<typeof editUserSchema>;
export type TrackingHoursFields = z.infer<typeof trackingSchema>;

export type AddUserDto = AddUserFields;

export type EditUserDto = Omit<EditUserFields, "projects"> & {
    projects: string[] | null;
};

export type TrackingHoursDto = TrackingHoursFields & {
    userId: string;
    projectId: string;
};

export interface Project {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    hours: number;
    isDisabled: boolean;
}

export interface User {
    id: string;
    email: string;
    isActivated: boolean;
    isAdmin: boolean;
    totalHours: number;
    projects: Project[];
}

export interface UsersResponse {
    users: User[];
    pages: number;
}
