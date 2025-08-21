import { useQuery } from "@tanstack/react-query";
import { getProjects, getUsers } from "./endpoints";
import { UsersDto } from "@/types/users";

export const useGetUsers = (dto: UsersDto) => {
    return useQuery({
        retry: false,
        queryFn: () => getUsers(dto),
        queryKey: ["get-users", dto],
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
