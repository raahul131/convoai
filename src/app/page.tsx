"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client"; //import the auth client

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong, please try again.");
        },
        onSuccess: () => {
          window.alert("Successfully registered!");
        },
      },
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong, please try again.");
        },
        onSuccess: () => {
          window.alert("Successfully logged in !");
        },
      },
    );
  };

  if (session) {
    return (
      <div className={"p-4 flex flex-col gap-y-4"}>
        <h1 className={"text-2xl"}>Welcome {session.user.name}</h1>
        <p className={"text-sm text-muted-foreground"}>
          Email: {session.user.email}
        </p>

        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className={"flex flex-col gap-y-10"}>
      <div className={"p-4 flex flex-col gap-y-4"}>
        <Input
          placeholder={"name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder={"password"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onSubmit}>Create User</Button>
      </div>

      <div className={"p-4 flex flex-col gap-y-4"}>
        <Input
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder={"password"}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onLogin}>Log in</Button>
      </div>
    </div>
  );
}
