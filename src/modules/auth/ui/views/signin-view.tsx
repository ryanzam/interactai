"use client"

import { Card, CardContent } from "@/components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { OctagonAlertIcon } from "lucide-react"
import { Alert, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useState } from "react"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export const SigninView = () => {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setError(null);
        setLoading(true);

        authClient.signIn.email({
            email: values.email,
            password: values.password,
        },
            {
                onSuccess: () => {
                    setLoading(false);
                    router.push("/");

                },
                onError: ({ error }) => {
                    setLoading(false);
                    setError(error.message)
                }
            },);
    }

    return (
        <div className="flex flex-col gap-4">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid md:grid-cols-2 p-0">
                    <Form {...form}>
                        <form className="p-6 md:p-10" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col">
                                    <h1 className="text-2xl">Welcome back</h1>
                                    <p className="text-muted-foreground">Login to your account.</p>
                                </div>

                                <div className="grid">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="user@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="******" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!!error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="!text-destructive" />
                                        <AlertTitle className="text-destructive">{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Logging in..." : "Login"}
                                </Button>

                                <div className="flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">Or continue with</div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button type="button" variant="outline" disabled={loading}>Github</Button>
                                    <Button type="button" variant="outline" disabled={loading}>Google</Button>
                                </div>
                                <div>
                                    Don&apos;t have an account? <Link href="/signup" className="text-primary underline underline-offset-3">Register</Link>
                                </div>
                            </div>
                        </form>
                    </Form>

                    <div className="bg-radial from-gray-200 to-gray-400 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src={"/logo.svg"} alt="logo" className="w-[200px] h-[200px]" />
                    </div>
                </CardContent>
            </Card>

            <div className="text-center text-muted-foreground *:[a]:hover:text-primary text-balance *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
            </div>
        </div>
    )
}