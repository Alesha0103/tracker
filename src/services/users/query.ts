import { useQuery } from "@tanstack/react-query";
import { getProjects, getUserProject, getUsers } from "./endpoints";
import { ProjectDto, UsersDto } from "@/types/users";

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

export const useGetUserProject = (dto: ProjectDto) => {
    return useQuery({
        retry: false,
        queryFn: () => getUserProject(dto),
        queryKey: ["user-project", dto],
        refetchOnWindowFocus: true,
        enabled: !!dto.userId && !!dto.projectId,
    });
};
