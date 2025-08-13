import { api } from "../../configs/api";
import { AddUserDto } from "@/types/users";

export const addUser = async (dto: AddUserDto): Promise<any> => {
    const { data } = await api.post("/registration", dto);
    return data;
};
