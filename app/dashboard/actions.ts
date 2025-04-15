'use server'

import { signOut } from "@/app/utils/auth"

export async function signOutAction(formData: FormData) {
    await signOut()
}
