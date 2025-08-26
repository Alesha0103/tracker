import z from "zod";

export const addUserSchema = z.object({
    email: z.string().email("emailInvalid").min(1, "requiredField"),
    password: z.string().min(1, "requiredField"),
    isAdmin: z.boolean(),
});

export const editUserSchema = z.object({
    projects: z.array(z.string().trim().min(5, "requiredField")),
    isAdmin: z.boolean(),
});

export const trackingSchema = z.object({
    date: z.string(),
    hours: z.string().min(1, "requiredField"),
    comment: z.string(),
});
