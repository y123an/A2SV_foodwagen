import z, { email } from "zod";

export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const userSchema = z.object({
    name: z.string().min(3, "name should be at least 3 charaters long"),
    email: z.email(),
    password: z.string().min(6, "password must be 6 characters long"),
    confirmPassword: z.string()
}).refine((data)=>{
    data.password === data.confirmPassword,{
        message: "password do not match",
        path:['confirmPassword']
    }
});

export type UserSchema = z.infer<typeof userSchema>;
