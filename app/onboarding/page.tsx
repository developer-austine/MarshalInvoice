"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/SubmitButtons";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from '@conform-to/react';
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";

export default function Onboarding() {
    const [lastResult, action] = useActionState(onboardUser, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}) {
        return parseWithZod(formData, {
            schema: onboardingSchema,
          })
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })
    return(
        <div className="min-h-screen w-screen flex items-center justfy-center">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">You are almost done!</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form 
                        className="grid gap-4" 
                        action={action} 
                        id={form.id} 
                        onSubmit={form.onSubmit} 
                        noValidate 
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input 
                                    name={fields.firstName.name}
                                    key={fields.firstName.key}
                                    defaultValue={fields.firstName.initialValue}
                                     placeholder="John"
                                 />
                                 <p className="text-red-500 text-sm">{fields.firstName.errors}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label>Last Name</Label>
                                <Input 
                                   name={fields.laststName.name}
                                   key={fields.laststName.key}
                                   defaultValue={fields.laststName.initialValue}
                                   placeholder="Doe" />
                                   <p className="text-red-500 text-sm">{fields.laststName.errors}</p>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input 
                                name={fields.Address.name}
                                key={fields.Address.key}
                                defaultValue={fields.Address.initialValue}
                                placeholder="123 Street" />
                                <p className="text-red-500 text-sm">{fields.Address.errors}</p>
                        </div>

                        <SubmitButton text="Finish Onboarding" />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}