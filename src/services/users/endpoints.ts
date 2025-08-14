import { api } from "../../configs/api";
import { AddUserDto, User } from "@/types/users";

export const addUser = async (dto: AddUserDto): Promise<User> => {
    const { data } = await api.post("/registration", dto);
    return data;
};

export const getUsers = async (): Promise<User[]> => {
    const { data } = await api.get("/users");
    return data;
};
