import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(3, "Name should be atleast 2 letters")
    .max(25, "Name cannot exceed more than 25 letters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(64, "Password too long"),
});
