import z from "zod";

export const addUserSchema = z.object({
    email: z.string().email("emailInvalid").min(1, "requiredField"),
    password: z.string().min(1, "requiredField"),
    isAdmin: z.boolean(),
});

export const editUserSchema = z.object({
    projects: z.any(),
    isAdmin: z.boolean(),
});
