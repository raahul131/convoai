import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
        <SignUpView />
      </div>
    </div>
  );
};

export default Page;
