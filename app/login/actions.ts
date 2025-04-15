'use server'

import { signIn } from "@/app/utils/auth"

export async function loginAction(formData: FormData) {
    await signIn("nodemailer", formData)
}
