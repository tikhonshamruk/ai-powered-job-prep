import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePage(){
  return <>
  <SignInButton />
  <UserButton />
  <ModeToggle />
  </>
}