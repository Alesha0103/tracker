import { useMutation } from "@tanstack/react-query";
import { logout, signIn } from "./endpoints";
import { useUserStore } from "@/store/user-store";

export const useSignIn = () => {
    const { setUser } = useUserStore();
    return useMutation({
        mutationFn: signIn,
        onSuccess: (user) => {
            setUser(user);
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
        },
        mutationKey: ["logout"],
        retry: false,
    });
};
