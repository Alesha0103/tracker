import { UserActivity, UserType } from "@/enums/users";
import { addUserSchema, editUserSchema, trackingSchema } from "@/schemas/users";
import z from "zod";

export type AddUserFields = z.infer<typeof addUserSchema>;
export type EditUserFields = z.infer<typeof editUserSchema>;
export type TrackingHoursFields = z.infer<typeof trackingSchema>;
export type FilterUsersFields = {
    email: string;
    projects: string;
    isAdmin: boolean;
    isUser: boolean;
    allTypes: boolean;
    userActive: boolean;
    userDisable: boolean;
    allActivity: boolean;
};

export type AddUserDto = AddUserFields;

export type EditUserDto = Omit<EditUserFields, "projects"> & {
    projects: string[] | null;
};

export type TrackingHoursDto = TrackingHoursFields & {
    userId: string;
    projectId: string;
};

export interface UsersDto {
    page: number;
    email?: string;
    userTypes?: UserType[];
    userActivity?: UserActivity[];
    projects?: string[];
}

export interface ProjectDto {
    userId?: string;
    projectId?: string;
}

export interface Project {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    hours: number;
    isDisabled: boolean;
    stats: Stats[];
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
    currentPage: number;
}

export interface FilterUsers {
    email?: string;
    userTypes?: UserType[];
    userActivity?: UserActivity[];
    projects?: string[];
    callback?: () => void;
}

export interface Stats {
    date: string;
    comment: string;
    hours: number;
}
