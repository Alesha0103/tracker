import { useMutation } from "@tanstack/react-query";
import { logout, signIn } from "./endpoints";
import { useUserStore } from "@/store/user-store";
import { deleteToken, setAccessToken } from "@/configs/client-storage";

export const useSignIn = () => {
    const { setUser } = useUserStore();
    return useMutation({
        mutationFn: signIn,
        onSuccess: (data) => {
            setAccessToken({ accessToken: data.accessToken });
            setUser(data.user);
        },
        mutationKey: ["sign-in"],
        retry: false,
    });
};

export const useLogout = () => {
    const { setUser } = useUserStore();
    return useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            setUser(null);
            deleteToken();
        },
        mutationKey: ["logout"],
        retry: false,
    });
};
