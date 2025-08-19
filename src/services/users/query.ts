import { useQuery } from "@tanstack/react-query";
import { getProjects, getUsers } from "./endpoints";

export const useGetUsers = () => {
    return useQuery({
        retry: false,
        queryFn: getUsers,
        queryKey: ["get-users"],
        refetchOnWindowFocus: true,
    });
};

export const useGetProjects = () => {
    return useQuery({
        retry: false,
        queryFn: getProjects,
        queryKey: ["get-projects"],
        refetchOnWindowFocus: true,
    });
};
