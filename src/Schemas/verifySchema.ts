import {z} from "zod";


export const verifySchema = z.object({
    code: z.string().length(6,"Must Be 6 Digit")
})