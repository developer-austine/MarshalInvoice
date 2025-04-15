import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "./actions";
import { SubmitButton } from "../components/SubmitButtons";
import { auth } from "../utils/auth";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth()

    if(session?.user) {
        redirect('/dashboard')
    }
    return (
       <>
       <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email to Login in to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                action={loginAction}
                className="flex flex-col gap-y-4"
                >
                    <div className="flex flex-col gap-y-2">
                        <Label>Email</Label>

                        <Input 
                        name="email"
                         type="email" 
                         required 
                         placeholder="hello@hello.com" 
                         />

                    </div>
                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
       </div>
       </>
    )
}