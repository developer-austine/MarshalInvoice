import { z } from 'zod'

export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    laststName: z.string().min(2, "Last name is required"),
    Address: z.string().min(2, "Address is required"),
})