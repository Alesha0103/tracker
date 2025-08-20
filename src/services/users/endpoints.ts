import { api } from "../../configs/api";
import {
    AddUserDto,
    EditUserDto,
    Project,
    TrackingHoursDto,
    User,
    UsersResponse,
} from "@/types/users";

export const addUser = async (dto: AddUserDto): Promise<User> => {
    const { data } = await api.post("/registration", dto);
    return data;
};

export const getUsers = async (): Promise<UsersResponse> => {
    const { data } = await api.get("/users");
    return data;
};

export const editUser = async (id: string, dto: EditUserDto): Promise<User> => {
    const { data } = await api.patch(`/edit-user/${id}/update`, dto);
    return data;
};

export const deleteUser = async (id: string) => {
    await api.delete(`/delete-user/${id}/delete`);
};

export const trackingHours = async (dto: TrackingHoursDto): Promise<User> => {
    const { data } = await api.patch("/tracking", dto);
    return data;
};

export const getProjects = async (): Promise<Project[]> => {
    const { data } = await api.get("/projects");
    return data;
};
