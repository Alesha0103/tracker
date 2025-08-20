import { useQuery } from "@tanstack/react-query";
import { getProjects, getUsers } from "./endpoints";

export const useGetUsers = (page: number) => {
    return useQuery({
        retry: false,
        queryFn: () => getUsers(page),
        queryKey: ["get-users", page],
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
