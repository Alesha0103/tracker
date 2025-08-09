import z from "zod";

export const signInValidationSchema = z.object({
    email: z.string().email("emailInvalid").min(1, "requiredField"),
    password: z.string().min(1, "requiredField"),
    isAdmin: z.boolean(),
});
