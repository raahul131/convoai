"use client";

import z from "zod";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { OctagonAlertIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const SignInView = () => {
  const router = useRouter();

  //states
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setIsPending(true);

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setIsPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setIsPending(false);
          setError(error.message || "An error occurred while signing in.");
        },
      },
    );
  };

  const onSocial = (provider: "github" | "google") => {
    setError(null);
    setIsPending(true);

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setIsPending(false);
        },
        onError: ({ error }) => {
          setIsPending(false);
          setError(error.message);
        },
      },
    );
  };

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className={"overflow-hidden p-0"}>
        <CardContent className={"grid p-0 md:grid-cols-2"}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={"p-6 md:p-8"}
            >
              <div className={"flex flex-col gap-6"}>
                <div className={"flex flex-col items-center text-center"}>
                  <h1 className={"text-2xl font-bold"}>
                    Welcome back to Convo.AI
                  </h1>
                  <p className={"text-muted-foreground text-balance"}>
                    Login to your account
                  </p>
                </div>

                <div className={"grid gap-3"}>
                  <FormField
                    name={"email"}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type={"email"}
                            placeholder={"m@example.com"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={"grid gap-3"}>
                  <FormField
                    name={"password"}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type={"password"}
                            placeholder={"********"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className={"bg-destructive/10 border-none"}>
                    <OctagonAlertIcon className={"h-4 w-4 !text-destructive"} />
                    <AlertTitle className={"text-destructive"}>
                      {error}
                    </AlertTitle>
                  </Alert>
                )}
                <Button
                  disabled={isPending}
                  type={"submit"}
                  className={"w-full cursor-pointer"}
                >
                  Sign in
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>

                <div className={"grid  grid-cols-2 gap-4"}>
                  <Button
                    type={"button"}
                    disabled={isPending}
                    className={"w-full cursor-pointer"}
                    variant={"outline"}
                    onClick={() => onSocial("google")}
                  >
                    <FcGoogle />
                  </Button>{" "}
                  <Button
                    type={"button"}
                    disabled={isPending}
                    className={"w-full cursor-pointer"}
                    variant={"outline"}
                    onClick={() => onSocial("github")}
                  >
                    <FaGithub />
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div
            className={
              "bg-radial from-green-700 to-green-800 relative hidden md:flex flex-col gap-y-4 items-center justify-center"
            }
          >
            <Image
              src={"./logo.svg"}
              alt={"logo"}
              width={100}
              height={100}
              className={"size-[92px]"}
            />
            <p className={"text-2xl font-semibold text-white"}>Convo.AI</p>
          </div>
        </CardContent>
      </Card>

      <div
        className={
          "text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
        }
      >
        By clicking continue, you agree to our{" "}
        <a href={"#"}>Terms of Service</a> and <a href={"#"}>Privacy policy</a>
      </div>
    </div>
  );
};
