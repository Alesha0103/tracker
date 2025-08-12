import { useMutation } from "@tanstack/react-query";
import { signIn } from "./endpoints";
import { useUserStore } from "@/store/user-store";

export const useSignIn = () => {
    const { setUser } = useUserStore();
    return useMutation({
        retry: false,
        mutationFn: signIn,
        mutationKey: ["sign-in"],
        onMutate: () => {},
        onSuccess: (user) => setUser(user),
    });
};
