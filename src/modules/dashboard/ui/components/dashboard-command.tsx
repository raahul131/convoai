"use client";

import { Dispatch, SetStateAction } from "react";

import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen} className={""}>
      <CommandInput placeholder={"Find a meeting or agent"} />

      <CommandList>
        <CommandItem>Test</CommandItem>
        <CommandItem>Test 2</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
