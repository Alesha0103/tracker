import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./endpoints";

export const useGetUsers = () => {
    return useQuery({
        retry: false,
        queryFn: getUsers,
        queryKey: ["get-users"],
        refetchOnWindowFocus: true,
    });
};
