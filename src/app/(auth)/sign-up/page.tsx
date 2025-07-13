import { SignUpView } from "@/modules/ui/views/sign-up-view";

const Page = () => {
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
