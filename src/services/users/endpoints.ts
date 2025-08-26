import { api } from "../../configs/api";
import {
    AddUserDto,
    EditStatDto,
    EditUserDto,
    Project,
    ProjectDto,
    TrackingHoursDto,
    User,
    UsersDto,
    UsersResponse,
} from "@/types/users";

export const addUser = async (dto: AddUserDto): Promise<User> => {
    const { data } = await api.post("/registration", dto);
    return data;
};

export const getUsers = async (dto: UsersDto): Promise<UsersResponse> => {
    const { data } = await api.post("/users", dto);
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

export const getUserProject = async (dto: ProjectDto): Promise<Project> => {
    const { data } = await api.post("/project", dto);
    return data;
};

export const editStat = async (dto: EditStatDto): Promise<Project> => {
    const { data } = await api.patch("/edit", dto);
    return data;
};
