import { AuthResponse, SignInDto } from "@/types/auth";
import { api } from "../../configs/api";

export const signIn = async (dto: SignInDto): Promise<AuthResponse> => {
    const { data } = await api.post("/login", dto, { withCredentials: true });
    return data;
};

export const logout = async () => {
    await api.post("/logout", {}, { withCredentials: true });
};
