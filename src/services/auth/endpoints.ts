import { SignInDto } from "@/types/auth";
import { api } from "../../configs/api";
import { User } from "@/types/users";

export const signIn = async (dto: SignInDto): Promise<User> => {
    const { data } = await api.post("/login", dto, { withCredentials: true });
    return data;
};

export const refresh = async () => {
    await api.get("/refresh", { withCredentials: true });
};

export const logout = async () => {
    await api.post("/logout", {}, { withCredentials: true });
};
