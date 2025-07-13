import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }

  return (
    <div
      className={
        "bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
      }
    >
      <div className={"w-full max-w-sm md:max-w-3xl"}>
        <SignInView />
      </div>
    </div>
  );
};

export default Page;
