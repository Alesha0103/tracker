import { SignInDto, User } from "@/types/auth";
import { api } from "../../configs/api";

export const signIn = async (dto: SignInDto): Promise<User> => {
    const { data } = await api.post("/login", dto, { withCredentials: true });
    return data;
};
